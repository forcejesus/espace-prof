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
import { QuestionType, PointSystem, gameService, questionService, answerService, referenceService } from "@/services";
import { CreatedQuestionsList } from "./quiz-creator/CreatedQuestionsList";

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
  // Type abstrait pour l'interface utilisateur
  abstractType?: "VRAI_FAUX" | "CHOIX_UNIQUE" | "CHOIX_MULTIPLE" | "REPONSE_COURTE";
}

interface Answer {
  id: string;
  reponse_texte: string;
  etat: boolean;
}

export function QuizCreator({ quiz, onNavigate }: QuizCreatorProps) {
  const { toast } = useToast();
  
  // Types de questions abstraits pour l'interface utilisateur
  const abstractQuestionTypes = [
    { 
      id: "VRAI_FAUX", 
      label: "Vrai ou Faux", 
      description: "Deux réponses possibles : Vrai ou Faux",
      icon: "ToggleLeft"
    },
    { 
      id: "CHOIX_UNIQUE", 
      label: "Choix unique", 
      description: "Une seule réponse correcte parmi plusieurs options",
      icon: "CheckSquare"
    },
    { 
      id: "CHOIX_MULTIPLE", 
      label: "Choix multiple", 
      description: "Plusieurs réponses correctes possibles",
      icon: "CheckSquare"
    },
    { 
      id: "REPONSE_COURTE", 
      label: "Réponse courte", 
      description: "Réponse de type texte libre",
      icon: "Type"
    }
  ];
  
  // États principaux
  const [step, setStep] = useState(1);
  const [gameTitle, setGameTitle] = useState(quiz?.titre || "");
  const [gameImage, setGameImage] = useState(quiz?.image || "");
  const [gameId, setGameId] = useState<string | null>(quiz?._id || null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [createdQuestions, setCreatedQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionCharCount, setQuestionCharCount] = useState(0);
  
  // États pour les références API
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);
  const [pointSystems, setPointSystems] = useState<PointSystem[]>([]);
  const [loading, setLoading] = useState(false);

  // Mapper les types abstraits vers les vrais types API
  const mapAbstractTypeToApiType = (abstractType: string): string | null => {
    const mapping: { [key: string]: string } = {};
    
    // Construire le mapping dynamiquement basé sur les types API disponibles
    questionTypes.forEach(type => {
      if (type.libelle === "REPONSE_COURTE" || type.reference === "30") {
        mapping["REPONSE_COURTE"] = type._id;
      } else if (type.libelle === "CHOIX_UNIQUE" || type.reference === "31") {
        mapping["CHOIX_UNIQUE"] = type._id;
        mapping["VRAI_FAUX"] = type._id; // Vrai/Faux utilise CHOIX_UNIQUE
      } else if (type.libelle === "CHOIX_MULTIPLE" || type.reference === "32") {
        mapping["CHOIX_MULTIPLE"] = type._id;
      }
    });
    
    return mapping[abstractType] || null;
  };

  // Mapper les types API vers les types abstraits
  const mapApiTypeToAbstractType = (apiTypeId: string): string => {
    const type = questionTypes.find(t => t._id === apiTypeId);
    if (!type) return "VRAI_FAUX";
    
    if (type.libelle === "VRAI_FAUX" || type.reference === "32") return "VRAI_FAUX";
    if (type.libelle === "CHOIX_UNIQUE" || type.reference === "31") return "CHOIX_UNIQUE";
    if (type.libelle === "CHOIX_MULTIPLE" || type.reference === "30") return "CHOIX_MULTIPLE";
    if (type.libelle === "REPONSE_COURTE") return "REPONSE_COURTE";
    
    return "VRAI_FAUX";
  };

  // Gérer l'upload d'image
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erreur",
        description: "Le fichier est trop volumineux (max 5MB)",
        variant: "destructive"
      });
      return;
    }

    // Convertir en base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setGameImage(base64String);
    };
    reader.onerror = () => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la lecture du fichier",
        variant: "destructive"
      });
    };
    reader.readAsDataURL(file);
  };

  // Mettre à jour le texte de la question avec compteur
  const handleQuestionTextChange = (text: string) => {
    if (text.length <= 255) {
      setCurrentQuestion(prev => prev ? {...prev, libelle: text} : null);
      setQuestionCharCount(text.length);
    }
  };

  // Charger les références au montage
  useEffect(() => {
    const loadReferences = async () => {
      try {
        setLoading(true);
        const [typesResult, pointsResult] = await Promise.all([
          referenceService.getQuestionTypes(),
          referenceService.getPointSystems()
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

  // Charger les questions créées
  const loadCreatedQuestions = async () => {
    if (!gameId) return;

    try {
      const questionsData = await questionService.getGameQuestions(gameId);
      setCreatedQuestions(questionsData);
    } catch (error) {
      console.error('Erreur lors du chargement des questions:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les questions existantes",
        variant: "destructive"
      });
    }
  };

  // Charger les questions quand on passe à l'étape 2
  useEffect(() => {
    if (step === 2 && gameId) {
      loadCreatedQuestions();
    }
  }, [step, gameId]);

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
    console.log('🔍 Point systems available:', pointSystems);
    console.log('🔍 Question types available:', questionTypes);
    
    const defaultPointSystem = pointSystems.length > 0 ? pointSystems[0] : null;
    
    console.log('🔍 Default point system:', defaultPointSystem);
    
    if (!defaultPointSystem) {
      toast({
        title: "Erreur",
        description: "Aucun système de points disponible. Veuillez réessayer.",
        variant: "destructive"
      });
      return;
    }
    
    // Initialiser avec le premier type abstrait (Vrai/Faux)
    const newQuestion: Question = {
      id: Date.now().toString(),
      libelle: "",
      temps: 30,
      typeQuestion: "", // Sera défini lors du changement de type
      point: defaultPointSystem._id,
      fichier: "",
      type_fichier: "",
      limite_response: true,
      answers: [],
      abstractType: "VRAI_FAUX" // Type abstrait par défaut
    };
    
    console.log('🔍 New question initialized:', newQuestion);
    
    setQuestionCharCount(0);
    setCurrentQuestion(newQuestion);
    
    // Initialiser avec le type Vrai/Faux
    handleAbstractTypeChange("VRAI_FAUX", newQuestion);
    setStep(3);
  };

  // Gérer le changement de type abstrait de question
  const handleAbstractTypeChange = (abstractType: string, questionToUpdate?: Question) => {
    const question = questionToUpdate || currentQuestion;
    if (!question) return;
    
    // Mapper le type abstrait vers le type API
    const apiTypeId = mapAbstractTypeToApiType(abstractType);
    if (!apiTypeId) {
      toast({
        title: "Erreur",
        description: "Type de question non disponible",
        variant: "destructive"
      });
      return;
    }
    
    let defaultAnswers: Answer[] = [];
    
    if (abstractType === "VRAI_FAUX") {
      // Vrai/Faux - 2 réponses fixes
      defaultAnswers = [
        { id: "1", reponse_texte: "Vrai", etat: true },
        { id: "2", reponse_texte: "Faux", etat: false }
      ];
    } else if (abstractType === "CHOIX_UNIQUE") {
      // Choix unique - permet d'ajouter plus de réponses, une seule correcte
      defaultAnswers = [
        { id: "1", reponse_texte: "", etat: true },
        { id: "2", reponse_texte: "", etat: false }
      ];
    } else if (abstractType === "CHOIX_MULTIPLE") {
      // Choix multiple - plusieurs réponses peuvent être correctes
      defaultAnswers = [
        { id: "1", reponse_texte: "", etat: false },
        { id: "2", reponse_texte: "", etat: false },
        { id: "3", reponse_texte: "", etat: false },
        { id: "4", reponse_texte: "", etat: false }
      ];
    } else if (abstractType === "REPONSE_COURTE") {
      // Réponse courte - une seule réponse de type texte libre
      defaultAnswers = [
        { id: "1", reponse_texte: "", etat: true }
      ];
    }
    
    const updatedQuestion = {
      ...question,
      abstractType: abstractType as "VRAI_FAUX" | "CHOIX_UNIQUE" | "CHOIX_MULTIPLE" | "REPONSE_COURTE",
      typeQuestion: apiTypeId,
      answers: defaultAnswers
    };
    
    setCurrentQuestion(updatedQuestion);
  };
  const handleQuestionTypeChange = (typeId: string) => {
    if (!currentQuestion) return;
    
    const questionType = questionTypes.find(t => t._id === typeId);
    let defaultAnswers: Answer[] = [];
    
    if (questionType?.libelle === "VRAI_FAUX" || questionType?.reference === "32") { 
      // Vrai/Faux - utilise CHOIX_UNIQUE avec 2 réponses fixes
      defaultAnswers = [
        { id: "1", reponse_texte: "Vrai", etat: true },
        { id: "2", reponse_texte: "Faux", etat: false }
      ];
    } else if (questionType?.libelle === "CHOIX_UNIQUE" || questionType?.reference === "31") { 
      // Choix unique - permet d'ajouter plus de réponses, une seule correcte
      defaultAnswers = [
        { id: "1", reponse_texte: "", etat: true },
        { id: "2", reponse_texte: "", etat: false }
      ];
    } else if (questionType?.libelle === "CHOIX_MULTIPLE" || questionType?.reference === "30") { 
      // Choix multiple - plusieurs réponses peuvent être correctes
      defaultAnswers = [
        { id: "1", reponse_texte: "", etat: false },
        { id: "2", reponse_texte: "", etat: false },
        { id: "3", reponse_texte: "", etat: false },
        { id: "4", reponse_texte: "", etat: false }
      ];
    } else if (questionType?.libelle === "REPONSE_COURTE") {
      // Réponse courte - une seule réponse de type texte libre
      defaultAnswers = [
        { id: "1", reponse_texte: "", etat: true }
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
    
    // Pour les types VRAI_FAUX et CHOIX_UNIQUE, une seule réponse peut être correcte
    if (field === 'etat' && value && (currentQuestion.abstractType === "VRAI_FAUX" || currentQuestion.abstractType === "CHOIX_UNIQUE")) {
      setCurrentQuestion({
        ...currentQuestion,
        answers: currentQuestion.answers.map(a => ({
          ...a,
          etat: a.id === answerId ? true : false
        }))
      });
    } else {
      setCurrentQuestion({
        ...currentQuestion,
        answers: currentQuestion.answers.map(a => 
          a.id === answerId ? { ...a, [field]: value } : a
        )
      });
    }
  };

  // Sauvegarder la question
  const saveQuestion = async () => {
    if (!currentQuestion || !gameId) return;
    
    console.log('🔍 Current question before save:', currentQuestion);
    
    // Validation
    if (!currentQuestion.libelle.trim()) {
      toast({
        title: "Erreur",
        description: "Le libellé de la question est requis",
        variant: "destructive"
      });
      return;
    }
    
    if (!currentQuestion.point || currentQuestion.point.trim() === "") {
      toast({
        title: "Erreur",
        description: "Le système de points est requis",
        variant: "destructive"
      });
      return;
    }
    
    if (!currentQuestion.typeQuestion || currentQuestion.typeQuestion.trim() === "") {
      toast({
        title: "Erreur",
        description: "Le type de question est requis",
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
        limite_response: currentQuestion.limite_response,
        typeQuestion: currentQuestion.typeQuestion,
        point: currentQuestion.point,
        jeu: gameId
      };
      
      console.log('🔍 Question data to send:', questionData);
      
      const questionResult = await questionService.addQuestion(questionData);
      console.log('🔍 Question created successfully:', questionResult);
      
      // Créer les réponses
      console.log('🔍 Answers to create:', currentQuestion.answers);
      for (const answer of currentQuestion.answers) {
        console.log('🔍 Processing answer:', answer);
        if (answer.reponse_texte.trim()) {
          const answerData = {
            reponse_texte: answer.reponse_texte,
            etat: answer.etat,
            question: (questionResult as any)._id // Utiliser _id avec assertion de type
          };
          
          console.log('🔍 Answer data to send:', answerData);
          console.log('🔍 Question result ID:', questionResult.id);
          
          try {
            const answerResult = await answerService.addAnswer(answerData);
            console.log('🔍 Answer created successfully:', answerResult);
          } catch (error) {
            console.error('🔍 Error creating answer:', error);
            throw error;
          }
        } else {
          console.log('🔍 Skipping empty answer:', answer);
        }
      }
      
      // Ajouter à la liste des questions
      setQuestions([...questions, { ...currentQuestion, id: questionResult.id }]);
      setCurrentQuestion(null);
      setStep(2);
      
      // Recharger les questions créées
      await loadCreatedQuestions();
      
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
                <div className="mt-2">
                  <Input
                    id="game-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Formats acceptés: JPG, PNG, GIF (max 5MB)
                  </p>
                </div>
                {gameImage && (
                  <div className="mt-3">
                    <img 
                      src={gameImage} 
                      alt="Aperçu" 
                      className="w-32 h-24 object-cover rounded border"
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
                <CreatedQuestionsList 
                  questions={createdQuestions}
                  onQuestionUpdated={loadCreatedQuestions}
                />
              </CardContent>
            </Card>
            
            {createdQuestions.length > 0 && (
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="question-text">Question *</Label>
                  <span className={`text-sm ${
                    questionCharCount > 200 ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {questionCharCount}/255
                  </span>
                </div>
                <Textarea
                  id="question-text"
                  value={currentQuestion.libelle}
                  onChange={(e) => handleQuestionTextChange(e.target.value)}
                  placeholder="Tapez votre question ici..."
                  className="mt-2"
                  maxLength={255}
                />
                {questionCharCount > 200 && (
                  <p className="text-sm text-orange-600 mt-1">
                    Attention: Vous approchez de la limite de caractères
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="question-type">Type de question</Label>
                  <Select value={currentQuestion.abstractType || "VRAI_FAUX"} onValueChange={handleAbstractTypeChange}>
                    <SelectTrigger className="mt-2 bg-white border-gray-200 z-50">
                      <SelectValue placeholder="Choisir le type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                      {abstractQuestionTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
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
                  <SelectTrigger className="mt-2 bg-white border-gray-200 z-50">
                    <SelectValue placeholder="Choisissez un système de points" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg z-50">
                    {pointSystems.map(system => (
                      <SelectItem key={system._id} value={system._id}>
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{system.nature}</span>
                          <div className="flex items-center space-x-2 ml-4">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {system.valeur} pts
                            </Badge>
                            <span className="text-sm text-gray-500">{system.description}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {pointSystems.length === 0 && (
                  <p className="text-sm text-red-500 mt-2">
                    Aucun système de points disponible
                  </p>
                )}
              </div>
              
               {/* Réponses */}
               <div>
                 <div className="flex items-center justify-between mb-4">
                   <Label>Réponses</Label>
                   {/* Bouton ajouter réponse - seulement pour choix unique/multiple mais pas vrai/faux */}
                   {(currentQuestion.abstractType === "CHOIX_UNIQUE" || currentQuestion.abstractType === "CHOIX_MULTIPLE") && (
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
                 
                 {/* Interface pour Réponse courte */}
                 {currentQuestion.abstractType === "REPONSE_COURTE" ? (
                   <div className="space-y-3">
                     <Label className="text-sm font-medium text-gray-700">
                       Saisissez la réponse attendue
                     </Label>
                     <Input
                       value={currentQuestion.answers[0]?.reponse_texte || ""}
                       onChange={(e) => updateAnswer(currentQuestion.answers[0]?.id || "1", 'reponse_texte', e.target.value)}
                       placeholder="Réponse correcte attendue..."
                       className="w-full"
                     />
                   </div>
                 ) : (
                   /* Interface pour les autres types */
                   <div className="space-y-3">
                     {currentQuestion.answers.map((answer, index) => {
                       const isVraiFaux = currentQuestion.abstractType === "VRAI_FAUX";
                       const isChoixUnique = currentQuestion.abstractType === "CHOIX_UNIQUE";
                       const isChoixMultiple = currentQuestion.abstractType === "CHOIX_MULTIPLE";
                       
                       return (
                         <div key={answer.id} className="flex items-center space-x-3 p-3 border rounded-lg bg-gray-50">
                           {/* Radio button pour Vrai/Faux et Choix unique */}
                           {(isVraiFaux || isChoixUnique) && (
                             <div className="flex items-center">
                               <input
                                 type="radio"
                                 name={`question-${currentQuestion.id}`}
                                 checked={answer.etat}
                                 onChange={() => updateAnswer(answer.id, 'etat', true)}
                                 className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                               />
                             </div>
                           )}
                           
                           {/* Checkbox pour Choix multiple */}
                           {isChoixMultiple && (
                             <Checkbox
                               checked={answer.etat}
                               onCheckedChange={(checked) => updateAnswer(answer.id, 'etat', checked)}
                               className="w-4 h-4"
                             />
                           )}
                           
                           <Input
                             value={answer.reponse_texte}
                             onChange={(e) => updateAnswer(answer.id, 'reponse_texte', e.target.value)}
                             placeholder={isVraiFaux ? (index === 0 ? "Vrai" : "Faux") : `Réponse ${index + 1}`}
                             className="flex-1"
                             readOnly={isVraiFaux}
                           />
                           
                           {/* Bouton supprimer - pas pour Vrai/Faux */}
                           {!isVraiFaux && (
                             <Button
                               type="button"
                               variant="ghost"
                               size="sm"
                               onClick={() => removeAnswer(answer.id)}
                               className="text-red-500 hover:bg-red-50"
                             >
                               <X className="w-4 h-4" />
                             </Button>
                           )}
                         </div>
                       );
                     })}
                   </div>
                 )}
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