import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'


const initialMessages = [
  
    {role: 'user', text: 'Hello'},
    {role: 'assistant', text: 'Hello, I am your AI assistant. How can I help you today ?'}
]

export default function index() {
  const [messages, setMessages] = React.useState(initialMessages);
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

  return (
    <View>
      <FlatList
        data={messages}
        renderItem={({ item, index }) => (
         <View style = {[styles.messageContainer, item.role === 'user' ? styles.userMessage : styles.assistantMessage]}>
           <Text>{item.text}</Text>
         </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: '70%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3692ff',
    borderBottomRightRadius: 0,
    borderRightWidth: 10,
    borderRightColor: '#3692ff',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    borderBottomLeftRadius: 0,
    borderLeftWidth: 10,
    borderLeftColor: '#e0e0e0',
  },
});
