import { CreatedQuestion } from "./utils/questionTypeUtils";
import { QuestionCard } from "./components/QuestionCard";

interface CreatedQuestionsListProps {
  questions: CreatedQuestion[];
  onQuestionUpdated: () => void;
}

export function CreatedQuestionsList({ questions, onQuestionUpdated }: CreatedQuestionsListProps) {

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
        <QuestionCard 
          key={question._id} 
          question={question} 
          index={index}
          onQuestionUpdated={onQuestionUpdated}
        />
      ))}
    </div>
  );
}