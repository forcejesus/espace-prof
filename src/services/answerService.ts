import { authService } from './authService';
import type { Answer, CreateAnswerRequest } from './types';

class AnswerService {
  private getAuthHeaders() {
    const token = authService.getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Ajouter une réponse à une question
  async addAnswer(answerData: CreateAnswerRequest): Promise<Answer> {
    console.log('🔍 [answerService] Adding answer with data:', answerData);
    
    const response = await fetch('http://localhost:3000/api/reponse', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(answerData),
    });

    console.log('🔍 [answerService] Response status:', response.status);
    
    const result = await response.json();
    console.log('🔍 [answerService] Response result:', result);
    
    if (!result.success) {
      console.error('🔍 [answerService] Error creating answer:', result);
      throw new Error(result.message || "Erreur lors de l'ajout de la réponse");
    }
    
    return result.data;
  }

  // Modifier une réponse
  async updateAnswer(answerId: string, answerData: { etat?: boolean | number | string; reponse_texte?: string }): Promise<Answer> {
    const response = await fetch(`http://localhost:3000/api/reponse/update/${answerId}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(answerData),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Erreur lors de la modification de la réponse");
    }
    
    return result.data;
  }

  // Supprimer une réponse
  async deleteAnswer(answerId: string): Promise<void> {
    const response = await fetch(`http://localhost:3000/api/reponse/delete/${answerId}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Erreur lors de la suppression de la réponse");
    }
  }
}

export const answerService = new AnswerService();