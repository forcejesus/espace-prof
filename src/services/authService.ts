import { apiClient } from './apiClient';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message: string;
  statut: number;
  email: string;
  role: string;
}

export interface User {
  email: string;
  role: string;
  token: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'akili-token';
  private readonly USER_KEY = 'akili-user';

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('auth', credentials, '/login');
    
    if (!response.success) {
      throw new Error(response.error || 'Erreur de connexion');
    }

    const loginData = response.data!;
    
    // Vérifier que l'utilisateur a le rôle enseignant
    if (loginData.role !== 'enseignant' && loginData.role !== 'super_admin') {
      throw new Error('Accès refusé. Seuls les enseignants peuvent se connecter à cette application.');
    }

    // Sauvegarder le token et les informations utilisateur
    this.saveAuthData(loginData);
    
    return loginData;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  private saveAuthData(response: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    
    const user: User = {
      email: response.email,
      role: response.role,
      token: response.token
    };
    
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}

export const authService = new AuthService();