
import { useState } from "react";
import { Plus, Search, Filter, Play, Edit, Trash2, Users, Clock, BookOpen, MoreVertical, MoreHorizontal, Grid3X3, List, Star, Trophy, Target, Brain, Zap } from "lucide-react";
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
    { name: "Histoire", color: "bg-akili-purple-500", count: 8, icon: BookOpen },
    { name: "Mathématiques", color: "bg-akili-blue-500", count: 12, icon: Trophy },
    { name: "Sciences", color: "bg-akili-green-500", count: 6, icon: Star },
    { name: "Français", color: "bg-akili-orange-500", count: 4, icon: BookOpen },
    { name: "Géographie", color: "bg-akili-teal-500", count: 3, icon: Target },
    { name: "Arts", color: "bg-akili-yellow-500", count: 2, icon: Star }
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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--colors-grey-200)' }}>
      {/* Header avec barre de recherche */}
      <div className="bg-white shadow-akili-sm border-b border-akili-grey-400 px-s24 py-s16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-h2-black text-akili-purple-500">Université AKILI</h1>
              <p className="text-body1-medium text-akili-grey-700">Espace Éducateur</p>
            </div>
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-akili-grey-600 w-5 h-5" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-akili-grey-400 focus:border-akili-purple-500 focus:ring-akili-purple-300"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="w-48 border-akili-grey-400">
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
                className="bg-akili-purple-500 hover:bg-akili-purple-700 text-white font-akili-bold px-s24"
              >
                Créer
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-s24 py-s32 space-y-32">
        {/* Dossiers */}
        <div className="space-y-s16">
          <div className="flex items-center justify-between">
            <h2 className="text-h4-bold text-akili-grey-800">Dossiers (6) <Button variant="link" className="text-akili-green-500 p-0 ml-2">Créer nouveau</Button></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-s16">
            {folders.map((folder, index) => (
              <Card key={index} className="bg-white hover:shadow-akili-md transition-all duration-fast cursor-pointer border-0 shadow-akili-sm">
                <CardContent className="p-s16">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-akili-md ${folder.color} flex items-center justify-center`}>
                      <folder.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-akili-medium text-akili-grey-800">{folder.name}</span>
                    <Button variant="ghost" size="sm" className="ml-auto p-1">
                      <MoreHorizontal className="w-4 h-4 text-akili-grey-600" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Jeux */}
        <div className="space-y-s16">
          <div className="flex items-center justify-between">
            <h2 className="text-h4-bold text-akili-grey-800">Jeux (5) <Button variant="link" className="text-akili-green-500 p-0 ml-2">Créer nouveau</Button></h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-akili-grey-400">
                <Grid3X3 className="w-4 h-4 text-akili-grey-600" />
              </Button>
              <Button variant="outline" size="sm" className="border-akili-grey-400">
                <List className="w-4 h-4 text-akili-grey-600" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-s24">
            {filteredQuizzes.map((quiz) => (
              <Card key={quiz.id} className="group hover:shadow-akili-md transition-all duration-fast border-0 shadow-akili-sm bg-white overflow-hidden">
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
                        <DropdownMenuItem className="text-akili-red-500">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white text-body3-medium bg-black/20 px-s8 py-s4 rounded-akili-sm">
                      {quiz.questions} Questions
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-s16">
                  <h3 className="font-akili-bold text-akili-grey-800 mb-s8 line-clamp-2">
                    {quiz.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-body3-medium text-akili-grey-600 mb-s12">
                    <span>Par AKILI</span>
                    <span>Créé {quiz.lastPlayed}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-akili-grey-500 rounded-full"></div>
                      <span className="text-body4-medium text-akili-grey-600">Pas visible</span>
                      <div className="w-2 h-2 bg-akili-grey-500 rounded-full"></div>
                      <span className="text-body4-medium text-akili-grey-600">Marqué</span>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => onNavigate("session-live")}
                      className="bg-akili-green-500 hover:bg-akili-green-700 text-white font-akili-bold px-s16"
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
          <div className="text-center py-s48">
            <Brain className="w-16 h-16 text-akili-grey-500 mx-auto mb-s16" />
            <h3 className="text-h5-medium text-akili-grey-700 mb-s8">Aucun jeu trouvé</h3>
            <p className="text-body2-medium text-akili-grey-600 mb-s16">
              {searchTerm || filterSubject !== "all" 
                ? "Essayez de modifier vos critères de recherche"
                : "Commencez par créer votre premier jeu"
              }
            </p>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-akili-purple-500 hover:bg-akili-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Créer un Jeu
            </Button>
          </div>
        )}
      </div>

      {/* Dialog de Création */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-akili-grey-800">Créer un Nouveau Jeu</DialogTitle>
          </DialogHeader>
          <div className="space-y-s16">
            <div>
              <Label htmlFor="game-name" className="text-body2-medium text-akili-grey-700">
                Nom du Jeu *
              </Label>
              <Input
                id="game-name"
                value={newGameName}
                onChange={(e) => setNewGameName(e.target.value)}
                placeholder="Ex: Jeu de Géographie"
                className="mt-1 border-akili-grey-400 focus:border-akili-purple-500 focus:ring-akili-purple-300"
              />
            </div>
            
            <div>
              <Label htmlFor="game-image" className="text-body2-medium text-akili-grey-700">
                URL de l'Image
              </Label>
              <Input
                id="game-image"
                value={newGameImage}
                onChange={(e) => setNewGameImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="mt-1 border-akili-grey-400 focus:border-akili-purple-500 focus:ring-akili-purple-300"
              />
            </div>

            {newGameImage && (
              <div className="mt-2">
                <img 
                  src={newGameImage} 
                  alt="Aperçu"
                  className="w-full h-32 object-cover rounded-akili-md border border-akili-grey-400"
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
                className="border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200"
              >
                Annuler
              </Button>
              <Button 
                onClick={handleCreateGame}
                disabled={!newGameName.trim()}
                className="bg-akili-purple-500 hover:bg-akili-purple-700 text-white"
              >
                Créer le Jeu
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
