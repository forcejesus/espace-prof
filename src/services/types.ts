// Types pour les jeux
export interface Game {
  _id: string;
  titre: string;
  image: string | null;
  createdBy: {
    _id: string;
    nom: string;
    prenom: string;
    matricule: string;
    genre: string;
    statut: string;
    phone: string;
    email: string;
    adresse: string;
    role: string;
  } | null;
  ecole: {
    _id: string;
    libelle: string;
    ville: string;
    telephone: string;
  } | null;
  questions?: Question[];
  planification?: any[];
  date: string;
}

export interface GamesResponse {
  success: boolean;
  message: string;
  data: Game[];
  total: number;
  filtrage: string;
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
  reponse_texte: string;
  etat: boolean | number | string;
  question: string;
}

export interface QuestionType {
  _id: string;
  libelle: string;
  description: string;
  reference: string;
  date: string;
  __v: number;
}

export interface PointSystem {
  _id: string;
  nature: string;
  valeur: number;
  description: string;
  date: string;
  __v: number;
}

// Request types
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
  reponse_texte: string;
  etat: boolean | number | string;
  question: string;
}