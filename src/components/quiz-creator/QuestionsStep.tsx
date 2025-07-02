
import { Plus, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "./QuestionCard";

interface QuestionsStepProps {
  questions: any[];
  setQuestions: (questions: any[]) => void;
}

export function QuestionsStep({ questions, setQuestions }: QuestionsStepProps) {
  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: "VRAI_FAUX",
      question: "",
      correctAnswer: "true",
      timeLimit: 20,
      points: 50
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: number, updates: any) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Questions ({questions.length})
        </h3>
        <Button
          onClick={addQuestion}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une Question
        </Button>
      </div>

      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          question={question}
          index={index}
          onUpdate={updateQuestion}
          onDelete={deleteQuestion}
        />
      ))}

      {questions.length === 0 && (
        <div className="text-center py-12 bg-orange-50 rounded-lg border border-orange-200">
          <HelpCircle className="w-16 h-16 text-orange-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-orange-800 mb-2">Aucune question ajoutée</h3>
          <p className="text-orange-600 mb-4">Commencez par ajouter votre première question</p>
          <Button
            onClick={addQuestion}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une Question
          </Button>
        </div>
      )}
    </div>
  );
}
