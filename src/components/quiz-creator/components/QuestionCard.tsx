import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { questionService, answerService } from "@/services";
import { toast } from "sonner";
import { CreatedQuestion, getAbstractQuestionType } from "../utils/questionTypeUtils";
import { QuestionEditor } from "./QuestionEditor";
import { AnswerEditor } from "./AnswerEditor";
import { AnswerDisplay } from "./AnswerDisplay";

interface QuestionCardProps {
  question: CreatedQuestion;
  index: number;
  onQuestionUpdated: () => void;
}

export function QuestionCard({ question, index, onQuestionUpdated }: QuestionCardProps) {
  const [editingQuestion, setEditingQuestion] = useState<boolean>(false);
  const [editingAnswer, setEditingAnswer] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  const handleEditQuestion = () => {
    setEditingQuestion(true);
    setEditData({
      libelle: question.libelle,
      temps: question.temps,
      fichier: question.fichier || ""
    });
  };

  const handleSaveQuestion = async () => {
    try {
      await questionService.updateQuestion(question._id, editData);
      toast.success("Question modifiée avec succès");
      setEditingQuestion(false);
      onQuestionUpdated();
    } catch (error) {
      toast.error("Erreur lors de la modification de la question");
      console.error("Error updating question:", error);
    }
  };

  const handleDeleteQuestion = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette question ?")) {
      try {
        await questionService.deleteQuestion(question._id);
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

  const handleSaveAnswer = async (answerId: string) => {
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

  const handleAnswerStateChange = async (answerId: string, newState: boolean, question: CreatedQuestion) => {
    const abstractType = getAbstractQuestionType(question);
    
    if (abstractType === "VRAI_FAUX") {
      const otherAnswer = question.reponses.find(r => r._id !== answerId);
      if (otherAnswer) {
        await answerService.updateAnswer(answerId, { etat: newState });
        await answerService.updateAnswer(otherAnswer._id, { etat: !newState });
        onQuestionUpdated();
        toast.success("Réponse modifiée avec succès");
      }
    } else if (abstractType === "CHOIX_UNIQUE") {
      if (newState) {
        for (const answer of question.reponses) {
          const shouldBeTrue = answer._id === answerId;
          await answerService.updateAnswer(answer._id, { etat: shouldBeTrue });
        }
        onQuestionUpdated();
        toast.success("Réponse modifiée avec succès");
      }
    } else if (abstractType === "CHOIX_MULTIPLE") {
      await answerService.updateAnswer(answerId, { etat: newState });
      onQuestionUpdated();
      toast.success("Réponse modifiée avec succès");
    }
  };

  const abstractType = getAbstractQuestionType(question);

  return (
    <Card className="border-2 border-blue-200">
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
              onClick={handleEditQuestion}
              className="text-blue-600 hover:bg-blue-50"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDeleteQuestion}
              className="text-red-500 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {editingQuestion ? (
          <QuestionEditor
            question={question}
            editData={editData}
            setEditData={setEditData}
            onSave={handleSaveQuestion}
            onCancel={() => setEditingQuestion(false)}
          />
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
                {question.reponses.map((answer) => (
                  <div key={answer._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    {editingAnswer === answer._id ? (
                      <AnswerEditor
                        editData={editData}
                        setEditData={setEditData}
                        onSave={() => handleSaveAnswer(answer._id)}
                        onCancel={() => setEditingAnswer(null)}
                        abstractType={abstractType}
                      />
                    ) : (
                      <AnswerDisplay
                        answer={answer}
                        question={question}
                        abstractType={abstractType}
                        onAnswerStateChange={handleAnswerStateChange}
                        onAnswerUpdated={onQuestionUpdated}
                        onAnswerDeleted={onQuestionUpdated}
                        onEditAnswer={handleEditAnswer}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}