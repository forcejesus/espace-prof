
import { Trash2, ToggleLeft, Type, CheckSquare, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrueFalseQuestion } from "./question-types/TrueFalseQuestion";
import { ShortAnswerQuestion } from "./question-types/ShortAnswerQuestion";
import { MultipleChoiceQuestion } from "./question-types/MultipleChoiceQuestion";

interface QuestionCardProps {
  question: any;
  index: number;
  onUpdate: (id: number, updates: any) => void;
  onDelete: (id: number) => void;
}

export function QuestionCard({ question, index, onUpdate, onDelete }: QuestionCardProps) {
  const questionTypes = [
    { value: "VRAI_FAUX", label: "Vrai ou Faux", icon: ToggleLeft },
    { value: "REPONSE_COURTE", label: "Réponse courte", icon: Type },
    { value: "CHOIX_UNIQUE", label: "Question à choix unique", icon: CheckSquare },
    { value: "CHOIX_MULTIPLE", label: "Question à choix multiple", icon: HelpCircle },
  ];

  const handleQuestionChange = (value: string) => {
    if (value.length <= 250) {
      onUpdate(question.id, { question: value });
    }
  };

  const handleTypeChange = (value: string) => {
    const updates: any = { type: value };
    if (value === "VRAI_FAUX") {
      updates.correctAnswer = "true";
      delete updates.options;
      delete updates.correctAnswers;
    } else if (value === "CHOIX_UNIQUE") {
      updates.correctAnswers = [0];
      updates.options = question.options || ["", "", "", ""];
      delete updates.correctAnswer;
    } else if (value === "CHOIX_MULTIPLE") {
      updates.correctAnswers = [];
      updates.options = question.options || ["", "", "", ""];
      delete updates.correctAnswer;
    } else if (value === "REPONSE_COURTE") {
      updates.correctAnswer = "";
      delete updates.options;
      delete updates.correctAnswers;
    }
    onUpdate(question.id, updates);
  };

  const renderQuestionType = () => {
    switch (question.type) {
      case "VRAI_FAUX":
        return <TrueFalseQuestion question={question} onUpdate={onUpdate} />;
      case "REPONSE_COURTE":
        return <ShortAnswerQuestion question={question} onUpdate={onUpdate} />;
      case "CHOIX_UNIQUE":
      case "CHOIX_MULTIPLE":
        return <MultipleChoiceQuestion question={question} onUpdate={onUpdate} />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white border-orange-200 shadow-lg">
      <CardHeader className="pb-3 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full text-sm font-medium">
              {index + 1}
            </div>
            <Select value={question.type} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-64 bg-white border-orange-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {questionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center">
                      <type.icon className="w-4 h-4 mr-2" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-orange-200 text-orange-700">
              {question.timeLimit}s
            </Badge>
            <Badge variant="outline" className="border-orange-200 text-orange-700">
              {question.points} pts
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(question.id)}
              className="text-red-500 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Question *
            </label>
            <span className="text-xs text-gray-500">
              {question.question.length}/250 caractères
            </span>
          </div>
          <Textarea
            value={question.question}
            onChange={(e) => handleQuestionChange(e.target.value)}
            placeholder="Saisissez votre question..."
            rows={2}
            maxLength={250}
            className={`bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500 ${
              question.question.length > 200 ? 'border-amber-300' : ''
            } ${question.question.length === 250 ? 'border-red-300' : ''}`}
          />
          {question.question.length > 200 && (
            <p className={`text-xs mt-1 ${
              question.question.length === 250 ? 'text-red-500' : 'text-amber-600'
            }`}>
              {question.question.length === 250 ? 'Limite de caractères atteinte' : 'Approche de la limite'}
            </p>
          )}
        </div>

        {renderQuestionType()}

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Temps limite (secondes)
            </label>
            <Input
              type="number"
              value={question.timeLimit}
              onChange={(e) => onUpdate(question.id, { timeLimit: parseInt(e.target.value) })}
              min="5"
              max="120"
              className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Points
            </label>
            <Input
              type="number"
              value={question.points}
              onChange={(e) => onUpdate(question.id, { points: parseInt(e.target.value) })}
              min="10"
              max="1000"
              step="10"
              className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
