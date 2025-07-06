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
}

export const gameService = new GameService();