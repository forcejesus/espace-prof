
import { useState } from "react";
import { ArrowLeft, Plus, Save, Eye, Trash2, GripVertical, HelpCircle, CheckSquare, Type, Image, Play, ToggleLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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

  const questionTypes = [
    { value: "VRAI_FAUX", label: "Vrai ou Faux", icon: ToggleLeft },
    { value: "REPONSE_COURTE", label: "Réponse courte", icon: Type },
    { value: "CHOIX_UNIQUE", label: "Question à choix unique", icon: CheckSquare },
    { value: "CHOIX_MULTIPLE", label: "Question à choix multiple", icon: HelpCircle },
  ];

  const subjects = ["Mathématiques", "Histoire", "Sciences", "Français", "Géographie", "Anglais", "Arts", "Sport"];
  const difficulties = ["Facile", "Intermédiaire", "Difficile"];

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

  const handleQuestionChange = (id: number, value: string) => {
    if (value.length <= 250) {
      updateQuestion(id, { question: value });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                <CardTitle className="flex items-center text-orange-800">
                  <HelpCircle className="w-5 h-5 mr-2 text-orange-600" />
                  Informations Générales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre du Quiz *
                  </label>
                  <Input
                    value={quizData.title}
                    onChange={(e) => setQuizData({...quizData, title: e.target.value})}
                    placeholder="Ex: Histoire de France - Révolution"
                    className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    value={quizData.description}
                    onChange={(e) => setQuizData({...quizData, description: e.target.value})}
                    placeholder="Décrivez brièvement le contenu de votre quiz..."
                    rows={3}
                    className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Matière *
                    </label>
                    <Select value={quizData.subject} onValueChange={(value) => setQuizData({...quizData, subject: value})}>
                      <SelectTrigger className="bg-white border-orange-200 focus:border-orange-500">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulté
                    </label>
                    <Select value={quizData.difficulty} onValueChange={(value) => setQuizData({...quizData, difficulty: value})}>
                      <SelectTrigger className="bg-white border-orange-200 focus:border-orange-500">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durée Estimée
                  </label>
                  <Input
                    value={quizData.estimatedDuration}
                    onChange={(e) => setQuizData({...quizData, estimatedDuration: e.target.value})}
                    placeholder="Ex: 10-15 minutes"
                    className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
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
              <Card key={question.id} className="bg-white border-orange-200 shadow-lg">
                <CardHeader className="pb-3 bg-gradient-to-r from-orange-50 to-orange-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full text-sm font-medium">
                        {index + 1}
                      </div>
                      <Select 
                        value={question.type} 
                        onValueChange={(value) => {
                          const updates: any = { type: value };
                          if (value === "VRAI_FAUX") {
                            updates.correctAnswer = "true";
                            delete updates.options;
                            delete updates.correctAnswers;
                          } else if (value === "CHOIX_UNIQUE") {
                            updates.correctAnswers = [0];
                            updates.options = question.options || ["", "", "", ""];
                            delete updates.correctAnswer;
                          } else if (value === "CHOIX_MULTIPLE") {
                            updates.correctAnswers = [];
                            updates.options = question.options || ["", "", "", ""];
                            delete updates.correctAnswer;
                          } else if (value === "REPONSE_COURTE") {
                            updates.correctAnswer = "";
                            delete updates.options;
                            delete updates.correctAnswers;
                          }
                          updateQuestion(question.id, updates);
                        }}
                      >
                        <SelectTrigger className="w-64 bg-white border-orange-200">
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
                      <Badge variant="outline" className="border-orange-200 text-orange-700">
                        {question.timeLimit}s
                      </Badge>
                      <Badge variant="outline" className="border-orange-200 text-orange-700">
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
                <CardContent className="space-y-4 p-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Question *
                      </label>
                      <span className="text-xs text-gray-500">
                        {question.question.length}/250 caractères
                      </span>
                    </div>
                    <Textarea
                      value={question.question}
                      onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                      placeholder="Saisissez votre question..."
                      rows={2}
                      maxLength={250}
                      className={`bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500 ${
                        question.question.length > 200 ? 'border-amber-300' : ''
                      } ${question.question.length === 250 ? 'border-red-300' : ''}`}
                    />
                    {question.question.length > 200 && (
                      <p className={`text-xs mt-1 ${
                        question.question.length === 250 ? 'text-red-500' : 'text-amber-600'
                      }`}>
                        {question.question.length === 250 ? 'Limite de caractères atteinte' : 'Approche de la limite'}
                      </p>
                    )}
                  </div>

                  {question.type === "VRAI_FAUX" && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Réponse correcte
                      </label>
                      <RadioGroup 
                        value={question.correctAnswer || "true"} 
                        onValueChange={(value) => updateQuestion(question.id, { correctAnswer: value })}
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
                  )}

                  {(question.type === "CHOIX_UNIQUE" || question.type === "CHOIX_MULTIPLE") && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
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
                                  : "border-orange-300 hover:border-orange-500"
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
                            className="flex-1 bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "REPONSE_COURTE" && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Réponse attendue
                      </label>
                      <Input
                        value={question.correctAnswer || ""}
                        onChange={(e) => updateQuestion(question.id, { correctAnswer: e.target.value })}
                        placeholder="Saisissez la réponse correcte..."
                        className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Temps limite (secondes)
                      </label>
                      <Input
                        type="number"
                        value={question.timeLimit}
                        onChange={(e) => updateQuestion(question.id, { timeLimit: parseInt(e.target.value) })}
                        min="5"
                        max="120"
                        className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Points
                      </label>
                      <Input
                        type="number"
                        value={question.points}
                        onChange={(e) => updateQuestion(question.id, { points: parseInt(e.target.value) })}
                        min="10"
                        max="1000"
                        step="10"
                        className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
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

      case 3:
        return (
          <div className="space-y-6">
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                <CardTitle className="flex items-center text-orange-800">
                  <Eye className="w-5 h-5 mr-2 text-orange-600" />
                  Aperçu du Quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                  <h2 className="text-2xl font-bold text-orange-900 mb-2">{quizData.title}</h2>
                  <p className="text-orange-700 mb-4">{quizData.description}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">{quizData.subject}</Badge>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">{quizData.difficulty}</Badge>
                    <Badge className="bg-green-100 text-green-800 border-green-200">{questions.length} questions</Badge>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">{quizData.estimatedDuration}</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Questions</h3>
                  {questions.map((question, index) => (
                    <Card key={question.id} className="bg-orange-50 border-orange-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-gray-800">
                                {index + 1}. {question.question}
                              </h4>
                              <Badge variant="secondary" className="text-xs bg-orange-200 text-orange-800">
                                {questionTypes.find(t => t.value === question.type)?.label}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Badge variant="outline" className="border-orange-300 text-orange-700">{question.timeLimit}s</Badge>
                            <Badge variant="outline" className="border-orange-300 text-orange-700">{question.points} pts</Badge>
                          </div>
                        </div>
                        
                        {question.type === "VRAI_FAUX" && (
                          <div className="flex space-x-4">
                            <div className={`p-2 rounded border ${
                              question.correctAnswer === "true"
                                ? "bg-green-100 border-green-300 text-green-800"
                                : "bg-gray-100 border-gray-300"
                            }`}>
                              ✓ Vrai
                            </div>
                            <div className={`p-2 rounded border ${
                              question.correctAnswer === "false"
                                ? "bg-green-100 border-green-300 text-green-800"
                                : "bg-gray-100 border-gray-300"
                            }`}>
                              ✓ Faux
                            </div>
                          </div>
                        )}

                        {(question.type === "CHOIX_UNIQUE" || question.type === "CHOIX_MULTIPLE") && (
                          <div className="grid grid-cols-2 gap-2">
                            {question.options?.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-2 rounded border ${
                                  question.correctAnswers?.includes(optionIndex)
                                    ? "bg-green-100 border-green-300 text-green-800"
                                    : "bg-white border-orange-200"
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

      {/* Indicateur d'étapes */}
      <div className="flex items-center justify-center space-x-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.number
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                    : "bg-orange-200 text-orange-600"
                }`}
              >
                {step.completed ? "✓" : step.number}
              </div>
              <span
                className={`font-medium ${
                  currentStep >= step.number ? "text-orange-900" : "text-orange-600"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-12 h-0.5 bg-orange-200 mx-4" />
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
