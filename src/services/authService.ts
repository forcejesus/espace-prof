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

  // Fonction pour décoder le JWT et extraire les informations utilisateur
  private decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erreur lors du décodage du JWT:', error);
      return null;
    }
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const fullUrl = 'http://localhost:3000/api/login';
    console.log('🔍 Tentative de connexion avec:', credentials);
    console.log('🌐 URL complète:', fullUrl);
    
    try {
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('📡 Réponse HTTP status:', response.status);
      console.log('📡 Réponse HTTP headers:', Object.fromEntries(response.headers.entries()));
      
      const responseText = await response.text();
      console.log('📄 Réponse brute:', responseText);
      
      let loginData: LoginResponse;
      try {
        loginData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Erreur JSON.parse:', parseError);
        console.error('📄 Contenu à parser:', responseText);
        throw new Error(`Réponse invalide du serveur: ${responseText.substring(0, 200)}`);
      }
      
      // Vérifier le statut de la réponse (200 = succès)
      if (loginData.statut !== 200) {
        throw new Error(loginData.message || 'Erreur de connexion');
      }
      
      // Vérifier que l'utilisateur a le rôle enseignant ou admin
      if (loginData.role !== 'enseignant' && loginData.role !== 'super_admin' && loginData.role !== 'admin') {
        throw new Error('Accès refusé. Seuls les enseignants et admins peuvent se connecter à cette application.');
      }

      // Décoder le JWT pour obtenir toutes les informations utilisateur
      const jwtPayload = this.decodeJWT(loginData.token);
      console.log('🔓 JWT décodé:', jwtPayload);

      // Sauvegarder le token et les informations utilisateur complètes
      this.saveAuthData(loginData, jwtPayload);
      
      return loginData;
    } catch (error) {
      console.error('❌ Erreur complète de login:', error);
      throw error;
    }
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

  private saveAuthData(response: LoginResponse, jwtPayload: any): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    
    const user: User = {
      id: jwtPayload?.id || '',
      nom: jwtPayload?.nom || '',
      prenom: jwtPayload?.prenom || '',
      email: response.email,
      role: response.role,
      ecole: jwtPayload?.ecole || '',
      token: response.token
    };
    
    console.log('💾 Sauvegarde utilisateur:', user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}

export const authService = new AuthService();