import { apiClient } from './apiClient';
import { authService } from './authService';

// Types pour les jeux
export interface Game {
  id: string;
  titre: string;
  image?: string;
  dateCreation?: string;
  questions?: Question[];
  enseignant?: string;
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
  libelle: string;
  etat: boolean; // true = bonne réponse
  question: string;
}

export interface QuestionType {
  id: string;
  libelle: string;
  description: string;
  reference: string; // "30", "31", "32"
}

export interface PointSystem {
  id: string;
  nature: string;
  valeur: number;
  description: string;
}

export interface CreateGameRequest {
  titre: string;
  image?: string;
}

export interface CreateQuestionRequest {
  libelle: string;
  temps: number;
  typeQuestion: string;
  point: string;
  jeu: string;
  fichier?: string;
  type_fichier?: string;
  limite_response?: boolean;
}

export interface CreateAnswerRequest {
  libelle: string;
  etat: boolean;
  question: string;
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
    const response = await fetch('/api/jeux', {
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
  async getMyGames(): Promise<Game[]> {
    const user = authService.getUser();
    if (!user) throw new Error('Utilisateur non connecté');

    const response = await fetch(`/api/enseignants/${user.id}/jeux`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la récupération des jeux');
    }
    
    return result.data;
  }

  // Dupliquer un jeu
  async duplicateGame(gameId: string): Promise<Game> {
    const response = await fetch(`/api/jeux/${gameId}/dupliquer`, {
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
    const response = await fetch(`/api/jeux/${gameId}/archiver`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de l\'archivage du jeu');
    }
  }

  // Récupérer les types de questions
  async getQuestionTypes(): Promise<QuestionType[]> {
    const response = await fetch('/api/type-question', {
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
    const response = await fetch('/api/points', {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la récupération des systèmes de points');
    }
    
    return result.data;
  }

  // Ajouter une question à un jeu
  async addQuestion(questionData: CreateQuestionRequest): Promise<Question> {
    const response = await fetch('/api/questions', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(questionData),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de l\'ajout de la question');
    }
    
    return result.data;
  }

  // Ajouter une réponse à une question
  async addAnswer(answerData: CreateAnswerRequest): Promise<Answer> {
    const response = await fetch('/api/reponse', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(answerData),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de l\'ajout de la réponse');
    }
    
    return result.data;
  }
}

export const gameService = new GameService();