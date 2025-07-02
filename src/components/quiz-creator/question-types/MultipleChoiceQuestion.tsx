
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface MultipleChoiceQuestionProps {
  question: any;
  onUpdate: (id: number, updates: any) => void;
}

export function MultipleChoiceQuestion({ question, onUpdate }: MultipleChoiceQuestionProps) {
  const toggleCorrectAnswer = (optionIndex: number) => {
    if (question.type === "CHOIX_UNIQUE") {
      onUpdate(question.id, { correctAnswers: [optionIndex] });
    } else if (question.type === "CHOIX_MULTIPLE") {
      const currentCorrect = question.correctAnswers || [];
      const newCorrect = currentCorrect.includes(optionIndex)
        ? currentCorrect.filter((i: number) => i !== optionIndex)
        : [...currentCorrect, optionIndex];
      onUpdate(question.id, { correctAnswers: newCorrect });
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Réponses {question.type === "CHOIX_UNIQUE" ? "(sélectionnez la bonne réponse)" : "(sélectionnez toutes les bonnes réponses)"}
      </label>
      {question.options?.map((option: string, optionIndex: number) => (
        <div key={optionIndex} className="flex items-center space-x-3">
          {question.type === "CHOIX_UNIQUE" ? (
            <Button
              size="sm"
              variant={question.correctAnswers?.includes(optionIndex) ? "default" : "outline"}
              onClick={() => toggleCorrectAnswer(optionIndex)}
              className={`w-8 h-8 rounded-full p-0 ${
                question.correctAnswers?.includes(optionIndex)
                  ? "bg-green-500 hover:bg-green-600"
                  : "border-orange-300 hover:border-orange-500"
              }`}
            >
              {String.fromCharCode(65 + optionIndex)}
            </Button>
          ) : (
            <Checkbox
              checked={question.correctAnswers?.includes(optionIndex) || false}
              onCheckedChange={() => toggleCorrectAnswer(optionIndex)}
              className="w-5 h-5"
            />
          )}
          <Input
            value={option}
            onChange={(e) => {
              const newOptions = [...(question.options || [])];
              newOptions[optionIndex] = e.target.value;
              onUpdate(question.id, { options: newOptions });
            }}
            placeholder={`Réponse ${String.fromCharCode(65 + optionIndex)}`}
            className="flex-1 bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      ))}
    </div>
  );
}
