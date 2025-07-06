import { apiClient } from './apiClient';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    role: string;
    ecole: string;
  };
}

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  ecole: string;
  token: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'akili-token';
  private readonly USER_KEY = 'akili-user';

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Note: L'endpoint est /api/login-admin selon la documentation
    const response = await fetch('/api/login-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const loginData: LoginResponse = await response.json();
    
    if (!loginData.success) {
      throw new Error('Erreur de connexion');
    }
    
    // Vérifier que l'utilisateur a le rôle enseignant ou admin
    if (loginData.user.role !== 'enseignant' && loginData.user.role !== 'super_admin' && loginData.user.role !== 'admin') {
      throw new Error('Accès refusé. Seuls les enseignants et admins peuvent se connecter à cette application.');
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
      id: response.user.id,
      nom: response.user.nom,
      prenom: response.user.prenom,
      email: response.user.email,
      role: response.user.role,
      ecole: response.user.ecole,
      token: response.token
    };
    
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}

export const authService = new AuthService();