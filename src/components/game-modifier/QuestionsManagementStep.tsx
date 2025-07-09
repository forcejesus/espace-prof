import { useState, useEffect } from "react";
import { Plus, Settings, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Game } from "@/services/types";

interface Question {
  _id: string;
  libelle: string;
  temps: number;
  limite_response: boolean;
  reponses: Array<{
    _id: string;
    etat: number;
    reponse_texte: string;
  }>;
  typeQuestion: {
    _id: string;
    libelle: string;
    description: string;
    reference: string;
  };
  point: {
    _id: string;
    nature: string;
    valeur: number;
    description: string;
  };
  fichier?: string;
}

interface QuestionsManagementStepProps {
  game: Game;
  onQuestionUpdate?: () => void;
}

export function QuestionsManagementStep({ game, onQuestionUpdate }: QuestionsManagementStepProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (game.questions) {
      setQuestions(game.questions as any);
    }
  }, [game.questions]);

  const getQuestionTypeLabel = (typeQuestion: Question['typeQuestion']) => {
    switch (typeQuestion.libelle) {
      case 'CHOIX_UNIQUE':
        return 'Choix unique';
      case 'CHOIX_MULTIPLE':
        return 'Choix multiple';
      case 'REPONSE_COURTE':
        return 'Réponse courte';
      case 'VRAI_FAUX':
        return 'Vrai ou Faux';
      default:
        return typeQuestion.libelle;
    }
  };

  const getQuestionTypeColor = (typeQuestion: Question['typeQuestion']) => {
    switch (typeQuestion.libelle) {
      case 'CHOIX_UNIQUE':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'CHOIX_MULTIPLE':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'REPONSE_COURTE':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'VRAI_FAUX':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleEditQuestion = (questionId: string) => {
    // Logique pour éditer une question
    toast({
      title: "Édition de question",
      description: "Fonctionnalité d'édition en cours de développement",
    });
  };

  const handleDeleteQuestion = (questionId: string) => {
    // Logique pour supprimer une question
    toast({
      title: "Suppression de question",
      description: "Fonctionnalité de suppression en cours de développement",
    });
  };

  const handleAddQuestion = () => {
    toast({
      title: "Ajouter une question",
      description: "Fonctionnalité d'ajout en cours de développement",
    });
  };

  return (
    <Card className="shadow-sm border-orange-200">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl text-orange-800">
            <MessageSquare className="w-5 h-5" />
            Questions du jeu
          </CardTitle>
          <Button 
            onClick={handleAddQuestion}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une question
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {questions.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucune question</h3>
            <p className="text-gray-600 mb-4">
              Ce jeu n'a pas encore de questions. Commencez par en ajouter une.
            </p>
            <Button 
              onClick={handleAddQuestion}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter la première question
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div 
                key={question._id} 
                className="border border-orange-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {question.libelle}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs ${getQuestionTypeColor(question.typeQuestion)}`}>
                          {getQuestionTypeLabel(question.typeQuestion)}
                        </Badge>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <Clock className="w-3 h-3" />
                          {question.temps}s
                        </div>
                        <div className="flex items-center gap-1 text-orange-600 text-sm">
                          <CheckCircle className="w-3 h-3" />
                          {question.point.valeur} pts
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditQuestion(question._id)}
                      className="border-orange-200 text-orange-600 hover:bg-orange-50"
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Modifier
                    </Button>
                  </div>
                </div>

                {/* Aperçu des réponses */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Réponses ({question.reponses.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {question.reponses.map((reponse, idx) => (
                      <div 
                        key={reponse._id} 
                        className={`p-2 rounded text-sm ${
                          reponse.etat === 1 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-white text-gray-700 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {String.fromCharCode(65 + idx)}. {reponse.reponse_texte}
                          </span>
                          {reponse.etat === 1 && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image de la question si elle existe */}
                {question.fichier && (
                  <div className="mt-4">
                    <img
                      src={question.fichier.startsWith('http')
                        ? question.fichier
                        : `http://localhost:3000/${question.fichier.replace('public/', '')}`}
                      alt="Image de la question"
                      className="max-w-full h-auto rounded-lg border border-gray-200"
                      style={{ maxHeight: '200px' }}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}