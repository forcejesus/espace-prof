import { useState } from "react";
import { Plus, Grid3X3, List, MoreHorizontal, Play, Search, Filter, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Game {
  _id: string;
  titre: string;
  image: string | null;
  createdBy: {
    _id: string;
    nom: string;
    prenom: string;
    matricule: string;
    genre: string;
    statut: string;
    phone: string;
    email: string;
    adresse: string;
    role: string;
    pays?: {
      _id: string;
      libelle: string;
    };
  } | null;
  ecole: {
    _id: string;
    libelle: string;
    ville: string;
    telephone: string;
  } | null;
  date: string;
}

interface GamesSectionProps {
  onNavigate: (view: string) => void;
  searchTerm: string;
  filterSubject: string;
  games?: Game[];
}

export function GamesSection({ onNavigate, searchTerm, filterSubject, games = [] }: GamesSectionProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [localSearch, setLocalSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  // Fonction utilitaire pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Il y a 1 jour";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.ceil(diffDays / 7)} semaine${Math.ceil(diffDays / 7) > 1 ? 's' : ''}`;
    return `Il y a ${Math.ceil(diffDays / 30)} mois`;
  };

  // Fonction pour obtenir une image par défaut si null
  const getGameImage = (image: string | null, titre: string) => {
    if (image && image.startsWith('public/uploads/')) {
      // Adapter le chemin de l'image selon votre configuration backend
      return `${image.replace('public/', '/')}`;
    }
    // Image par défaut basée sur le titre ou aléatoire
    return `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&q=80`;
  };

  // Données par défaut si aucune donnée n'est fournie
  const defaultGames: Game[] = [
    {
      _id: "1",
      titre: "Jeu de démonstration",
      image: null,
      createdBy: {
        _id: "1",
        nom: "Utilisateur",
        prenom: "Demo",
        matricule: "DEMO-001",
        genre: "Masculin",
        statut: "actif",
        phone: "000000000",
        email: "demo@example.com",
        adresse: "Adresse demo",
        role: "enseignant"
      },
      ecole: {
        _id: "1",
        libelle: "École Demo",
        ville: "Ville Demo",
        telephone: "000000000"
      },
      date: new Date().toISOString()
    }
  ];

  const gamesToDisplay = games.length > 0 ? games : defaultGames;

  const filteredGames = gamesToDisplay.filter(game => {
    const searchFilter = localSearch || searchTerm;
    const matchesSearch = game.titre.toLowerCase().includes(searchFilter.toLowerCase());
    // Pour le filtrage par matière, on peut extraire de l'école ou utiliser une logique différente
    const matchesSubject = filterSubject === "all" || true; // À adapter selon vos besoins
    return matchesSearch && matchesSubject;
  }).sort((a, b) => {
    if (sortBy === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === "alphabetical") return a.titre.localeCompare(b.titre);
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
                <SelectItem value="alphabetical">Alphabétique</SelectItem>
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
          <Card key={game._id} className={`group hover:shadow-akili-md transition-all duration-fast border-0 shadow-akili-sm bg-white animate-slide-in-left animate-delay-${(index % 5 + 1) * 100}`}>
            <CardContent className="p-s20">
              <div className="flex items-center space-x-s20">
                <img 
                  src={getGameImage(game.image, game.titre)} 
                  alt={game.titre}
                  className="w-20 h-20 object-cover rounded-akili-lg flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&q=80';
                  }}
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-akili-bold text-akili-grey-800 mb-s8 text-h5-bold truncate">
                        {game.titre}
                      </h3>
                      <div className="flex items-center space-x-s16 text-body3-medium text-akili-grey-600 mb-s12">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-s4" />
                          Créé {formatDate(game.date)}
                        </span>
                        {game.createdBy && (
                          <span>Par {game.createdBy.prenom} {game.createdBy.nom}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-s8">
                        {game.ecole && (
                          <Badge variant="secondary" className="bg-akili-grey-300 text-akili-grey-700 text-body4-medium">
                            {game.ecole.libelle}
                          </Badge>
                        )}
                        {game.createdBy && (
                          <Badge variant="secondary" className="bg-akili-blue-300 text-white text-body4-medium">
                            {game.createdBy.role}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-s12 flex-shrink-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onNavigate("planification")}
                        className="border-emerald-500 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-600 px-s20 py-s8 rounded-lg font-medium transition-all duration-300"
                      >
                        Planifier le jeu
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => onNavigate("creer-quiz")}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-s20 py-s8 rounded-lg transition-all duration-300"
                      >
                        Modification
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