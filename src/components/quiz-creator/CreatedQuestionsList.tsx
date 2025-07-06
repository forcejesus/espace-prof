import { useState } from "react";
import { Pencil, Trash2, Image, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { questionService, answerService } from "@/services";
import { toast } from "sonner";

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

interface CreatedQuestionsListProps {
  questions: CreatedQuestion[];
  onQuestionUpdated: () => void;
}

export function CreatedQuestionsList({ questions, onQuestionUpdated }: CreatedQuestionsListProps) {
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [editingAnswer, setEditingAnswer] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [shortAnswerEdit, setShortAnswerEdit] = useState<string | null>(null);
  const [shortAnswerValue, setShortAnswerValue] = useState<string>("");

  const handleEditQuestion = (question: CreatedQuestion) => {
    setEditingQuestion(question._id);
    setEditData({
      libelle: question.libelle,
      temps: question.temps,
      fichier: question.fichier || ""
    });
  };

  const handleSaveQuestion = async (questionId: string) => {
    try {
      await questionService.updateQuestion(questionId, editData);
      toast.success("Question modifiée avec succès");
      setEditingQuestion(null);
      onQuestionUpdated();
    } catch (error) {
      toast.error("Erreur lors de la modification de la question");
      console.error("Error updating question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette question ?")) {
      try {
        await questionService.deleteQuestion(questionId);
        toast.success("Question supprimée avec succès");
        onQuestionUpdated();
      } catch (error) {
        toast.error("Erreur lors de la suppression de la question");
        console.error("Error deleting question:", error);
      }
    }
  };

  const handleEditAnswer = (answer: any) => {
    setEditingAnswer(answer._id);
    setEditData({
      reponse_texte: answer.reponse_texte,
      etat: answer.etat
    });
  };

  const handleSaveAnswer = async (answerId: string, questionId?: string) => {
    try {
      await answerService.updateAnswer(answerId, editData);
      toast.success("Réponse modifiée avec succès");
      setEditingAnswer(null);
      onQuestionUpdated();
    } catch (error) {
      toast.error("Erreur lors de la modification de la réponse");
      console.error("Error updating answer:", error);
    }
  };

  // Détermine le type abstrait de la question
  const getAbstractQuestionType = (question: CreatedQuestion): string => {
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

  // Gestion des changements selon le type de question
  const handleAnswerStateChange = async (answerId: string, newState: boolean, question: CreatedQuestion) => {
    const abstractType = getAbstractQuestionType(question);
    
    if (abstractType === "VRAI_FAUX") {
      // Pour Vrai/Faux : basculer entre les deux réponses
      const otherAnswer = question.reponses.find(r => r._id !== answerId);
      if (otherAnswer) {
        // Mettre à jour les deux réponses
        await answerService.updateAnswer(answerId, { etat: newState });
        await answerService.updateAnswer(otherAnswer._id, { etat: !newState });
        onQuestionUpdated();
        toast.success("Réponse modifiée avec succès");
      }
    } else if (abstractType === "CHOIX_UNIQUE") {
      // Pour choix unique : désactiver toutes les autres réponses
      if (newState) {
        for (const answer of question.reponses) {
          const shouldBeTrue = answer._id === answerId;
          await answerService.updateAnswer(answer._id, { etat: shouldBeTrue });
        }
        onQuestionUpdated();
        toast.success("Réponse modifiée avec succès");
      }
    } else if (abstractType === "CHOIX_MULTIPLE") {
      // Pour choix multiple : modifier seulement cette réponse
      await answerService.updateAnswer(answerId, { etat: newState });
      onQuestionUpdated();
      toast.success("Réponse modifiée avec succès");
    }
  };

  const handleDeleteAnswer = async (answerId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette réponse ?")) {
      try {
        await answerService.deleteAnswer(answerId);
        toast.success("Réponse supprimée avec succès");
        onQuestionUpdated();
      } catch (error) {
        toast.error("Erreur lors de la suppression de la réponse");
        console.error("Error deleting answer:", error);
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setEditData({ ...editData, fichier: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Aucune question créée pour le moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Questions créées ({questions.length})
        </h3>
      </div>

      {questions.map((question, index) => (
        <Card key={question._id} className="border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <Badge variant="outline" className="border-blue-200 text-blue-700">
                  {question.temps}s
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEditQuestion(question)}
                  className="text-blue-600 hover:bg-blue-50"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteQuestion(question._id)}
                  className="text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {editingQuestion === question._id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question
                  </label>
                  <Textarea
                    value={editData.libelle}
                    onChange={(e) => setEditData({ ...editData, libelle: e.target.value })}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Temps (secondes)
                    </label>
                    <Input
                      type="number"
                      value={editData.temps}
                      onChange={(e) => setEditData({ ...editData, temps: parseInt(e.target.value) })}
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image (optionnelle)
                    </label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="border-blue-200 focus:border-blue-500"
                      />
                      <Image className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleSaveQuestion(question._id)}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button
                    onClick={() => setEditingQuestion(null)}
                    variant="outline"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Annuler
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Question:</h4>
                  <p className="text-gray-600">{question.libelle}</p>
                </div>

                {question.fichier && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Image:</h4>
                    <img 
                      src={question.fichier} 
                      alt="Question image" 
                      className="max-w-xs h-auto rounded-lg border"
                    />
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Réponses:</h4>
                  <div className="space-y-2">
                     {question.reponses.map((answer) => {
                       const abstractType = getAbstractQuestionType(question);
                       
                       return (
                         <div key={answer._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                           {editingAnswer === answer._id ? (
                             <div className="flex items-center space-x-4 flex-1">
                               <Input
                                 value={editData.reponse_texte}
                                 onChange={(e) => setEditData({ ...editData, reponse_texte: e.target.value })}
                                 className="flex-1"
                                 readOnly={abstractType === "VRAI_FAUX"}
                               />
                               
                               {abstractType !== "REPONSE_COURTE" && (
                                 <label className="flex items-center space-x-2">
                                   {abstractType === "VRAI_FAUX" || abstractType === "CHOIX_UNIQUE" ? (
                                     <input
                                       type="radio"
                                       name={`edit-question-${question._id}`}
                                       checked={editData.etat}
                                       onChange={(e) => setEditData({ ...editData, etat: e.target.checked })}
                                     />
                                   ) : (
                                     <input
                                       type="checkbox"
                                       checked={editData.etat}
                                       onChange={(e) => setEditData({ ...editData, etat: e.target.checked })}
                                     />
                                   )}
                                   <span className="text-sm">Correcte</span>
                                 </label>
                               )}
                               
                               <div className="flex space-x-1">
                                 <Button
                                   size="sm"
                                   onClick={() => handleSaveAnswer(answer._id, question._id)}
                                   className="bg-green-500 hover:bg-green-600 text-white"
                                 >
                                   <Save className="w-3 h-3" />
                                 </Button>
                                 <Button
                                   size="sm"
                                   variant="outline"
                                   onClick={() => setEditingAnswer(null)}
                                 >
                                   <X className="w-3 h-3" />
                                 </Button>
                               </div>
                             </div>
                           ) : (
                             <>
                                <div className="flex items-center space-x-3">
                                  {/* Interface directe de modification selon le type */}
                                  {abstractType === "REPONSE_COURTE" ? (
                                    <div className="flex items-center space-x-2 flex-1">
                                      {shortAnswerEdit === answer._id ? (
                                        <>
                                          <Input
                                            value={shortAnswerValue}
                                            onChange={(e) => setShortAnswerValue(e.target.value)}
                                            className="flex-1"
                                            placeholder="Réponse attendue..."
                                          />
                                          <Button
                                            size="sm"
                                            onClick={() => {
                                              answerService.updateAnswer(answer._id, { reponse_texte: shortAnswerValue })
                                                .then(() => {
                                                  onQuestionUpdated();
                                                  setShortAnswerEdit(null);
                                                  toast.success("Réponse modifiée avec succès");
                                                })
                                                .catch(err => {
                                                  console.error("Error updating answer:", err);
                                                  toast.error("Erreur lors de la modification");
                                                });
                                            }}
                                            className="bg-green-500 hover:bg-green-600 text-white"
                                          >
                                            <Save className="w-3 h-3" />
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setShortAnswerEdit(null)}
                                          >
                                            <X className="w-3 h-3" />
                                          </Button>
                                        </>
                                      ) : (
                                        <>
                                          <Input
                                            value={answer.reponse_texte}
                                            readOnly
                                            className="flex-1 bg-gray-50"
                                          />
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => {
                                              setShortAnswerEdit(answer._id);
                                              setShortAnswerValue(answer.reponse_texte);
                                            }}
                                            className="text-blue-600 hover:bg-blue-50"
                                          >
                                            <Pencil className="w-3 h-3" />
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  ) : (
                                    <>
                                      {abstractType === "VRAI_FAUX" || abstractType === "CHOIX_UNIQUE" ? (
                                        <div className="flex items-center space-x-3">
                                          <Switch
                                            checked={!!answer.etat}
                                            onCheckedChange={(checked) => {
                                              if (checked) {
                                                handleAnswerStateChange(answer._id, true, question);
                                              }
                                            }}
                                          />
                                          <span className="text-gray-700">{answer.reponse_texte}</span>
                                        </div>
                                      ) : (
                                        <div className="flex items-center space-x-3">
                                          <Switch
                                            checked={!!answer.etat}
                                            onCheckedChange={(checked) => {
                                              handleAnswerStateChange(answer._id, checked, question);
                                            }}
                                          />
                                          <span className="text-gray-700">{answer.reponse_texte}</span>
                                        </div>
                                      )}
                                      
                                      {answer.etat && (
                                        <Badge className="bg-green-100 text-green-800">Correcte</Badge>
                                      )}
                                    </>
                                  )}
                               </div>
                               
                               {abstractType !== "REPONSE_COURTE" && (
                                 <div className="flex space-x-1">
                                   <Button
                                     size="sm"
                                     variant="ghost"
                                     onClick={() => handleEditAnswer(answer)}
                                     className="text-blue-600 hover:bg-blue-50"
                                   >
                                     <Pencil className="w-3 h-3" />
                                   </Button>
                                   {abstractType !== "VRAI_FAUX" && (
                                     <Button
                                       size="sm"
                                       variant="ghost"
                                       onClick={() => handleDeleteAnswer(answer._id)}
                                       className="text-red-500 hover:bg-red-50"
                                     >
                                       <Trash2 className="w-3 h-3" />
                                     </Button>
                                   )}
                                 </div>
                               )}
                             </>
                           )}
                         </div>
                       );
                     })}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}