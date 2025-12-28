import { View, Text, FlatList } from 'react-native'
import React from 'react'
import AgentList from '@/shared/AgentList'
import AgentCard from './AgentCard'
import AgentBanner from './AgentBanner'

export default function AgentListComponent({isFeatured=true}:{isFeatured:boolean}) {
  const featuredAgents = AgentList.filter((item)=>item.featured==isFeatured);
  return (
    <View>
      <FlatList 
      scrollEnabled={false}
      data={featuredAgents} 
      numColumns={2}
      renderItem={({item,index})=> (
        <View style={{width:"50%"}}>
           <AgentCard agent={item} key={index}/>
        </View>
      )}
      />
    </View>
  )
}