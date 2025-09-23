import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toast from '@/components/ui/Toast';
import WebContainer from '@/components/WebContainer';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useToast } from '@/hooks/useToast';
import { AuthRequest } from '@/model/auth/AuthRequest';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const text = useThemeColor({}, 'text');
  const router = useRouter();
  const { login } = useAuth();
  const { toast, showError, showSuccess, hideToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showError('El correo y la contraseña son requeridos');
      return;
    }

    if (!validateEmail(email)) {
      showError('Por favor ingresa un correo electrónico válido');
      return;
    }

    setLoading(true);

    try {
      const request = new AuthRequest(email, password);
      const success = await login(request);

      if (success) {
        showSuccess('¡Bienvenido de vuelta!');
        setTimeout(() => {
          router.replace('/(app)/(tabs)');
        }, 1000);
      } else {
        showError('Credenciales incorrectas. Verifica tu email y contraseña');
      }
    } catch (error) {
      console.log(error);
      showError('Error de conexión. Intenta nuevamente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <WebContainer maxWidth={500} centered>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: useThemeColor({}, 'card') }]}>
            <Text style={styles.icon}>🌍</Text>
          </View>
          <ThemedText style={[styles.title, { color: useThemeColor({}, 'text') }]}>EcoTrack</ThemedText>
          <ThemedText style={[styles.subtitle, { color: useThemeColor({}, 'text') }]}>Bienvenido a EcoTrack</ThemedText>
        </View>

        <View style={styles.form}>
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            style={[styles.input, { color: text }]}
          />
          <Input
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={[styles.input, { color: text }]}
          />

          <TouchableOpacity>
            <Text style={[styles.forgotText, { color: useThemeColor({}, 'placeholder') }]}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <Button
            label="Iniciar Sesión"
            onPress={onLogin}
            loading={loading}
            style={styles.loginButton}
          />
        </View>

        <Text style={[styles.terms, { color: useThemeColor({}, 'placeholder') }]}>
          Al continuar, aceptas nuestros Términos y Condiciones
        </Text>
      </WebContainer>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  form: {
    gap: 16,
    marginBottom: 32,
    ...(Platform.OS === 'web' && {
      width: '100%',
    }),
  },
  input: {
    textAlignVertical: 'center',
  },
  forgotText: {
    fontSize: 14,
    textAlign: 'right',
    marginTop: -8,
  },
  loginButton: {
    marginTop: 8,
  },
  registerButton: {
    marginTop: 4,
  },
  terms: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
});


