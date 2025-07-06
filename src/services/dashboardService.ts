import { authService } from './authService';

// Types pour le dashboard
export interface DashboardData {
  jeuxCrees: number;
  planificationsTotal: number;
  apprenantsEcole: number;
  apprenantsInvites: number;
  statistiquesDetaillees: {
    jeuxActifs: number;
    planificationsEnCours: number;
    planificationsTerminees: number;
    participationsTotales: number;
  };
  derniereActivite: string;
  enseignant: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
  };
  dateGeneration: string;
  scope: string;
}

export interface UserProfile {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  phone?: string;
  role: string;
  matricule?: string;
  ecole: {
    id: string;
    libelle: string;
  };
}

export interface UpdateProfileRequest {
  nom: string;
  prenom: string;
  email: string;
  phone?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

class DashboardService {
  private getAuthHeaders() {
    const token = authService.getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Récupérer le dashboard complet
  async getDashboard(): Promise<DashboardData> {
    const user = authService.getUser();
    if (!user) throw new Error('Utilisateur non connecté');

    const response = await fetch(`/api/enseignants/${user.id}/dashboard`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la récupération du dashboard');
    }
    
    return result.data;
  }

  // Récupérer mes informations personnelles
  async getProfile(): Promise<UserProfile> {
    const response = await fetch('/api/admin/profile', {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la récupération du profil');
    }
    
    return result.data;
  }

  // Modifier mes informations personnelles
  async updateProfile(profileData: UpdateProfileRequest): Promise<void> {
    const response = await fetch('/api/admin/profile/update', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la mise à jour du profil');
    }
  }

  // Modifier mon mot de passe
  async changePassword(passwordData: ChangePasswordRequest): Promise<void> {
    const response = await fetch('/api/admin/profile/change-password', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(passwordData),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors du changement de mot de passe');
    }
  }
}

export const dashboardService = new DashboardService();