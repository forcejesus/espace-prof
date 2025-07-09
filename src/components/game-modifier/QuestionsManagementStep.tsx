
import { useState, useEffect } from "react";
import { Plus, Settings, MessageSquare, Clock, CheckCircle, HelpCircle, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Game } from "@/services/types";
import { QuestionCard } from "@/components/quiz-creator/QuestionCard";
import { questionService } from "@/services";

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
  const [localQuestions, setLocalQuestions] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<any>(null);
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

  const addQuestion = () => {
    const newQuestion = {
      id: localQuestions.length + Date.now(),
      type: "VRAI_FAUX",
      question: "",
      correctAnswer: "true",
      timeLimit: 20,
      points: 50
    };
    setLocalQuestions([...localQuestions, newQuestion]);
  };

  const updateQuestion = (id: number, updates: any) => {
    setLocalQuestions(localQuestions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: number) => {
    setLocalQuestions(localQuestions.filter(q => q.id !== id));
  };

  const saveLocalQuestion = async (localQuestion: any) => {
    try {
      setIsCreating(true);

      // Créer la question d'abord
      const questionData = {
        libelle: localQuestion.question,
        temps: localQuestion.timeLimit,
        jeu: game._id,
        typeQuestion: getTypeQuestionId(localQuestion.type),
        point: "686a8704dc5ff531557af515", // Point par défaut
        fichier: localQuestion.image || null
      };

      console.log("Creating question with data:", questionData);
      const createdQuestion = await questionService.addQuestion(questionData);
      console.log("Question created:", createdQuestion);

      // Supprimer la question locale
      setLocalQuestions(prev => prev.filter(q => q.id !== localQuestion.id));

      toast({
        title: "Succès",
        description: "Question ajoutée avec succès",
      });

      // Recharger la page ou actualiser les données
      if (onQuestionUpdate) {
        onQuestionUpdate();
      }
    } catch (error) {
      console.error("Erreur lors de la création de la question:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la question",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const getTypeQuestionId = (type: string) => {
    // IDs des types de questions selon votre système
    switch (type) {
      case "VRAI_FAUX":
        return "6839d9de4dd3e891de5ff98f"; // ID pour VRAI_FAUX
      case "CHOIX_UNIQUE":
        return "6839d9de4dd3e891de5ff98e"; // ID pour CHOIX_UNIQUE
      case "CHOIX_MULTIPLE":
        return "6839d9de4dd3e891de5ff990"; // ID pour CHOIX_MULTIPLE
      case "REPONSE_COURTE":
        return "6839d9de4dd3e891de5ff991"; // ID pour REPONSE_COURTE
      default:
        return "6839d9de4dd3e891de5ff98f"; // Par défaut VRAI_FAUX
    }
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question._id);
    setEditingData({
      libelle: question.libelle,
      temps: question.temps,
      reponses: question.reponses.map(r => ({
        _id: r._id,
        reponse_texte: r.reponse_texte,
        etat: r.etat
      })),
      typeQuestion: question.typeQuestion,
      correctAnswer: question.typeQuestion.libelle === 'REPONSE_COURTE' 
        ? question.reponses.find(r => r.etat === 1)?.reponse_texte || ''
        : null
    });
  };

  const handleSaveEdit = async () => {
    if (!editingQuestion || !editingData) return;
    
    try {
      setIsCreating(true);
      
      // Préparer les données selon le type de question
      let reponsesData = [];
      
      if (editingData.typeQuestion.libelle === 'REPONSE_COURTE') {
        reponsesData = [
          {
            _id: editingData.reponses[0]?._id,
            reponse_texte: editingData.correctAnswer,
            etat: 1
          }
        ];
      } else {
        reponsesData = editingData.reponses;
      }
      
      const updateData = {
        _id: editingQuestion,
        libelle: editingData.libelle,
        temps: editingData.temps,
        reponses: reponsesData
      };
      
      await questionService.updateQuestion(editingQuestion, updateData);
      
      // Mettre à jour la liste locale
      setQuestions(prev => prev.map(q => 
        q._id === editingQuestion 
          ? { ...q, ...editingData, reponses: reponsesData }
          : q
      ));
      
      setEditingQuestion(null);
      setEditingData(null);
      
      toast({
        title: "Succès",
        description: "Question modifiée avec succès",
      });
      
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier la question",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
    setEditingData(null);
  };

  const handleAnswerToggle = (answerId: string) => {
    if (!editingData) return;
    
    if (editingData.typeQuestion.libelle === 'CHOIX_UNIQUE') {
      // Pour choix unique, désélectionner toutes les autres
      setEditingData(prev => ({
        ...prev,
        reponses: prev.reponses.map(r => ({
          ...r,
          etat: r._id === answerId ? 1 : 0
        }))
      }));
    } else if (editingData.typeQuestion.libelle === 'CHOIX_MULTIPLE') {
      // Pour choix multiple, inverser l'état
      setEditingData(prev => ({
        ...prev,
        reponses: prev.reponses.map(r => 
          r._id === answerId 
            ? { ...r, etat: r.etat === 1 ? 0 : 1 }
            : r
        )
      }));
    }
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
            onClick={addQuestion}
            className="bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isCreating}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une question
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Section des nouvelles questions en cours de création */}
        {localQuestions.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-orange-800">Nouvelles questions en cours de création</h4>
              <Button
                onClick={() => {
                  const validQuestions = localQuestions.filter(q => q.question.trim() !== "");
                  if (validQuestions.length === 0) {
                    toast({
                      title: "Erreur",
                      description: "Veuillez remplir au moins une question",
                      variant: "destructive",
                    });
                    return;
                  }
                  
                  // Sauvegarder toutes les questions valides
                  validQuestions.forEach(question => {
                    saveLocalQuestion(question);
                  });
                }}
                className="bg-green-500 hover:bg-green-600 text-white"
                disabled={isCreating || localQuestions.every(q => q.question.trim() === "")}
              >
                {isCreating ? "Sauvegarde..." : "Sauvegarder toutes"}
              </Button>
            </div>
            <div className="space-y-6">
              {localQuestions.map((question, index) => (
                <div key={question.id} className="animate-fade-in-up">
                  <QuestionCard
                    question={question}
                    index={index}
                    onUpdate={updateQuestion}
                    onDelete={deleteQuestion}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button
                      size="sm"
                      onClick={() => saveLocalQuestion(question)}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      disabled={isCreating || question.question.trim() === ""}
                    >
                      {isCreating ? "Sauvegarde..." : "Sauvegarder cette question"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {questions.length === 0 && localQuestions.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl border-2 border-dashed border-orange-200 relative overflow-hidden">
            {/* Éléments décoratifs */}
            <div className="absolute top-6 left-6 w-16 h-16 bg-orange-200/30 rounded-full"></div>
            <div className="absolute bottom-6 right-6 w-12 h-12 bg-orange-200/30 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-100/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <HelpCircle className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-orange-800">Prêt à créer vos questions ?</h3>
                <p className="text-orange-700 max-w-md mx-auto">
                  Commencez par ajouter votre première question et choisissez parmi plusieurs types interactifs
                </p>
              </div>
              <Button
                onClick={addQuestion}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Créer ma première question
              </Button>
            </div>
          </div>
        ) : questions.length > 0 ? (
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
                    {editingQuestion === question._id ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancelEdit}
                          className="border-gray-300 text-gray-600 hover:bg-gray-50"
                        >
                          Annuler
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                          disabled={isCreating}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          {isCreating ? "Sauvegarde..." : "Valider"}
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditQuestion(question)}
                        className="border-orange-200 text-orange-600 hover:bg-orange-50"
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Modifier
                      </Button>
                    )}
                  </div>
                </div>

                {/* Interface d'édition ou aperçu des réponses */}
                {editingQuestion === question._id ? (
                  <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                    <h4 className="text-sm font-medium text-blue-800 mb-3">
                      Modification - {getQuestionTypeLabel(question.typeQuestion)}
                    </h4>
                    
                    {/* Édition selon le type */}
                    {editingData.typeQuestion.libelle === 'REPONSE_COURTE' ? (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Réponse correcte :
                        </label>
                        <Input
                          value={editingData.correctAnswer}
                          onChange={(e) => setEditingData(prev => ({
                            ...prev,
                            correctAnswer: e.target.value
                          }))}
                          placeholder="Saisissez la réponse correcte..."
                          className="border-blue-300 focus:border-blue-500"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          {editingData.typeQuestion.libelle === 'CHOIX_UNIQUE' 
                            ? 'Sélectionnez la bonne réponse :' 
                            : 'Sélectionnez les bonnes réponses :'}
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {editingData.reponses.map((reponse, idx) => (
                            <button
                              key={reponse._id}
                              onClick={() => handleAnswerToggle(reponse._id)}
                              className={`p-3 rounded-lg text-left transition-all ${
                                reponse.etat === 1 
                                  ? 'bg-green-100 border-2 border-green-400 text-green-800' 
                                  : 'bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-700'
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
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Aperçu des réponses (mode normal)
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
                )}

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
        ) : null}

        {/* Actions rapides */}
        {(questions.length > 0 || localQuestions.length > 0) && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-white/90 to-orange-50/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200/60">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <ChartBar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-orange-800">Questions ({questions.length + localQuestions.length})</h3>
                <p className="text-orange-600">Diversifiez les types pour plus d'engagement</p>
              </div>
            </div>
            <Button
              onClick={addQuestion}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter une Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
