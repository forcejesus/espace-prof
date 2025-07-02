
import { Input } from "@/components/ui/input";

interface ShortAnswerQuestionProps {
  question: any;
  onUpdate: (id: number, updates: any) => void;
}

export function ShortAnswerQuestion({ question, onUpdate }: ShortAnswerQuestionProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Réponse attendue
      </label>
      <Input
        value={question.correctAnswer || ""}
        onChange={(e) => onUpdate(question.id, { correctAnswer: e.target.value })}
        placeholder="Saisissez la réponse correcte..."
        className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
      />
    </div>
  );
}
