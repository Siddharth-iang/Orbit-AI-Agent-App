import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'


type Agent = {
  id: number;
  name: string;
  desc: string;
  image: any;
  initialText: string;
  prompt: string;
  type: string;
  featured: boolean;
}
export default function AgentCard({ agent }: { agent: Agent }) {
  const router = useRouter();
  return (

    <TouchableOpacity style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10, marginBottom: 10, minHeight: 220, margin: 5 }} onPress={() => router.push({
      pathname: '/chat',
      params: {
        agentId: agent.id,
        agentName: agent.name,
        agentImage: agent.image,
        agentInitialText: agent.initialText,
        agentPrompt: agent.prompt,
      }
    })}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{agent.name}</Text>
      <Text numberOfLines={2} style={{ marginTop: 2 }}>{agent.desc}</Text>

      <View style={{ position: 'absolute', right: 0, bottom: 0 }}>
        <Image source={agent.image} style={{ width: 123, height: 123, borderRadius: 50, resizeMode: 'contain', overflow: 'hidden' }} />
      </View>
    </TouchableOpacity>
  )
}
