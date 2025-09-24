import { Stack } from 'expo-router'
import React from 'react'

export default function CoursesLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="form" />
        </Stack>
    )
}