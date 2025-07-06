// Configuration API pour différents environnements
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  enableLoginRequired: boolean;
  endpoints: {
    auth: string;
    games: string;
    users: string;
    sessions: string;
    students: string;
  };
}

// Détection automatique de l'environnement basée sur l'URL
export const getEnvironment = (): 'development' | 'production' => {
  if (typeof window === 'undefined') return 'development';
  
  const hostname = window.location.hostname;
  
  // Si on est sur localhost ou IP locale, on est en développement
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('lovable.app')) {
    return 'development';
  }
  
  // Si on est sur le domaine de production
  if (hostname.includes('akili.guru')) {
    return 'production';
  }
  
  // Par défaut, développement
  return 'development';
};

// Configurations par environnement
const configurations: Record<'development' | 'production', ApiConfig> = {
  development: {
    baseUrl: 'http://localhost:3001/api', // Votre serveur local NodeJS/Express
    timeout: 10000,
    enableLoginRequired: true, // Activer/désactiver la protection des routes
    endpoints: {
      auth: '/auth',
      games: '/games',
      users: '/users',
      sessions: '/sessions',
      students: '/students',
    },
  },
  production: {
    baseUrl: 'https://api.akili.guru/api',
    timeout: 15000,
    enableLoginRequired: true, // Activer/désactiver la protection des routes
    endpoints: {
      auth: '/auth',
      games: '/games',
      users: '/users',
      sessions: '/sessions',
      students: '/students',
    },
  },
};

// Configuration active basée sur l'environnement
export const apiConfig: ApiConfig = configurations[getEnvironment()];

// Helper pour construire les URLs complètes
export const buildApiUrl = (endpoint: keyof ApiConfig['endpoints'], path?: string): string => {
  const baseEndpoint = apiConfig.baseUrl + apiConfig.endpoints[endpoint];
  return path ? `${baseEndpoint}${path}` : baseEndpoint;
};

// Configuration pour les headers par défaut
export const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Export de l'environnement actuel pour usage externe
export const currentEnvironment = getEnvironment();

console.log(`🌍 Environnement détecté: ${currentEnvironment}`);
console.log(`🔗 API Base URL: ${apiConfig.baseUrl}`);