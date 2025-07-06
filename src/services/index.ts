// Export de tous les services
export { authService } from './authService';
export { gameService } from './gameService';
export { studentService } from './studentService';
export { dashboardService } from './dashboardService';
export { planificationService } from './planificationService';
export { apiClient } from './apiClient';

// Export des types
export type { LoginRequest, LoginResponse, User } from './authService';
export type { 
  Game, 
  Question, 
  Answer, 
  QuestionType, 
  PointSystem,
  CreateGameRequest,
  CreateQuestionRequest,
  CreateAnswerRequest 
} from './gameService';
export type { 
  Student, 
  CreateStudentRequest, 
  CreateStudentsBulkRequest, 
  Avatar 
} from './studentService';
export type { 
  DashboardData, 
  UserProfile, 
  UpdateProfileRequest, 
  ChangePasswordRequest 
} from './dashboardService';
export type { 
  Planification, 
  CreatePlanificationRequest, 
  PlanificationStats 
} from './planificationService';