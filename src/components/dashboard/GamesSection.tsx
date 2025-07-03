import { Plus, Grid3X3, List, MoreHorizontal, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GamesSectionProps {
  onNavigate: (view: string) => void;
  searchTerm: string;
  filterSubject: string;
}

export function GamesSection({ onNavigate, searchTerm, filterSubject }: GamesSectionProps) {
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
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === "all" || game.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-s20">
      <div className="flex items-center justify-between">
        <h2 className="text-h3-bold text-akili-grey-800">Mes Jeux ({games.length})</h2>
        <div className="flex items-center space-x-s12">
          <Button variant="link" className="text-akili-green-500 p-0 font-akili-bold">
            <Plus className="w-4 h-4 mr-s8" />
            Créer nouveau
          </Button>
          <div className="flex space-x-s8">
            <Button variant="outline" size="sm" className="border-akili-grey-400">
              <Grid3X3 className="w-4 h-4 text-akili-grey-600" />
            </Button>
            <Button variant="outline" size="sm" className="border-akili-grey-400">
              <List className="w-4 h-4 text-akili-grey-600" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-s24">
        {filteredGames.map((game) => (
          <Card key={game.id} className="group hover:shadow-akili-lg transition-all duration-fast border-0 shadow-akili-md bg-white overflow-hidden transform hover:-translate-y-1">
            <div className="relative">
              <img 
                src={game.image} 
                alt={game.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-s12 right-s12 bg-white rounded-full p-s8 shadow-akili-md">
                <Button variant="ghost" size="sm" className="p-1 h-auto">
                  <MoreHorizontal className="w-4 h-4 text-akili-grey-600" />
                </Button>
              </div>
              <div className="absolute bottom-s12 left-s12">
                <Badge className="bg-black/20 text-white font-akili-bold backdrop-blur-sm">
                  {game.questions} Questions
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-s20">
              <div className="space-y-s16">
                <div>
                  <h3 className="font-akili-bold text-akili-grey-800 mb-s8 text-h5-bold leading-tight">
                    {game.title}
                  </h3>
                  <div className="flex items-center justify-between text-body3-medium text-akili-grey-600">
                    <span className="font-akili-medium">Par AKILI</span>
                    <span>Créé {game.lastPlayed}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-s12 border-t border-akili-grey-400">
                  <div className="flex items-center space-x-s12">
                    <Badge variant="secondary" className="bg-akili-grey-300 text-akili-grey-700 text-body4-medium">
                      {game.subject}
                    </Badge>
                    <Badge variant="secondary" className="bg-akili-blue-300 text-white text-body4-medium">
                      {game.difficulty}
                    </Badge>
                  </div>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}