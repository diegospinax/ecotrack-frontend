import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../model/user/User';
import { authService } from '../services/authService';
import { AuthRequest } from '../model/auth/AuthRequest';
import { Role } from '@/model/enumerated/Role';
import { jwtDecode } from 'jwt-decode';
import { personService } from '@/services/person/personService';
import { Person } from '@/model/person/Person';

// 1. Define la forma del contexto
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (request: AuthRequest) => Promise<boolean>;
  logout: () => Promise<void>;
}

// 2. Crea el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface DecodedToken {
  id: number;
  personId: number;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}

// 3. Crea el componente proveedor
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          const decodedToken: DecodedToken = jwtDecode(token);

          if (decodedToken.exp * 1000 < Date.now()) {
            await AsyncStorage.removeItem('auth_token');
            setUser(null);
          } else {
            console.log(decodedToken);

            const person: Person = await personService.findPersonById(decodedToken.personId);

            const userData = new User(
              decodedToken.id,
              decodedToken.email,
              decodedToken.role,
              person
            );

            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Failed to load user from storage or decode token', error);
        await AsyncStorage.removeItem('auth_token'); // Limpiar token inválido
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = async (request: AuthRequest): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { token } = await authService.login(request);

      const decodedToken: DecodedToken = jwtDecode(token);

      await AsyncStorage.setItem('auth_token', token);

      const person: Person = await personService.findPersonById(decodedToken.personId);

      const user = new User(
        decodedToken.id,
        decodedToken.email,
        decodedToken.role,
        person
      );

      console.log(user);

      setUser(user);

      return true;
    } catch (error) {
      console.error('Login failed', error);
      await AsyncStorage.removeItem('auth_token');
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('auth_token');
      setUser(null);
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}