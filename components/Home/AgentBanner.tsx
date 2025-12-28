import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'


export default function AgentBanner() {
  return (
    <View style={{backgroundColor:"#3692ff", padding:10, borderRadius:10, marginBottom:10, width: "100%", justifyContent:'center',alignItems: 'center', marginTop:10}}>
      <Image source={require('@/assets/images/roboimg3.png')} style={{width:"100%", height:200, resizeMode:'contain', borderRadius:10}}/>
      <View style={{marginTop: 10}}>
        <Text style={{fontSize:30, fontWeight:"bold", color:"#fff", textAlign: 'center'}}>Create your own agent</Text>

        <TouchableOpacity style={{backgroundColor:"#fff", padding:10, borderRadius:10, marginTop:10}}>
          <Text style={{fontSize:20, fontWeight:"bold", color:"#3692ff", textAlign: 'center'}}>Create Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}