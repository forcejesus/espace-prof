import { authService } from './authService';
import type { Question, CreateQuestionRequest } from './types';

class QuestionService {
  private getAuthHeaders() {
    const token = authService.getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
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

  // Modifier une question
  async updateQuestion(questionId: string, questionData: { temps?: number; libelle?: string; fichier?: string }): Promise<Question> {
    const response = await fetch(`http://localhost:3000/api/questions/update/${questionId}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(questionData),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Erreur lors de la modification de la question");
    }
    
    return result.data;
  }

  // Supprimer une question
  async deleteQuestion(questionId: string): Promise<void> {
    const response = await fetch(`http://localhost:3000/api/questions/delete/${questionId}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Erreur lors de la suppression de la question");
    }
  }

  // Récupérer les questions d'un jeu
  async getGameQuestions(gameId: string): Promise<Question[]> {
    const response = await fetch(`http://localhost:3000/api/questions/jeu/${gameId}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Erreur lors de la récupération des questions");
    }
    
    return result.data;
  }
}

export const questionService = new QuestionService();