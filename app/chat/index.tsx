import { View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { GetAIChatResponse } from '@/shared/GlobalApi'

type Message = {
  role: string,
  text: string;
}

export default function index() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputText, setInputText] = React.useState('');
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const navigation = useNavigation();
  const { agentId, agentName, agentImage, agentInitialText, agentPrompt } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: agentName,
      headerRight: () => (
        <Ionicons name="add" size={35} color="black" />
      )
    })
  }, [])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (agentPrompt) {
      setMessages(prev => [
        ...prev,
        { role: 'system', text: String(agentPrompt) }
      ]);
    }
  }, [agentPrompt]);

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const newMessage = { role: 'user', text: inputText.trim() };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      setSending(true);
      try {
        // Prepare messages array as per API documentation format
        // Format: [{ role: "user", content: "Hi" }]
        const messagesArray = [];
        
        // Add system prompt if available
        if (agentPrompt) {
          messagesArray.push({
            role: "system",
            content: String(agentPrompt)
          });
        }
        
        // Add user message
        messagesArray.push({
          role: "user",
          content: newMessage.text
        });
        
        // Call API with properly formatted messages
        const aiResponse = await GetAIChatResponse(messagesArray);
        setMessages(prev => [...prev, { role: 'assistant', text: String(aiResponse) }]);
      } catch (e) {
        console.error("Error sending message:", e);
        const errorMessage = e instanceof Error ? e.message : 'Sorry, something went wrong. Please try again.';
        setMessages(prev => [...prev, { role: 'assistant', text: errorMessage }]);
      } finally {
        setSending(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' && keyboardVisible ? 60 : 0}
    >
      <FlatList
        data={messages}
        renderItem={({ item, index }) => item.role !== 'system' ? (
         <View style = {[styles.messageContainer, item.role === 'user' ? styles.userMessage : styles.assistantMessage]}>
           <Text style={[styles.messageText, item.role === 'assistant' && styles.assistantText]}>{item.text}</Text>
         </View>
        ) : null}
        style={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="camera" size={24} color="#666" />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity style={styles.iconButton} onPress={handleSendMessage} disabled={sending || !inputText.trim()}>
          <Ionicons name="send" size={24} color="#3692ff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: '70%',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  assistantText: {
    color: '#000',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3692ff',
    borderBottomRightRadius: 2,
    borderRightWidth: 8,
    borderRightColor: '#3692ff',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    borderBottomLeftRadius: 2,
    borderLeftWidth: 8,
    borderLeftColor: '#e0e0e0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingBottom: 60,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
    fontSize: 16,
    maxHeight: 100,
    marginTop: 10,
  },
  iconButton: {
    padding: 8,
  },
});
