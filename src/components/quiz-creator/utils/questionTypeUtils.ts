interface CreatedQuestion {
  _id: string;
  libelle: string;
  temps: number;
  fichier?: string;
  typeQuestion: {
    _id: string;
    libelle: string;
    reference: string;
  };
  reponses: Array<{
    _id: string;
    reponse_texte: string;
    etat: boolean | number;
  }>;
}

// Détermine le type abstrait de la question
export const getAbstractQuestionType = (question: CreatedQuestion): string => {
  const typeRef = question.typeQuestion?.reference;
  const typeLabel = question.typeQuestion?.libelle;
  
  // Vrai/Faux si c'est CHOIX_UNIQUE avec exactement 2 réponses "Vrai"/"Faux"
  if ((typeRef === "31" || typeLabel === "CHOIX_UNIQUE") && question.reponses.length === 2) {
    const hasVraiFaux = question.reponses.some(r => r.reponse_texte === "Vrai") &&
                        question.reponses.some(r => r.reponse_texte === "Faux");
    if (hasVraiFaux) return "VRAI_FAUX";
  }
  
  if (typeRef === "31" || typeLabel === "CHOIX_UNIQUE") return "CHOIX_UNIQUE";
  if (typeRef === "32" || typeLabel === "CHOIX_MULTIPLE") return "CHOIX_MULTIPLE";
  if (typeRef === "30" || typeLabel === "REPONSE_COURTE") return "REPONSE_COURTE";
  
  return "CHOIX_UNIQUE"; // par défaut
};

export type { CreatedQuestion };