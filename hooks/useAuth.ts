import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Custom hook to access the authentication context.
 * Provides user data, loading state, and auth functions (login, logout).
 * 
 * This hook must be used within a component wrapped by AuthProvider.
 * 
 * @returns The authentication context.
 * @throws {Error} If used outside of an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
