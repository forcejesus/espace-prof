import { useState } from "react";
import { Pencil, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { answerService } from "@/services";
import { toast } from "sonner";
import { CreatedQuestion } from "../utils/questionTypeUtils";

interface AnswerDisplayProps {
  answer: any;
  question: CreatedQuestion;
  abstractType: string;
  onAnswerStateChange: (answerId: string, newState: boolean, question: CreatedQuestion) => void;
  onAnswerUpdated: () => void;
  onAnswerDeleted: () => void;
  onEditAnswer: (answer: any) => void;
}

export function AnswerDisplay({ 
  answer, 
  question, 
  abstractType, 
  onAnswerStateChange, 
  onAnswerUpdated,
  onAnswerDeleted,
  onEditAnswer
}: AnswerDisplayProps) {
  const [shortAnswerEdit, setShortAnswerEdit] = useState<string | null>(null);
  const [shortAnswerValue, setShortAnswerValue] = useState<string>("");

  const handleDeleteAnswer = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette réponse ?")) {
      try {
        await answerService.deleteAnswer(answer._id);
        toast.success("Réponse supprimée avec succès");
        onAnswerDeleted();
      } catch (error) {
        toast.error("Erreur lors de la suppression de la réponse");
        console.error("Error deleting answer:", error);
      }
    }
  };

  if (abstractType === "REPONSE_COURTE") {
    return (
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
                    onAnswerUpdated();
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
    );
  }

  return (
    <>
      <div className="flex items-center space-x-3">
        {abstractType === "VRAI_FAUX" || abstractType === "CHOIX_UNIQUE" ? (
          <div className="flex items-center space-x-3">
            <Switch
              checked={answer.etat === 1 || answer.etat === true}
              onCheckedChange={(checked) => {
                if (checked) {
                  onAnswerStateChange(answer._id, true, question);
                }
              }}
            />
            <span className="text-gray-700">{answer.reponse_texte}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Switch
              checked={answer.etat === 1 || answer.etat === true}
              onCheckedChange={(checked) => {
                onAnswerStateChange(answer._id, checked, question);
              }}
            />
            <span className="text-gray-700">{answer.reponse_texte}</span>
          </div>
        )}
        
        {answer.etat && (
          <Badge className="bg-green-100 text-green-800">Correcte</Badge>
        )}
      </div>
      
      <div className="flex space-x-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEditAnswer(answer)}
          className="text-blue-600 hover:bg-blue-50"
        >
          <Pencil className="w-3 h-3" />
        </Button>
        {abstractType !== "VRAI_FAUX" && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDeleteAnswer}
            className="text-red-500 hover:bg-red-50"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        )}
      </div>
    </>
  );
}