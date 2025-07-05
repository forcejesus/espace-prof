
import { useState } from "react";
import { ArrowLeft, Save, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizInfoStep } from "./quiz-creator/QuizInfoStep";
import { QuestionsStep } from "./quiz-creator/QuestionsStep";
import { PreviewStep } from "./quiz-creator/PreviewStep";
import { StepIndicator } from "./quiz-creator/StepIndicator";

interface QuizCreatorProps {
  quiz?: any;
  onNavigate: (view: string) => void;
}

export function QuizCreator({ quiz, onNavigate }: QuizCreatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [quizData, setQuizData] = useState({
    title: quiz?.title || "",
    description: quiz?.description || "",
    subject: quiz?.subject || "",
    difficulty: quiz?.difficulty || "Facile",
    estimatedDuration: quiz?.estimatedDuration || "",
    questions: quiz?.questions || []
  });

  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "CHOIX_UNIQUE",
      question: "Quelle est la capitale de la France ?",
      options: ["Paris", "Lyon", "Marseille", "Toulouse"],
      correctAnswers: [0],
      timeLimit: 30,
      points: 100
    },
    {
      id: 2,
      type: "CHOIX_MULTIPLE",
      question: "Quelles sont les couleurs du drapeau français ?",
      options: ["Bleu", "Rouge", "Vert", "Blanc"],
      correctAnswers: [0, 1, 3],
      timeLimit: 30,
      points: 150
    },
    {
      id: 3,
      type: "VRAI_FAUX",
      question: "La France est le plus grand pays d'Europe.",
      correctAnswer: "false",
      timeLimit: 20,
      points: 50
    }
  ]);

  const steps = [
    { number: 1, title: "Informations", completed: currentStep > 1 },
    { number: 2, title: "Questions", completed: currentStep > 2 },
    { number: 3, title: "Aperçu", completed: currentStep > 3 },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuizInfoStep 
            quizData={quizData} 
            setQuizData={setQuizData} 
          />
        );
      case 2:
        return (
          <QuestionsStep 
            questions={questions} 
            setQuestions={setQuestions} 
          />
        );
      case 3:
        return (
          <PreviewStep 
            quizData={quizData} 
            questions={questions} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(248, 250, 252)' }}>
      <div className="max-w-7xl mx-auto px-s24 py-s32 space-y-32 animate-fade-in-up">
        {/* En-tête amélioré */}
        <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-s40 border border-white/20 animate-slide-in-left relative overflow-hidden">
          {/* Effet de brillance de fond */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-orange-400/10 to-transparent rounded-full"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-s24">
              <Button
                variant="ghost"
                onClick={() => onNavigate("mes-jeux")}
                className="text-akili-grey-700 hover:bg-white/80 border border-akili-grey-300 rounded-xl px-s20 py-s12 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </Button>
              <div className="space-y-s8">
                <h1 className="text-h1-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {quiz ? "✨ Modifier le Jeu" : "🎮 Créer un Nouveau Jeu"}
                </h1>
                <div className="flex items-center space-x-s12">
                  <p className="text-body1-medium text-akili-grey-600">Étape {currentStep} sur 3</p>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <p className="text-body2-medium text-akili-grey-500 italic">Donnez vie à votre imagination</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-s16">
              <Button 
                variant="outline" 
                className="border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl px-s20 py-s12 rounded-xl backdrop-blur-sm"
              >
                <Save className="w-5 h-5 mr-2" />
                Enregistrer
              </Button>
              {currentStep === 3 && (
                <Button 
                  onClick={() => onNavigate("session-live")}
                  className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white font-akili-bold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl px-s24 py-s12 rounded-xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  🚀 Lancer une Session
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Indicateur d'étapes amélioré */}
        <div className="animate-scale-in animate-delay-200">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        {/* Contenu de l'étape avec design amélioré */}
        <div className="max-w-5xl mx-auto animate-fade-in-up animate-delay-300">
          <div className="bg-gradient-to-br from-white/98 to-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative">
            {/* Fond décoratif */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-400/5 to-transparent rounded-full"></div>
            
            <div className="p-s48 relative z-10">
              {renderStepContent()}
            </div>
          </div>
        </div>

        {/* Navigation améliorée */}
        <div className="flex justify-center items-center space-x-s24 animate-fade-in-up animate-delay-400">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="border-2 border-akili-grey-300 text-akili-grey-700 hover:bg-akili-grey-100 hover:border-akili-grey-400 px-s40 py-s16 text-body1-bold transform hover:scale-105 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
              ← Précédent
            </Button>
          )}
          
          {/* Indicateur de progression visuel */}
          <div className="flex items-center space-x-s8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 scale-110'
                    : index === currentStep - 1
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 scale-125 animate-pulse'
                    : 'bg-akili-grey-300'
                }`}
              />
            ))}
          </div>
          
          {currentStep < 3 && (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 text-white font-akili-bold px-s48 py-s16 text-body1-bold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl rounded-xl"
            >
              Suivant →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
