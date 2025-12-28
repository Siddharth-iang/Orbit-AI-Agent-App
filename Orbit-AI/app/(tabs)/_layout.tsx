import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#3692ff'
        }}>
            <Tabs.Screen name='Home'
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
                }}
            />
            <Tabs.Screen name='Explore'
                options={{
                    tabBarLabel: 'Explore',
                    tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />
                }}
            />
            <Tabs.Screen name='History'
                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: ({ color }) => <Ionicons name="time" size={24} color={color} />
                }}
            />
            <Tabs.Screen name='Profile'
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />
                }}
            />
        </Tabs>
    )
}