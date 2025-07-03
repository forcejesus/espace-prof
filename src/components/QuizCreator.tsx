
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
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
      <div className="max-w-7xl mx-auto px-s24 py-s32 space-y-40 animate-fade-in-up">
        {/* En-tête */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-s32 border-0 animate-slide-in-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-s20">
              <Button
                variant="ghost"
                onClick={() => onNavigate("mes-jeux")}
                className="text-akili-grey-700 hover:bg-akili-grey-200 border border-akili-grey-400 transform hover:scale-105 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <div>
                <h1 className="text-h1-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {quiz ? "Modifier le Jeu" : "Créer un Nouveau Jeu"}
                </h1>
                <p className="text-body1-medium text-akili-grey-700 mt-s8">Étape {currentStep} sur 3 - Donnez vie à votre imagination</p>
              </div>
            </div>
            
            <div className="flex space-x-s12">
              <Button variant="outline" className="border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200 transform hover:scale-105 transition-all duration-300">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer
              </Button>
              {currentStep === 3 && (
                <Button 
                  onClick={() => onNavigate("session-live")}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-akili-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Lancer une Session
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="animate-scale-in animate-delay-200">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        {/* Contenu de l'étape */}
        <div className="max-w-4xl mx-auto animate-fade-in-up animate-delay-300">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-s40 border-0">
            {renderStepContent()}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-s20 animate-fade-in-up animate-delay-400">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200 px-s32 py-s16 text-h5-bold transform hover:scale-105 transition-all duration-300"
            >
              Précédent
            </Button>
          )}
          {currentStep < 3 && (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-akili-bold px-s40 py-s16 text-h5-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Suivant
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
