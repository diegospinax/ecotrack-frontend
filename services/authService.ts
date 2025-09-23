import { AuthRequest } from '../model/auth/AuthRequest';
import { AuthResponse } from '../model/auth/AuthResponse';
import apiClient from './apiClient';

const login = async (credentials: AuthRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

export const authService = {
  login,
};
