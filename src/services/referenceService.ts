import { authService } from './authService';
import type { QuestionType, PointSystem } from './types';

class ReferenceService {
  private getAuthHeaders() {
    const token = authService.getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
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
}

export const referenceService = new ReferenceService();