import { useState } from "react";
import { ArrowLeft, Plus, Save, Eye, Trash2, GripVertical, HelpCircle, CheckSquare, Type, Image, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

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
      correctAnswers: [0], // Array to support multiple correct answers
      timeLimit: 30,
      points: 100
    },
    {
      id: 2,
      type: "CHOIX_MULTIPLE",
      question: "Quelles sont les couleurs du drapeau français ?",
      options: ["Bleu", "Rouge", "Vert", "Blanc"],
      correctAnswers: [0, 1, 3], // Multiple correct answers
      timeLimit: 30,
      points: 150
    },
    {
      id: 3,
      type: "REPONSE_COURTE",
      question: "Quelle est la formule chimique de l'eau ?",
      correctAnswer: "H2O",
      timeLimit: 45,
      points: 100
    }
  ]);

  const questionTypes = [
    { value: "CHOIX_UNIQUE", label: "Choix unique", icon: CheckSquare },
    { value: "CHOIX_MULTIPLE", label: "Choix multiple", icon: HelpCircle },
    { value: "REPONSE_COURTE", label: "Réponse courte", icon: Type },
  ];

  const subjects = ["Mathématiques", "Histoire", "Sciences", "Français", "Géographie", "Anglais", "Arts", "Sport"];
  const difficulties = ["Facile", "Intermédiaire", "Difficile"];

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: "CHOIX_UNIQUE",
      question: "",
      options: ["", "", "", ""],
      correctAnswers: [0],
      timeLimit: 30,
      points: 100
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: number, updates: any) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const toggleCorrectAnswer = (questionId: number, optionIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    if (question.type === "CHOIX_UNIQUE") {
      updateQuestion(questionId, { correctAnswers: [optionIndex] });
    } else if (question.type === "CHOIX_MULTIPLE") {
      const currentCorrect = question.correctAnswers || [];
      const newCorrect = currentCorrect.includes(optionIndex)
        ? currentCorrect.filter(i => i !== optionIndex)
        : [...currentCorrect, optionIndex];
      updateQuestion(questionId, { correctAnswers: newCorrect });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-indigo-500" />
                  Informations Générales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Titre du Quiz *
                  </label>
                  <Input
                    value={quizData.title}
                    onChange={(e) => setQuizData({...quizData, title: e.target.value})}
                    placeholder="Ex: Histoire de France - Révolution"
                    className="bg-white border-slate-200 focus:border-indigo-300 focus:ring-indigo-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    value={quizData.description}
                    onChange={(e) => setQuizData({...quizData, description: e.target.value})}
                    placeholder="Décrivez brièvement le contenu de votre quiz..."
                    rows={3}
                    className="bg-white border-slate-200 focus:border-indigo-300 focus:ring-indigo-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Matière *
                    </label>
                    <Select value={quizData.subject} onValueChange={(value) => setQuizData({...quizData, subject: value})}>
                      <SelectTrigger className="bg-white border-slate-200">
                        <SelectValue placeholder="Choisir une matière" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Difficulté
                    </label>
                    <Select value={quizData.difficulty} onValueChange={(value) => setQuizData({...quizData, difficulty: value})}>
                      <SelectTrigger className="bg-white border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((difficulty) => (
                          <SelectItem key={difficulty} value={difficulty}>
                            {difficulty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Durée Estimée
                  </label>
                  <Input
                    value={quizData.estimatedDuration}
                    onChange={(e) => setQuizData({...quizData, estimatedDuration: e.target.value})}
                    placeholder="Ex: 10-15 minutes"
                    className="bg-white border-slate-200 focus:border-indigo-300 focus:ring-indigo-300"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">
                Questions ({questions.length})
              </h3>
              <Button
                onClick={addQuestion}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une Question
              </Button>
            </div>

            {questions.map((question, index) => (
              <Card key={question.id} className="bg-white border-slate-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                        {index + 1}
                      </div>
                      <Select 
                        value={question.type} 
                        onValueChange={(value) => {
                          // Reset correct answers when changing type
                          const updates: any = { type: value };
                          if (value === "CHOIX_UNIQUE") {
                            updates.correctAnswers = [0];
                            updates.options = question.options || ["", "", "", ""];
                          } else if (value === "CHOIX_MULTIPLE") {
                            updates.correctAnswers = [];
                            updates.options = question.options || ["", "", "", ""];
                          } else if (value === "REPONSE_COURTE") {
                            updates.correctAnswer = "";
                            delete updates.options;
                            delete updates.correctAnswers;
                          }
                          updateQuestion(question.id, updates);
                        }}
                      >
                        <SelectTrigger className="w-48 bg-white border-slate-200">
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
                      <Badge variant="outline">
                        {question.timeLimit}s
                      </Badge>
                      <Badge variant="outline">
                        {question.points} pts
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteQuestion(question.id)}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Question *
                    </label>
                    <Textarea
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                      placeholder="Saisissez votre question..."
                      rows={2}
                      className="bg-white border-slate-200 focus:border-indigo-300 focus:ring-indigo-300"
                    />
                  </div>

                  {(question.type === "CHOIX_UNIQUE" || question.type === "CHOIX_MULTIPLE") && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700">
                        Réponses {question.type === "CHOIX_UNIQUE" ? "(sélectionnez la bonne réponse)" : "(sélectionnez toutes les bonnes réponses)"}
                      </label>
                      {question.options?.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-3">
                          {question.type === "CHOIX_UNIQUE" ? (
                            <Button
                              size="sm"
                              variant={question.correctAnswers?.includes(optionIndex) ? "default" : "outline"}
                              onClick={() => toggleCorrectAnswer(question.id, optionIndex)}
                              className={`w-8 h-8 rounded-full p-0 ${
                                question.correctAnswers?.includes(optionIndex)
                                  ? "bg-green-500 hover:bg-green-600"
                                  : "border-slate-300"
                              }`}
                            >
                              {String.fromCharCode(65 + optionIndex)}
                            </Button>
                          ) : (
                            <Checkbox
                              checked={question.correctAnswers?.includes(optionIndex) || false}
                              onCheckedChange={() => toggleCorrectAnswer(question.id, optionIndex)}
                              className="w-5 h-5"
                            />
                          )}
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(question.options || [])];
                              newOptions[optionIndex] = e.target.value;
                              updateQuestion(question.id, { options: newOptions });
                            }}
                            placeholder={`Réponse ${String.fromCharCode(65 + optionIndex)}`}
                            className="flex-1 bg-white border-slate-200 focus:border-indigo-300 focus:ring-indigo-300"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "REPONSE_COURTE" && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700">
                        Réponse attendue
                      </label>
                      <Input
                        value={question.correctAnswer || ""}
                        onChange={(e) => updateQuestion(question.id, { correctAnswer: e.target.value })}
                        placeholder="Saisissez la réponse correcte..."
                        className="bg-white border-slate-200 focus:border-indigo-300 focus:ring-indigo-300"
                      />
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Temps limite (secondes)
                      </label>
                      <Input
                        type="number"
                        value={question.timeLimit}
                        onChange={(e) => updateQuestion(question.id, { timeLimit: parseInt(e.target.value) })}
                        min="5"
                        max="120"
                        className="bg-white border-slate-200 focus:border-indigo-300 focus:ring-indigo-300"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Points
                      </label>
                      <Input
                        type="number"
                        value={question.points}
                        onChange={(e) => updateQuestion(question.id, { points: parseInt(e.target.value) })}
                        min="10"
                        max="1000"
                        step="10"
                        className="bg-white border-slate-200 focus:border-indigo-300 focus:ring-indigo-300"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {questions.length === 0 && (
              <div className="text-center py-12 bg-slate-50 rounded-lg">
                <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">Aucune question ajoutée</h3>
                <p className="text-slate-500 mb-4">Commencez par ajouter votre première question</p>
                <Button
                  onClick={addQuestion}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une Question
                </Button>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-green-500" />
                  Aperçu du Quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">{quizData.title}</h2>
                  <p className="text-slate-600 mb-4">{quizData.description}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-indigo-100 text-indigo-800">{quizData.subject}</Badge>
                    <Badge className="bg-orange-100 text-orange-800">{quizData.difficulty}</Badge>
                    <Badge className="bg-green-100 text-green-800">{questions.length} questions</Badge>
                    <Badge className="bg-purple-100 text-purple-800">{quizData.estimatedDuration}</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">Questions</h3>
                  {questions.map((question, index) => (
                    <Card key={question.id} className="bg-slate-50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-slate-800">
                                {index + 1}. {question.question}
                              </h4>
                              <Badge variant="secondary" className="text-xs">
                                {questionTypes.find(t => t.value === question.type)?.label}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Badge variant="outline">{question.timeLimit}s</Badge>
                            <Badge variant="outline">{question.points} pts</Badge>
                          </div>
                        </div>
                        
                        {(question.type === "CHOIX_UNIQUE" || question.type === "CHOIX_MULTIPLE") && (
                          <div className="grid grid-cols-2 gap-2">
                            {question.options?.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-2 rounded border ${
                                  question.correctAnswers?.includes(optionIndex)
                                    ? "bg-green-100 border-green-300 text-green-800"
                                    : "bg-white border-slate-200"
                                }`}
                              >
                                {question.type === "CHOIX_UNIQUE" ? 
                                  `${String.fromCharCode(65 + optionIndex)}. ${option}` :
                                  `${question.correctAnswers?.includes(optionIndex) ? '✓' : '○'} ${option}`
                                }
                              </div>
                            ))}
                          </div>
                        )}

                        {question.type === "REPONSE_COURTE" && (
                          <div className="bg-green-100 border border-green-300 text-green-800 p-2 rounded">
                            <strong>Réponse attendue:</strong> {question.correctAnswer}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const steps = [
    { number: 1, title: "Informations", completed: currentStep > 1 },
    { number: 2, title: "Questions", completed: currentStep > 2 },
    { number: 3, title: "Aperçu", completed: currentStep > 3 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate("library")}
            className="text-slate-600 hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {quiz ? "Modifier le Quiz" : "Créer un Nouveau Quiz"}
            </h1>
            <p className="text-slate-600">Étape {currentStep} sur 3</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50">
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

      {/* Indicateur d'étapes */}
      <div className="flex items-center justify-center space-x-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.number
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {step.completed ? "✓" : step.number}
              </div>
              <span
                className={`font-medium ${
                  currentStep >= step.number ? "text-slate-800" : "text-slate-500"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-12 h-0.5 bg-slate-200 mx-4" />
            )}
          </div>
        ))}
      </div>

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
            className="border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Précédent
          </Button>
        )}
        {currentStep < 3 && (
          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8"
          >
            Suivant
          </Button>
        )}
      </div>
    </div>
  );
}
