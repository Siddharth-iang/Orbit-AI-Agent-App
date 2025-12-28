import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
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
                    headerShown: true,
                    headerTitle: () => (
                        <Text style={styles.headerTitle}>Orbit AI Agent</Text>
                    ),
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <View style={styles.proBadge}>
                            <Ionicons name="diamond-sharp" size={14} color="#fff" />
                            <Text style={styles.proText}>Pro</Text>
                        </View>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={styles.settingsButton}>
                            <Ionicons name="settings-outline" size={24} color="#000" />
                        </TouchableOpacity>
                    ),
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

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3692ff',
    },
    proBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3692ff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        marginLeft: 16,
        gap: 4,
    },
    proText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    settingsButton: {
        marginRight: 16,
        padding: 4,
    },
})