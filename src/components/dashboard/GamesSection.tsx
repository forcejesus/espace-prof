import { useState } from "react";
import { Plus, Grid3X3, List, MoreHorizontal, Play, Search, Filter, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GamesSectionProps {
  onNavigate: (view: string) => void;
  searchTerm: string;
  filterSubject: string;
}

export function GamesSection({ onNavigate, searchTerm, filterSubject }: GamesSectionProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [localSearch, setLocalSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const games = [
    {
      id: 1,
      title: "Histoire de France - Révolution",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      subject: "Histoire",
      difficulty: "Intermédiaire",
      questions: 15,
      plays: 245,
      lastPlayed: "Il y a 2 jours"
    },
    {
      id: 2,
      title: "Mathématiques - Géométrie",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
      subject: "Mathématiques",
      difficulty: "Facile",
      questions: 10,
      plays: 156,
      lastPlayed: "Il y a 5 jours"
    },
    {
      id: 3,
      title: "Sciences - Le Système Solaire",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
      subject: "Sciences",
      difficulty: "Difficile",
      questions: 20,
      plays: 89,
      lastPlayed: "Il y a 1 semaine"
    },
    {
      id: 4,
      title: "Français - Grammaire",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      subject: "Français",
      difficulty: "Facile",
      questions: 12,
      plays: 178,
      lastPlayed: "Il y a 3 jours"
    },
    {
      id: 5,
      title: "Géographie - Capitales du Monde",
      image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop",
      subject: "Géographie",
      difficulty: "Intermédiaire",
      questions: 25,
      plays: 134,
      lastPlayed: "Il y a 1 jour"
    }
  ];

  const filteredGames = games.filter(game => {
    const searchFilter = localSearch || searchTerm;
    const matchesSearch = game.title.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesSubject = filterSubject === "all" || game.subject === filterSubject;
    return matchesSearch && matchesSubject;
  }).sort((a, b) => {
    if (sortBy === "recent") return b.id - a.id;
    if (sortBy === "popular") return b.plays - a.plays;
    if (sortBy === "questions") return b.questions - a.questions;
    return 0;
  });

  return (
    <div className="space-y-s20 animate-fade-in-up animate-delay-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-s16">
        <h2 className="text-h3-bold text-akili-grey-800">Mes Jeux ({filteredGames.length})</h2>
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-s12">
          {/* Recherche locale */}
          <div className="relative">
            <Search className="absolute left-s12 top-1/2 transform -translate-y-1/2 text-akili-grey-600 w-4 h-4" />
            <Input
              placeholder="Rechercher un jeu..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-s36 w-72 border-akili-grey-400 focus:border-akili-purple-500"
            />
          </div>
          
          {/* Filtres */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 border-akili-grey-400">
              <Filter className="w-4 h-4 mr-2 text-akili-purple-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Plus récent</SelectItem>
              <SelectItem value="popular">Plus populaire</SelectItem>
              <SelectItem value="questions">Plus de questions</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-s8">
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

      <div className="space-y-s16">
        {filteredGames.map((game, index) => (
          <Card key={game.id} className={`group hover:shadow-akili-md transition-all duration-fast border-0 shadow-akili-sm bg-white animate-slide-in-left animate-delay-${(index % 5 + 1) * 100}`}>
            <CardContent className="p-s20">
              <div className="flex items-center space-x-s20">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-20 h-20 object-cover rounded-akili-lg flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-akili-bold text-akili-grey-800 mb-s8 text-h5-bold truncate">
                        {game.title}
                      </h3>
                      <div className="flex items-center space-x-s16 text-body3-medium text-akili-grey-600 mb-s12">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-s4" />
                          Créé {game.lastPlayed}
                        </span>
                        <span>{game.questions} questions</span>
                        <span>{game.plays} lectures</span>
                      </div>
                      <div className="flex items-center space-x-s8">
                        <Badge variant="secondary" className="bg-akili-grey-300 text-akili-grey-700 text-body4-medium">
                          {game.subject}
                        </Badge>
                        <Badge variant="secondary" className="bg-akili-blue-300 text-white text-body4-medium">
                          {game.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-s8 flex-shrink-0">
                      <Button variant="ghost" size="sm" className="p-2">
                        <MoreHorizontal className="w-4 h-4 text-akili-grey-600" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => onNavigate("session-live")}
                        className="text-white font-akili-bold px-s20"
                        style={{ background: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(234, 88, 12))' }}
                      >
                        <Play className="w-4 h-4 mr-s8" />
                        Jouer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}