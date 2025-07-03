
import { useState } from "react";
import { Plus, Search, Filter, Play, Edit, Trash2, Users, Clock, BookOpen, MoreVertical } from "lucide-react";
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

  // Mock data for demonstration
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Contenu Principal */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Actions et Recherche */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#f97316' }} />
              <Input
                placeholder="Rechercher un quiz..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger className="w-40 border-orange-200 focus:border-orange-500">
                <Filter className="w-4 h-4 mr-2" style={{ color: '#f97316' }} />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes matières</SelectItem>
                <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                <SelectItem value="Histoire">Histoire</SelectItem>
                <SelectItem value="Sciences">Sciences</SelectItem>
                <SelectItem value="Français">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="text-white shadow-lg hover:opacity-90"
            style={{ background: '#f97316' }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Créer un Quiz
          </Button>
        </div>

        {/* Grille des Quiz */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="group hover:shadow-xl transition-all duration-300 border-orange-200 overflow-hidden">
              <div className="relative">
                <img 
                  src={quiz.image} 
                  alt={quiz.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                        <MoreVertical className="w-4 h-4" />
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
                <Badge className="absolute bottom-3 left-3 text-white" style={{ background: '#f97316' }}>
                  {quiz.subject}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                  {quiz.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" style={{ color: '#f97316' }} />
                      {quiz.questions}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" style={{ color: '#f97316' }} />
                      {quiz.estimatedDuration}
                    </span>
                  </div>
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    {quiz.difficulty}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p>{quiz.plays} sessions</p>
                    <p>{quiz.lastPlayed}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEditQuiz(quiz)}
                      className="border-orange-300 text-orange-700 hover:bg-orange-50"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => onNavigate("session-live")}
                      className="text-white hover:opacity-90"
                      style={{ background: '#f97316' }}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-orange-800 mb-2">Aucun quiz trouvé</h3>
            <p className="text-orange-600 mb-4">
              {searchTerm || filterSubject !== "all" 
                ? "Essayez de modifier vos critères de recherche"
                : "Commencez par créer votre premier quiz"
              }
            </p>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="text-white hover:opacity-90"
              style={{ background: '#f97316' }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Créer un Quiz
            </Button>
          </div>
        )}
      </main>

      {/* Dialog de Création Simplifiée */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-orange-900">Créer un Nouveau Quiz</DialogTitle>
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
                className="mt-1 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
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
                className="mt-1 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            {newGameImage && (
              <div className="mt-2">
                <img 
                  src={newGameImage} 
                  alt="Aperçu"
                  className="w-full h-32 object-cover rounded-lg border border-orange-200"
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
                className="border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                Annuler
              </Button>
              <Button 
                onClick={handleCreateGame}
                disabled={!newGameName.trim()}
                className="text-white hover:opacity-90"
                style={{ background: '#f97316' }}
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
