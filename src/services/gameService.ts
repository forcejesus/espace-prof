import { authService } from './authService';
import type { Game, GamesResponse, CreateGameRequest } from './types';

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

  // Récupérer mes jeux détaillés
  async getMyGames(): Promise<GamesResponse> {
    const response = await fetch('http://localhost:3000/api/jeux/detailles', {
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

  // Supprimer un jeu
  async deleteGame(gameId: string): Promise<void> {
    const response = await fetch(`http://localhost:3000/api/jeux/delete/${gameId}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la suppression du jeu');
    }
  }

  // Récupérer un jeu par ID
  async getGameById(gameId: string): Promise<Game> {
    const response = await fetch(`http://localhost:3000/api/jeux/${gameId}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la récupération du jeu');
    }
    
    return result.data;
  }

  // Mettre à jour un jeu
  async updateGame(gameId: string, gameData: FormData): Promise<Game> {
    const response = await fetch(`http://localhost:3000/api/jeux`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getAuthHeaders().Authorization.replace('Bearer ', '')}`,
      },
      body: gameData,
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la mise à jour du jeu');
    }
    
    return result.data;
  }

  // Mettre à jour une question
  async updateQuestion(questionId: string, questionData: any): Promise<any> {
    const response = await fetch(`http://localhost:3000/api/questions/update/${questionId}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(questionData),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la mise à jour de la question');
    }
    
    return result.data;
  }

  // Mettre à jour une réponse
  async updateAnswer(answerId: string, answerData: any): Promise<any> {
    const response = await fetch(`http://localhost:3000/api/reponse/update/${answerId}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(answerData),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la mise à jour de la réponse');
    }
    
    return result.data;
  }
}

export const gameService = new GameService();