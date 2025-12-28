import { View, Text, ScrollView} from 'react-native'
import React from 'react'
import AgentListComponent from '@/components/Home/AgentListComponent'
import AgentBanner from '@/components/Home/AgentBanner'

export default function Home() {
    return (
        <ScrollView style={{padding:10}}>
            <AgentListComponent isFeatured={true}/>
            <AgentBanner/>
            <AgentListComponent isFeatured={false}/>
            <View style={{height:50}}/>
        </ScrollView>
    )
}
