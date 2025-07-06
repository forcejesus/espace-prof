import { apiConfig, buildApiUrl, defaultHeaders } from '@/config/api';

// Types pour les réponses API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Classe pour gérer les appels API
export class ApiClient {
  private static instance: ApiClient;
  
  private constructor() {}
  
  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }
  
  // Méthode pour récupérer les headers avec authentification
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('akili-token');
    return {
      ...defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Méthode générique pour les requêtes
  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);
      
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API Request Error:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Une erreur inconnue est survenue',
      };
    }
  }
  
  // GET request
  async get<T>(endpoint: keyof typeof apiConfig.endpoints, path?: string): Promise<ApiResponse<T>> {
    const url = buildApiUrl(endpoint, path);
    return this.request<T>(url, { method: 'GET' });
  }
  
  // POST request
  async post<T>(
    endpoint: keyof typeof apiConfig.endpoints,
    data?: any,
    path?: string
  ): Promise<ApiResponse<T>> {
    const url = buildApiUrl(endpoint, path);
    return this.request<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
  
  // PUT request
  async put<T>(
    endpoint: keyof typeof apiConfig.endpoints,
    data?: any,
    path?: string
  ): Promise<ApiResponse<T>> {
    const url = buildApiUrl(endpoint, path);
    return this.request<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
  
  // DELETE request
  async delete<T>(
    endpoint: keyof typeof apiConfig.endpoints,
    path?: string
  ): Promise<ApiResponse<T>> {
    const url = buildApiUrl(endpoint, path);
    return this.request<T>(url, { method: 'DELETE' });
  }
}

// Instance globale du client API
export const apiClient = ApiClient.getInstance();

// Exemples d'utilisation :
// const games = await apiClient.get('games');
// const newGame = await apiClient.post('games', gameData);
// const user = await apiClient.get('users', '/profile');