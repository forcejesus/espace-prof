
import { useState } from "react";
import { Plus, Search, Filter, Play, Edit, Trash2, Users, Clock, BookOpen, MoreVertical, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface QuizLibraryProps {
  onNavigate: (view: string) => void;
  onEditQuiz: (quiz: any) => void;
}

export function QuizLibrary({ onNavigate, onEditQuiz }: QuizLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newGameName, setNewGameName] = useState("");
  const [newGameImage, setNewGameImage] = useState("");

  const quizzes = [
    {
      id: 1,
      title: "Histoire de France - Révolution",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      subject: "Histoire",
      difficulty: "Intermédiaire",
      questions: 15,
      plays: 245,
      lastPlayed: "Il y a 2 jours",
      estimatedDuration: "12 min"
    },
    {
      id: 2,
      title: "Mathématiques - Géométrie",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
      subject: "Mathématiques",
      difficulty: "Facile",
      questions: 10,
      plays: 156,
      lastPlayed: "Il y a 5 jours",
      estimatedDuration: "8 min"
    },
    {
      id: 3,
      title: "Sciences - Le Système Solaire",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
      subject: "Sciences",
      difficulty: "Difficile",
      questions: 20,
      plays: 89,
      lastPlayed: "Il y a 1 semaine",
      estimatedDuration: "15 min"
    }
  ];

  const folders = [
    { name: "Histoire", color: "bg-purple-500", count: 8 },
    { name: "Mathématiques", color: "bg-blue-500", count: 12 },
    { name: "Sciences", color: "bg-indigo-500", count: 6 },
    { name: "Français", color: "bg-purple-600", count: 4 },
    { name: "Géographie", color: "bg-blue-600", count: 3 },
    { name: "Arts", color: "bg-indigo-600", count: 2 }
  ];

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === "all" || quiz.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const handleCreateGame = () => {
    if (newGameName.trim()) {
      console.log("Creating game:", { name: newGameName, image: newGameImage });
      setIsCreateDialogOpen(false);
      setNewGameName("");
      setNewGameImage("");
      onNavigate("creer-quiz");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header avec barre de recherche */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Université AKILI</h1>
              <p className="text-gray-600">Espace Éducateur</p>
            </div>
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-purple-300 focus:ring-purple-300"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="w-48 border-gray-200">
                  <SelectValue placeholder="Trier par: Plus récent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes matières</SelectItem>
                  <SelectItem value="recent">Plus récent</SelectItem>
                  <SelectItem value="popular">Plus populaire</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-6"
              >
                Créer
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Dossiers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Dossiers (6) <Button variant="link" className="text-green-600 p-0 ml-2">Créer nouveau</Button></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {folders.map((folder, index) => (
              <Card key={index} className="bg-white hover:shadow-md transition-all duration-300 cursor-pointer border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg ${folder.color} flex items-center justify-center`}>
                      <div className="w-4 h-4 bg-white rounded-sm opacity-80"></div>
                    </div>
                    <span className="font-medium text-gray-900">{folder.name}</span>
                    <Button variant="ghost" size="sm" className="ml-auto p-1">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Jeux */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Kahoots (5) <Button variant="link" className="text-green-600 p-0 ml-2">Créer nouveau</Button></h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-gray-200">
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-gray-400 rounded-sm"></div>
                  <div className="bg-gray-400 rounded-sm"></div>
                  <div className="bg-gray-400 rounded-sm"></div>
                  <div className="bg-gray-400 rounded-sm"></div>
                </div>
              </Button>
              <Button variant="outline" size="sm" className="border-gray-200">
                <div className="w-4 h-4 flex flex-col gap-0.5">
                  <div className="bg-gray-400 h-0.5 rounded"></div>
                  <div className="bg-gray-400 h-0.5 rounded"></div>
                  <div className="bg-gray-400 h-0.5 rounded"></div>
                  <div className="bg-gray-400 h-0.5 rounded"></div>
                </div>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <Card key={quiz.id} className="group hover:shadow-md transition-all duration-300 border-0 shadow-sm bg-white overflow-hidden">
                <div className="relative">
                  <img 
                    src={quiz.image} 
                    alt={quiz.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white rounded-full p-1">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onEditQuiz(quiz)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onNavigate("session-live")}>
                          <Play className="w-4 h-4 mr-2" />
                          Lancer
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white text-sm font-medium bg-black/20 px-2 py-1 rounded">
                      {quiz.questions} Questions
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {quiz.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>Par AKILI</span>
                    <span>Créé {quiz.lastPlayed}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Pas visible</span>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Marqué</span>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => onNavigate("session-live")}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-4"
                    >
                      Jouer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Aucun quiz trouvé</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterSubject !== "all" 
                ? "Essayez de modifier vos critères de recherche"
                : "Commencez par créer votre premier quiz"
              }
            </p>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Créer un Quiz
            </Button>
          </div>
        )}
      </div>

      {/* Dialog de Création */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Créer un Nouveau Quiz</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="game-name" className="text-sm font-medium text-gray-700">
                Nom du Jeu *
              </Label>
              <Input
                id="game-name"
                value={newGameName}
                onChange={(e) => setNewGameName(e.target.value)}
                placeholder="Ex: Quiz de Géographie"
                className="mt-1 border-gray-200 focus:border-purple-300 focus:ring-purple-300"
              />
            </div>
            
            <div>
              <Label htmlFor="game-image" className="text-sm font-medium text-gray-700">
                URL de l'Image
              </Label>
              <Input
                id="game-image"
                value={newGameImage}
                onChange={(e) => setNewGameImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="mt-1 border-gray-200 focus:border-purple-300 focus:ring-purple-300"
              />
            </div>

            {newGameImage && (
              <div className="mt-2">
                <img 
                  src={newGameImage} 
                  alt="Aperçu"
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsCreateDialogOpen(false)}
                className="border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Annuler
              </Button>
              <Button 
                onClick={handleCreateGame}
                disabled={!newGameName.trim()}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                Créer le Quiz
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
