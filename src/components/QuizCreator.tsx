
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
    <div className="p-6 space-y-6 bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate("library")}
            className="text-orange-700 hover:bg-orange-100 border border-orange-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-orange-900">
              {quiz ? "Modifier le Quiz" : "Créer un Nouveau Quiz"}
            </h1>
            <p className="text-orange-700">Étape {currentStep} sur 3</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
            <Save className="w-4 h-4 mr-2" />
            Enregistrer
          </Button>
          {currentStep === 3 && (
            <Button 
              onClick={() => onNavigate("live")}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              Lancer une Session
            </Button>
          )}
        </div>
      </div>

      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Contenu de l'étape */}
      <div className="max-w-4xl mx-auto">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4">
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            Précédent
          </Button>
        )}
        {currentStep < 3 && (
          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8"
          >
            Suivant
          </Button>
        )}
      </div>
    </div>
  );
}
