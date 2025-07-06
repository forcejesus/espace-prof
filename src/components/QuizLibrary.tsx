
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
      <div className="max-w-7xl mx-auto px-s24 py-s32 space-y-32">
        {/* Header avec filtres avancés */}
        <div className="space-y-s20 animate-fade-in-up animate-delay-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-s16">
            <h2 className="text-h3-bold text-akili-grey-800">Mes Jeux ({filteredQuizzes.length})</h2>
            
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-s12">
              {/* Recherche locale */}
              <div className="relative">
                <Search className="absolute left-s12 top-1/2 transform -translate-y-1/2 text-akili-grey-600 w-4 h-4" />
                <Input
                  placeholder="Rechercher un jeu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-s36 w-72 border-akili-grey-400 focus:border-akili-purple-500"
                />
              </div>
              
              {/* Filtres */}
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="w-48 border-akili-grey-400">
                  <Filter className="w-4 h-4 mr-2 text-akili-purple-500" />
                  <SelectValue placeholder="Trier par matière" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes matières</SelectItem>
                  <SelectItem value="Histoire">Histoire</SelectItem>
                  <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                  <SelectItem value="Sciences">Sciences</SelectItem>
                  <SelectItem value="Français">Français</SelectItem>
                  <SelectItem value="Géographie">Géographie</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="link" 
                className="text-akili-green-500 p-0 font-akili-bold"
                onClick={() => onNavigate("creer-quiz")}
              >
                <Plus className="w-4 h-4 mr-s8" />
                Créer nouveau
              </Button>
            </div>
          </div>
        </div>

        {/* Jeux en mode grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-s24">
          {filteredQuizzes.map((quiz, index) => (
            <Card key={quiz.id} className={`group hover:shadow-akili-md transition-all duration-fast border-0 shadow-akili-sm bg-white animate-scale-in animate-delay-${(index % 5 + 1) * 100}`}>
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={quiz.image || "https://via.placeholder.com/400x300/f97316/ffffff?text=AKILI+GAME+-+jeux+sans+image"} 
                    alt={quiz.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300/f97316/ffffff?text=AKILI+GAME+-+jeux+sans+image";
                    }}
                  />
                </div>
                
                <div className="p-s20">
                  <div className="mb-s16">
                    <h3 className="font-akili-bold text-akili-grey-800 mb-s8 text-h5-bold line-clamp-2">
                      {quiz.title}
                    </h3>
                    <div className="flex items-center space-x-s16 text-body3-medium text-akili-grey-600 mb-s12">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-s4" />
                        {quiz.lastPlayed}
                      </span>
                      <span>{quiz.questions} questions</span>
                    </div>
                    <div className="flex items-center space-x-s8 mb-s16">
                      <Badge variant="secondary" className="bg-akili-grey-300 text-akili-grey-700 text-body4-medium">
                        {quiz.subject}
                      </Badge>
                      <Badge variant="secondary" className="bg-akili-blue-300 text-white text-body4-medium">
                        {quiz.difficulty}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-s8">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onEditQuiz(quiz)}
                      className="flex-1 border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200"
                    >
                      Modifier
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => onNavigate("planification")}
                      className="flex-1 text-white font-akili-bold"
                      style={{ background: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(234, 88, 12))' }}
                    >
                      Planifier
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
