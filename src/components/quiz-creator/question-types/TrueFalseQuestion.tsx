
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TrueFalseQuestionProps {
  question: any;
  onUpdate: (id: number, updates: any) => void;
}

export function TrueFalseQuestion({ question, onUpdate }: TrueFalseQuestionProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Réponse correcte
      </label>
      <RadioGroup 
        value={question.correctAnswer || "true"} 
        onValueChange={(value) => onUpdate(question.id, { correctAnswer: value })}
        className="flex space-x-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="true" id={`true-${question.id}`} />
          <Label htmlFor={`true-${question.id}`} className="text-green-600 font-medium">
            Vrai
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="false" id={`false-${question.id}`} />
          <Label htmlFor={`false-${question.id}`} className="text-red-600 font-medium">
            Faux
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
