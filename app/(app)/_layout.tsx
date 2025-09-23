import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/hooks/useAuth'; // Asumiremos que crearemos este hook

export default function AppLayout() {
  const { user, isLoading } = useAuth();

  // Puedes agregar un indicador de carga mientras se verifica el estado de autenticación
  if (isLoading) {
    // Idealmente, aquí iría un componente de Spinner o la pantalla de Splash
    return null; 
  }

  // Si no hay usuario y no está cargando, redirigir a la pantalla de login
  if (!user) {
    return <Redirect href="/login" />;
  }

  // Si el usuario está autenticado, renderizar el contenido de la aplicación
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Aquí declararemos otras pantallas que vivan dentro de (app) pero fuera de (tabs) */}
      {/* Por ejemplo, una pantalla de perfil de usuario o ajustes */}
    </Stack>
  );
}
