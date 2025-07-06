import { useState, useEffect } from "react";
import { ArrowLeft, Save, Plus, Check, X, Clock, FileImage, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { gameService, QuestionType, PointSystem } from "@/services/gameService";

interface QuizCreatorProps {
  quiz?: any;
  onNavigate: (view: string) => void;
}

interface Question {
  id: string;
  libelle: string;
  temps: number;
  typeQuestion: string;
  point: string;
  fichier?: string;
  type_fichier?: string;
  limite_response?: boolean;
  answers: Answer[];
}

interface Answer {
  id: string;
  reponse_texte: string;
  etat: boolean;
}

export function QuizCreator({ quiz, onNavigate }: QuizCreatorProps) {
  const { toast } = useToast();
  
  // États principaux
  const [step, setStep] = useState(1);
  const [gameTitle, setGameTitle] = useState(quiz?.titre || "");
  const [gameImage, setGameImage] = useState(quiz?.image || "");
  const [gameId, setGameId] = useState<string | null>(quiz?._id || null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  
  // États pour les références API
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);
  const [pointSystems, setPointSystems] = useState<PointSystem[]>([]);
  const [loading, setLoading] = useState(false);

  // Charger les références au montage
  useEffect(() => {
    const loadReferences = async () => {
      try {
        setLoading(true);
        const [typesResult, pointsResult] = await Promise.all([
          gameService.getQuestionTypes(),
          gameService.getPointSystems()
        ]);
        
        setQuestionTypes(typesResult);
        setPointSystems(pointsResult);
      } catch (error) {
        console.error('Erreur lors du chargement des références:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les types de questions et points",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadReferences();
  }, []);

  // Créer le jeu
  const handleCreateGame = async () => {
    if (!gameTitle.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre du jeu est requis",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const gameData = {
        titre: gameTitle,
        image: gameImage || undefined
      };

      const result = await gameService.createGame(gameData);
      setGameId(result._id);
      setStep(2);
      
      toast({
        title: "Succès",
        description: "Jeu créé avec succès",
      });
    } catch (error) {
      console.error('Erreur lors de la création du jeu:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la création du jeu",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Initialiser une nouvelle question
  const initNewQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      libelle: "",
      temps: 30,
      typeQuestion: questionTypes[0]?._id || "",
      point: pointSystems[0]?.id || "",
      fichier: "",
      type_fichier: "",
      limite_response: true,
      answers: []
    };
    
    setCurrentQuestion(newQuestion);
    setStep(3);
  };

  // Gérer le changement de type de question
  const handleQuestionTypeChange = (typeId: string) => {
    if (!currentQuestion) return;
    
    const questionType = questionTypes.find(t => t._id === typeId);
    let defaultAnswers: Answer[] = [];
    
    if (questionType?.reference === "32") { // Vrai/Faux
      defaultAnswers = [
        { id: "1", reponse_texte: "Vrai", etat: true },
        { id: "2", reponse_texte: "Faux", etat: false }
      ];
    } else if (questionType?.reference === "31") { // Choix unique
      defaultAnswers = [
        { id: "1", reponse_texte: "", etat: true },
        { id: "2", reponse_texte: "", etat: false }
      ];
    } else if (questionType?.reference === "30") { // Choix multiple
      defaultAnswers = [
        { id: "1", reponse_texte: "", etat: false },
        { id: "2", reponse_texte: "", etat: false },
        { id: "3", reponse_texte: "", etat: false },
        { id: "4", reponse_texte: "", etat: false }
      ];
    }
    
    setCurrentQuestion({
      ...currentQuestion,
      typeQuestion: typeId,
      answers: defaultAnswers
    });
  };

  // Ajouter une réponse
  const addAnswer = () => {
    if (!currentQuestion) return;
    
    const newAnswer: Answer = {
      id: Date.now().toString(),
      reponse_texte: "",
      etat: false
    };
    
    setCurrentQuestion({
      ...currentQuestion,
      answers: [...currentQuestion.answers, newAnswer]
    });
  };

  // Supprimer une réponse
  const removeAnswer = (answerId: string) => {
    if (!currentQuestion) return;
    
    setCurrentQuestion({
      ...currentQuestion,
      answers: currentQuestion.answers.filter(a => a.id !== answerId)
    });
  };

  // Mettre à jour une réponse
  const updateAnswer = (answerId: string, field: string, value: any) => {
    if (!currentQuestion) return;
    
    setCurrentQuestion({
      ...currentQuestion,
      answers: currentQuestion.answers.map(a => 
        a.id === answerId ? { ...a, [field]: value } : a
      )
    });
  };

  // Sauvegarder la question
  const saveQuestion = async () => {
    if (!currentQuestion || !gameId) return;
    
    // Validation
    if (!currentQuestion.libelle.trim()) {
      toast({
        title: "Erreur",
        description: "Le libellé de la question est requis",
        variant: "destructive"
      });
      return;
    }
    
    if (currentQuestion.answers.length === 0) {
      toast({
        title: "Erreur", 
        description: "Au moins une réponse est requise",
        variant: "destructive"
      });
      return;
    }
    
    if (!currentQuestion.answers.some(a => a.etat)) {
      toast({
        title: "Erreur",
        description: "Au moins une réponse correcte est requise",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      // Créer la question
      const questionData = {
        libelle: currentQuestion.libelle,
        temps: currentQuestion.temps,
        typeQuestion: currentQuestion.typeQuestion,
        point: currentQuestion.point,
        jeu: gameId,
        fichier: currentQuestion.fichier,
        type_fichier: currentQuestion.type_fichier,
        limite_response: currentQuestion.limite_response
      };
      
      const questionResult = await gameService.addQuestion(questionData);
      
      // Créer les réponses
      for (const answer of currentQuestion.answers) {
        if (answer.reponse_texte.trim()) {
          await gameService.addAnswer({
            reponse_texte: answer.reponse_texte,
            etat: answer.etat,
            question: questionResult.id
          });
        }
      }
      
      // Ajouter à la liste des questions
      setQuestions([...questions, { ...currentQuestion, id: questionResult.id }]);
      setCurrentQuestion(null);
      setStep(2);
      
      toast({
        title: "Succès",
        description: "Question ajoutée avec succès",
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la sauvegarde",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Finaliser le jeu
  const finalizeGame = () => {
    toast({
      title: "Jeu terminé",
      description: "Votre jeu a été créé avec succès",
    });
    onNavigate("mes-jeux");
  };

  if (loading && questionTypes.length === 0) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p>Chargement...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => onNavigate("mes-jeux")}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </Button>
              <h1 className="text-xl font-semibold">
                {step === 1 ? "Créer un jeu" : step === 2 ? "Gérer les questions" : "Ajouter une question"}
              </h1>
            </div>
            
            {/* Indicateur d'étapes */}
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > 2 ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Étape 1: Informations du jeu */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Informations du jeu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="game-title">Titre du jeu *</Label>
                <Input
                  id="game-title"
                  value={gameTitle}
                  onChange={(e) => setGameTitle(e.target.value)}
                  placeholder="Ex: Quiz de Mathématiques - Niveau CM1"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="game-image">Image du jeu (optionnel)</Label>
                <Input
                  id="game-image"
                  value={gameImage}
                  onChange={(e) => setGameImage(e.target.value)}
                  placeholder="URL de l'image ou laissez vide"
                  className="mt-2"
                />
                {gameImage && (
                  <div className="mt-3">
                    <img 
                      src={gameImage} 
                      alt="Aperçu" 
                      className="w-32 h-24 object-cover rounded border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleCreateGame}
                  disabled={loading || !gameTitle.trim()}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {loading ? "Création..." : "Créer le jeu"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Étape 2: Liste des questions */}
        {step === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Questions du jeu</CardTitle>
                  <Button onClick={initNewQuestion} className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une question
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {questions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Aucune question ajoutée</p>
                    <p className="text-sm">Cliquez sur "Ajouter une question" pour commencer</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <Card key={question.id} className="border-l-4 border-l-orange-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                Question {index + 1}: {question.libelle}
                              </h4>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {question.temps}s
                                </span>
                                <Badge variant="secondary">
                                  {questionTypes.find(t => t._id === question.typeQuestion)?.libelle || 'Type inconnu'}
                                </Badge>
                                <span>{question.answers.length} réponses</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {questions.length > 0 && (
              <div className="flex justify-end">
                <Button onClick={finalizeGame} className="bg-green-600 hover:bg-green-700">
                  Terminer le jeu
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Étape 3: Ajouter une question */}
        {step === 3 && currentQuestion && (
          <Card>
            <CardHeader>
              <CardTitle>Ajouter une question</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="question-text">Question *</Label>
                <Textarea
                  id="question-text"
                  value={currentQuestion.libelle}
                  onChange={(e) => setCurrentQuestion({...currentQuestion, libelle: e.target.value})}
                  placeholder="Tapez votre question ici..."
                  className="mt-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="question-type">Type de question</Label>
                  <Select value={currentQuestion.typeQuestion} onValueChange={handleQuestionTypeChange}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choisir le type" />
                    </SelectTrigger>
                    <SelectContent>
                      {questionTypes.map(type => (
                        <SelectItem key={type._id} value={type._id}>
                          {type.libelle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="question-time">Temps (secondes)</Label>
                  <Input
                    id="question-time"
                    type="number"
                    min="5"
                    max="300"
                    value={currentQuestion.temps}
                    onChange={(e) => setCurrentQuestion({...currentQuestion, temps: parseInt(e.target.value) || 30})}
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="point-system">Système de points</Label>
                <Select value={currentQuestion.point} onValueChange={(value) => setCurrentQuestion({...currentQuestion, point: value})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choisir le système de points" />
                  </SelectTrigger>
                  <SelectContent>
                    {pointSystems.map(system => (
                      <SelectItem key={system.id} value={system.id}>
                        {system.description} ({system.valeur} points)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Réponses */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Réponses</Label>
                  {questionTypes.find(t => t._id === currentQuestion.typeQuestion)?.reference !== "32" && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addAnswer}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter une réponse
                    </Button>
                  )}
                </div>
                
                <div className="space-y-3">
                  {currentQuestion.answers.map((answer, index) => (
                    <div key={answer.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        checked={answer.etat}
                        onCheckedChange={(checked) => updateAnswer(answer.id, 'etat', checked)}
                      />
                      <Input
                        value={answer.reponse_texte}
                        onChange={(e) => updateAnswer(answer.id, 'reponse_texte', e.target.value)}
                        placeholder={`Réponse ${index + 1}`}
                        className="flex-1"
                        readOnly={questionTypes.find(t => t._id === currentQuestion.typeQuestion)?.reference === "32"}
                      />
                      {questionTypes.find(t => t._id === currentQuestion.typeQuestion)?.reference !== "32" && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAnswer(answer.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentQuestion(null);
                    setStep(2);
                  }}
                >
                  Annuler
                </Button>
                <Button onClick={saveQuestion} disabled={loading} className="bg-orange-500 hover:bg-orange-600">
                  {loading ? "Sauvegarde..." : "Sauvegarder la question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}