
import { Plus, HelpCircle, ChartBar } from "lucide-react";
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
    <div className="space-y-s32">
      {/* En-tête avec animation */}
      <div className="text-center space-y-s16 animate-fade-in-up">
        <div className="inline-flex items-center space-x-s12 bg-gradient-to-r from-emerald-100 to-green-100 px-s24 py-s12 rounded-full">
          <Plus className="w-6 h-6 text-emerald-600" />
          <span className="text-h5-bold text-emerald-700">Création des Questions</span>
        </div>
        <p className="text-body1-medium text-akili-grey-600 max-w-2xl mx-auto">
          Ajoutez et configurez les questions de votre jeu ({questions.length} question{questions.length > 1 ? 's' : ''})
        </p>
      </div>

      {/* Actions rapides */}
      <div className="flex flex-wrap items-center justify-between gap-s16 bg-gradient-to-r from-white/90 to-gray-50/80 backdrop-blur-sm rounded-2xl p-s24 border border-gray-200/60">
        <div className="flex items-center space-x-s16">
          <div className="bg-emerald-100 p-s12 rounded-xl">
            <ChartBar className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-body1-bold text-akili-grey-800">Questions ({questions.length})</h3>
            <p className="text-body2-medium text-akili-grey-600">Diversifiez les types pour plus d'engagement</p>
          </div>
        </div>
        <Button
          onClick={addQuestion}
          className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium px-s24 py-s12 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter une Question
        </Button>
      </div>

      {/* Liste des questions */}
      <div className="space-y-s24">
        {questions.map((question, index) => (
          <div key={question.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
            <QuestionCard
              question={question}
              index={index}
              onUpdate={updateQuestion}
              onDelete={deleteQuestion}
            />
          </div>
        ))}
      </div>

      {/* État vide amélioré */}
      {questions.length === 0 && (
        <div className="text-center py-s48 bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl border-2 border-dashed border-emerald-200 relative overflow-hidden">
          {/* Éléments décoratifs */}
          <div className="absolute top-6 left-6 w-16 h-16 bg-emerald-200/30 rounded-full"></div>
          <div className="absolute bottom-6 right-6 w-12 h-12 bg-green-200/30 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-emerald-100/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 space-y-s20">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-s12">
              <h3 className="text-h4-bold text-emerald-800">Prêt à créer vos questions ?</h3>
              <p className="text-body1-medium text-emerald-700 max-w-md mx-auto">
                Commencez par ajouter votre première question et choisissez parmi plusieurs types interactifs
              </p>
            </div>
            <Button
              onClick={addQuestion}
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-akili-bold px-s32 py-s16 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Créer ma première question
            </Button>
          </div>
        </div>
      )}

      {/* Conseils pour les questions */}
      {questions.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-s24">
          <div className="flex items-start space-x-s16">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">💡</span>
            </div>
            <div className="space-y-s12">
              <h4 className="text-body1-bold text-blue-900">Conseils pour des questions efficaces</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-s16">
                <ul className="text-body2-medium text-blue-800 space-y-s4">
                  <li>• Variez les types de questions (choix multiple, vrai/faux...)</li>
                  <li>• Adaptez le temps selon la complexité</li>
                  <li>• Répartissez équitablement les points</li>
                </ul>
                <ul className="text-body2-medium text-blue-800 space-y-s4">
                  <li>• Évitez les questions trop longues</li>
                  <li>• Utilisez un langage clair et précis</li>
                  <li>• Testez la logique de vos réponses</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
