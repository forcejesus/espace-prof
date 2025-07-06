import { authService } from './authService';

// Types pour les apprenants
export interface Student {
  id: string;
  pseudonyme: string;
  nom?: string;
  prenom?: string;
  avatar?: string;
  dateCreation?: string;
  enseignant?: string;
}

export interface CreateStudentRequest {
  pseudonyme: string;
  nom?: string;
  prenom?: string;
  avatar?: string;
}

export interface CreateStudentsBulkRequest {
  apprenants: CreateStudentRequest[];
}

export interface Avatar {
  id: string;
  nom: string;
  url: string;
}

class StudentService {
  private getAuthHeaders() {
    const token = authService.getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Ajouter un apprenant invité
  async createInvitedStudent(studentData: CreateStudentRequest): Promise<Student> {
    const response = await fetch('/api/apprenants/invite', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(studentData),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la création de l\'apprenant');
    }
    
    return result.data;
  }

  // Créer plusieurs apprenants en lot
  async createStudentsBulk(studentsData: CreateStudentsBulkRequest): Promise<Student[]> {
    const response = await fetch('/api/apprenants/invite/bulk', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(studentsData),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la création des apprenants');
    }
    
    return result.data;
  }

  // Lister mes apprenants invités
  async getMyInvitedStudents(): Promise<Student[]> {
    const response = await fetch('/api/apprenants/invites', {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la récupération des apprenants');
    }
    
    return result.data;
  }

  // Récupérer les avatars disponibles
  async getAvailableAvatars(): Promise<Avatar[]> {
    const response = await fetch('/api/avatars', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la récupération des avatars');
    }
    
    return result.data;
  }

  // Statistiques par type d'apprenants
  async getStudentTypeStats(): Promise<any> {
    const response = await fetch('/api/apprenants/stats/types', {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la récupération des statistiques');
    }
    
    return result.data;
  }
}

export const studentService = new StudentService();