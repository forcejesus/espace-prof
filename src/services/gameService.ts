import { apiClient } from './apiClient';
import { authService } from './authService';

// Types pour les jeux
export interface Game {
  _id: string;
  titre: string;
  image: string | null;
  createdBy: {
    _id: string;
    nom: string;
    prenom: string;
    matricule: string;
    genre: string;
    statut: string;
    phone: string;
    email: string;
    adresse: string;
    role: string;
  } | null;
  ecole: {
    _id: string;
    libelle: string;
    ville: string;
    telephone: string;
  } | null;
  date: string;
}

export interface GamesResponse {
  success: boolean;
  message: string;
  data: Game[];
  total: number;
  filtrage: string;
}

export interface Question {
  id: string;
  libelle: string;
  temps: number;
  typeQuestion: string;
  point: string;
  jeu: string;
  fichier?: string;
  type_fichier?: string;
  limite_response?: boolean;
  reponses?: Answer[];
}

export interface Answer {
  id: string;
  reponse_texte: string; // Changé de libelle vers reponse_texte selon API
  etat: boolean | number | string; // Accepte différents formats selon la doc
  question: string;
}

export interface QuestionType {
  _id: string;
  libelle: string; // "REPONSE_COURTE", "CHOIX_UNIQUE", "CHOIX_MULTIPLE"
  description: string;
  reference: string; // "30", "31", "32"
  date: string;
  __v: number;
}

export interface PointSystem {
  id: string;
  nature: string; // "points", "bonus"  
  valeur: number;
  description: string;
}

export interface CreateGameRequest {
  titre: string;
  image?: string; // Base64 ou URL
}

export interface CreateQuestionRequest {
  libelle: string;
  temps: number; // en secondes
  typeQuestion: string; // ID du type de question
  point: string; // ID du système de points
  jeu: string; // ID du jeu
  fichier?: string; // Image/audio en base64
  type_fichier?: string; // "image" ou "audio"
  limite_response?: boolean;
}

export interface CreateAnswerRequest {
  reponse_texte: string;
  etat: boolean | number | string; // true/false, 1/0, "true"/"false", "1"/"0"
  question: string; // ID de la question
}

class GameService {
  private getAuthHeaders() {
    const token = authService.getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Créer un jeu
  async createGame(gameData: CreateGameRequest): Promise<Game> {
    const response = await fetch('http://localhost:3000/api/jeux', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(gameData),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la création du jeu');
    }
    
    return result.data;
  }

  // Récupérer mes jeux
  async getMyGames(): Promise<GamesResponse> {
    const response = await fetch('http://localhost:3000/api/jeux', {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la récupération des jeux');
    }
    
    return result;
  }

  // Dupliquer un jeu
  async duplicateGame(gameId: string): Promise<Game> {
    const response = await fetch(`http://localhost:3000/api/jeux/${gameId}/dupliquer`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la duplication du jeu');
    }
    
    return result.data;
  }

  // Archiver un jeu
  async archiveGame(gameId: string): Promise<void> {
    const response = await fetch(`http://localhost:3000/api/jeux/${gameId}/archiver`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Erreur lors de l'archivage du jeu");
    }
  }

  // Récupérer les types de questions
  async getQuestionTypes(): Promise<QuestionType[]> {
    const response = await fetch('http://localhost:3000/api/type-question', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la récupération des types de questions');
    }
    
    return result.data;
  }

  // Récupérer les systèmes de points
  async getPointSystems(): Promise<PointSystem[]> {
    const response = await fetch('http://localhost:3000/api/points', {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    console.log('🔍 Raw points API response:', result);
    
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la récupération des systèmes de points');
    }
    
    console.log('🔍 Points data structure:', result.data);
    return result.data;
  }

  // Ajouter une question à un jeu
  async addQuestion(questionData: CreateQuestionRequest): Promise<Question> {
    const response = await fetch('http://localhost:3000/api/questions', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(questionData),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Erreur lors de l'ajout de la question");
    }
    
    return result.data;
  }

  // Ajouter une réponse à une question
  async addAnswer(answerData: CreateAnswerRequest): Promise<Answer> {
    const response = await fetch('http://localhost:3000/api/reponse', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(answerData),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Erreur lors de l'ajout de la réponse");
    }
    
    return result.data;
  }
}

export const gameService = new GameService();