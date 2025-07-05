import { useState } from "react";
import { ArrowLeft, Save, Play, Plus, Settings, Eye, Share, FileText, Users, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface QuizCreatorProps {
  quiz?: any;
  onNavigate: (view: string) => void;
}

export function QuizCreator({ quiz, onNavigate }: QuizCreatorProps) {
  const { toast } = useToast();
  const [quizTitle, setQuizTitle] = useState(quiz?.title || "Nouveau Quiz");
  const [activeTab, setActiveTab] = useState("build");
  const [startScreenTitle, setStartScreenTitle] = useState("Bienvenue à votre Quiz");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "text",
      question: "Quelle est votre matière préférée ?",
      options: []
    },
    {
      id: 2,
      type: "text", 
      question: "Quel est votre niveau d'étude ?",
      options: []
    },
    {
      id: 3,
      type: "text",
      question: "Combien d'heures étudiez-vous par jour ?",
      options: []
    }
  ]);

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: "text",
      question: "Nouvelle question...",
      options: []
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: number, field: string, value: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSave = () => {
    toast({
      title: "Quiz sauvegardé",
      description: "Votre quiz a été sauvegardé avec succès.",
    });
  };

  const handlePublish = () => {
    toast({
      title: "Quiz publié",
      description: "Votre quiz est maintenant disponible pour vos apprenants.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
              <div className="h-6 w-px bg-gray-300"></div>
              <Input
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="text-xl font-semibold border-none shadow-none p-0 h-auto bg-transparent focus-visible:ring-0"
              />
              <Edit className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
              <Button 
                onClick={handlePublish}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Publier
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="build" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none px-6 py-4"
              >
                Construire
              </TabsTrigger>
              <TabsTrigger 
                value="design" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none px-6 py-4"
              >
                Design
              </TabsTrigger>
              <TabsTrigger 
                value="configure" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none px-6 py-4"
              >
                Configurer
              </TabsTrigger>
              <TabsTrigger 
                value="share" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none px-6 py-4"
              >
                Partager
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none px-6 py-4"
              >
                Rapports
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Left Panel - Builder */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bienvenue au Constructeur de Contenu</h3>
              <p className="text-gray-600 mb-6">Glissez-déposez les éléments de construction de contenu pour créer votre contenu.</p>
              
              {/* Start Screen */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-700">Écran de Démarrage:</span>
                </div>
                <Card className="border-dashed border-2 border-blue-200 bg-blue-50/30">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-700">Page de Couverture</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Content Elements */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-700">Éléments de Contenu:</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4 text-center">
                      <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <span className="text-sm font-medium">Questions Texte</span>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4 text-center">
                      <Eye className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <span className="text-sm font-medium">Questions Image</span>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4 text-center">
                      <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <span className="text-sm font-medium">Champs de Formulaire</span>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4 text-center">
                      <FileText className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <span className="text-sm font-medium">Texte</span>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Results */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-700">Résultats:</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4 text-center">
                      <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <span className="text-sm font-medium">Générateur de Résultats</span>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4 text-center">
                      <Share className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <span className="text-sm font-medium">Redirection URL</span>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-8">
                <Button 
                  onClick={addQuestion}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Commencer maintenant
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{quizTitle}</h3>
            </div>
            
            <div className="p-6 h-full overflow-y-auto">
              {/* Start Screen Preview */}
              <Card className="mb-6 border-dashed border-2 border-blue-200 bg-blue-50/30">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Écran de Démarrage</h4>
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <Input
                      value={startScreenTitle}
                      onChange={(e) => setStartScreenTitle(e.target.value)}
                      className="border-none shadow-none p-0 text-lg font-medium bg-transparent focus-visible:ring-0"
                      placeholder="Titre de l'écran de démarrage..."
                    />
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content Elements Preview */}
              <Card className="border-dashed border-2 border-gray-200">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-6">Éléments de Contenu</h4>
                  
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <Card key={question.id} className="bg-white border">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Eye className="w-4 h-4 text-gray-500" />
                                <Input
                                  value={question.question}
                                  onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                                  className="border-none shadow-none p-0 font-medium bg-transparent focus-visible:ring-0"
                                />
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteQuestion(question.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Button
                      onClick={addQuestion}
                      variant="outline"
                      className="w-full border-dashed border-2 border-gray-300 py-6 text-gray-600 hover:text-gray-800 hover:border-gray-400"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Ajouter un élément
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}