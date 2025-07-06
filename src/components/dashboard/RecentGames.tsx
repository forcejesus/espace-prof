import { Calendar, MoreHorizontal, Play, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface Game {
  _id: string;
  titre: string;
  image: string | null;
  createdBy: {
    _id: string;
    nom: string;
    prenom: string;
    role: string;
  } | null;
  ecole: {
    _id: string;
    libelle: string;
    ville: string;
  } | null;
  date: string;
}

interface RecentGamesProps {
  games: Game[];
  onNavigate: (view: string) => void;
}

export function RecentGames({ games, onNavigate }: RecentGamesProps) {
  const { t } = useTranslation();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getGameImage = (image: string | null) => {
    if (image && image.startsWith('public/uploads/')) {
      return `/${image.replace('public/', '')}`;
    }
    return 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&q=80';
  };

  const recentGames = games.slice(0, 5);

  return (
    <Card className="bg-white border border-akili-grey-300 shadow-akili-sm rounded-xl">
      <CardHeader className="pb-s16">
        <div className="flex items-center justify-between">
          <CardTitle className="text-h4-bold text-akili-grey-800">
            {t('dashboard.recentGames.title')}
          </CardTitle>
          <div className="flex items-center space-x-s8">
            <Button variant="ghost" size="sm" className="text-akili-grey-600 hover:text-akili-orange-500">
              Voir tout
            </Button>
            <Button variant="ghost" size="sm" className="text-akili-grey-600 hover:text-akili-orange-500 p-2">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-s12">
          {recentGames.map((game, index) => (
            <div 
              key={game._id} 
              className="flex items-center space-x-s12 p-s12 rounded-lg hover:bg-akili-grey-200 transition-colors duration-200 cursor-pointer group"
              onClick={() => onNavigate("creer-quiz")}
            >
              <img 
                src={getGameImage(game.image)} 
                alt={game.titre}
                className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&q=80';
                }}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-body2-bold text-akili-grey-800 truncate group-hover:text-akili-orange-600 transition-colors">
                      {game.titre}
                    </h4>
                    <div className="flex items-center space-x-s8 mt-s4">
                      <span className="text-body4-medium text-akili-grey-600">
                        {game.createdBy ? `${game.createdBy.prenom} ${game.createdBy.nom}` : 'Créateur inconnu'}
                      </span>
                      <span className="text-akili-grey-400">•</span>
                      <span className="text-body4-medium text-akili-grey-600 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(game.date)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-s8 ml-s12">
                    {game.ecole && (
                      <Badge variant="secondary" className="bg-akili-orange-100 text-akili-orange-700 text-xs">
                        {game.ecole.libelle}
                      </Badge>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-akili-grey-600 hover:text-akili-orange-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {recentGames.length === 0 && (
          <div className="text-center py-s32">
            <div className="w-16 h-16 bg-akili-grey-200 rounded-full flex items-center justify-center mx-auto mb-s16">
              <Play className="w-8 h-8 text-akili-grey-500" />
            </div>
            <p className="text-body2-medium text-akili-grey-600 mb-s8">Aucun jeu récent</p>
            <p className="text-body4-medium text-akili-grey-500">Créez votre premier jeu pour commencer</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}