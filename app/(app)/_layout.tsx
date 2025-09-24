import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function AppLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Idealmente, aquí iría un componente de Spinner o la pantalla de Splash
    return null; 
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  // Si el usuario está autenticado, renderizar el contenido de la aplicación
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(challenges)" options={{ headerShown: false }} />
      <Stack.Screen name="(settings)" options={{ headerShown: false }} />
      <Stack.Screen name="(courses)" options={{ headerShown: false }} />
      <Stack.Screen name="(users)" options={{ headerShown: false }} />
      <Stack.Screen name="(achievements)" options={{ headerShown: false }} />
    </Stack>
  );
}
