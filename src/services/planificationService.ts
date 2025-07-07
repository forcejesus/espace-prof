import { authService } from './authService';

// Types pour les planifications
export interface Planification {
  id: string;
  type: 'live' | 'attribuer';
  date_debut?: string;
  date_fin?: string;
  heure_debut?: string;
  heure_fin?: string;
  limite_participant: number;
  jeu: string;
  pin?: string;
  statut?: string;
  dateCreation?: string;
}

export interface CreatePlanificationRequest {
  type: 'Live' | 'Examen';
  date_debut: string;
  date_fin: string;
  heure_debut: string;
  heure_fin: string;
  limite_participant: number;
  jeu: string;
}

export interface PlanificationStats {
  planification: {
    id: string;
    pin: string;
    statut: string;
    jeu: {
      id: string;
      titre: string;
    };
  };
  participants: {
    total: number;
    limite: number;
    taux_participation: number;
    score_moyen: number;
    temps_moyen: number;
  };
  questions: Array<{
    questionId: string;
    libelle: string;
    totalReponses: number;
    bonnesReponses: number;
    tauxReussite: number;
    tempsMoyenReponse: number;
  }>;
  classement: Array<{
    rang: number;
    apprenant: {
      nom?: string;
      prenom?: string;
      pseudonyme: string;
    };
    score: number;
    bonnesReponses: number;
    tempsMoyen: number;
  }>;
  resume: {
    jeu_termine: boolean;
    nombre_questions: number;
    taux_reussite_global: number;
    duree_moyenne_jeu: number;
  };
}

class PlanificationService {
  private getAuthHeaders() {
    const token = authService.getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Planifier un jeu
  async createPlanification(planificationData: CreatePlanificationRequest): Promise<Planification> {
    const response = await fetch('http://localhost:3000/api/planification', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(planificationData),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la création de la planification');
    }
    
    return result.data;
  }

  // Consulter mes planifications
  async getMyPlanifications(): Promise<Planification[]> {
    const user = authService.getUser();
    if (!user) throw new Error('Utilisateur non connecté');

    const response = await fetch(`/api/enseignants/${user.id}/planifications`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la récupération des planifications');
    }
    
    return result.data;
  }

  // Statistiques détaillées d'une planification
  async getPlanificationStats(planificationId: string): Promise<PlanificationStats> {
    const response = await fetch(`/api/planification/${planificationId}/statistiques`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la récupération des statistiques');
    }
    
    return result.data;
  }

  // Exporter les résultats en CSV
  async exportResultsCSV(planificationId: string): Promise<Blob> {
    const response = await fetch(`/api/planification/${planificationId}/export-csv`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'export CSV');
    }
    
    return response.blob();
  }

  // Obtenir un jeu par PIN (pour les participants)
  async getGameByPin(pin: string): Promise<any> {
    const response = await fetch('/api/jeux/pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Jeu non trouvé avec ce PIN');
    }
    
    return result.data;
  }
}

export const planificationService = new PlanificationService();