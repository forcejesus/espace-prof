import { Clock, Edit, MoreVertical, Archive, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Game } from "@/services";

interface GameCardProps {
  game: Game;
  index: number;
  onEdit: (game: Game) => void;
  onPlan: (game: Game) => void;
  onArchive: (gameId: string) => void;
  onDelete: (gameId: string) => void;
}

export function GameCard({ game, index, onEdit, onPlan, onArchive, onDelete }: GameCardProps) {
  const { t } = useTranslation();

  // Fonction pour formater la date
  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return "Aujourd'hui";
    if (diffInDays === 1) return "Il y a 1 jour";
    if (diffInDays < 7) return `Il y a ${diffInDays} jours`;
    if (diffInDays < 30) return `Il y a ${Math.floor(diffInDays / 7)} semaine(s)`;
    return `Il y a ${Math.floor(diffInDays / 30)} mois`;
  };

  return (
    <Card key={game._id} className={`group hover:shadow-akili-md transition-all duration-fast border-0 shadow-akili-sm bg-white animate-scale-in animate-delay-${(index % 5 + 1) * 100}`}>
      {game.image ? (
        <CardContent className="p-0">
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <img 
              src={`http://localhost:3000/${game.image.replace('public/', '')}`} 
              alt={game.titre} 
              className="w-full h-full object-cover" 
              onError={e => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300/f97316/ffffff?text=AKILI+GAME+-+erreur+image";
              }} 
            />
          </div>
        </CardContent>
      ) : (
        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center aspect-video flex flex-col justify-center">
          <h4 className="text-lg font-bold">AKILI GAME</h4>
          <p className="text-sm opacity-90">Pas d'image de jeu disponible</p>
        </CardHeader>
      )}
      
      <CardContent className="p-s20 my-[15px]">
        <div className="mb-s16">
          <h3 className="font-akili-bold text-akili-grey-800 mb-s8 text-h5-bold" title={game.titre}>
            {game.titre.length > 50 ? `${game.titre.substring(0, 50)}...` : game.titre}
          </h3>
          <div className="flex items-center space-x-s16 text-body3-medium text-akili-grey-600 mb-s12">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-s4" />
              {formatRelativeDate(game.date)}
            </span>
            <span>{game.questions?.length || 0} {t('mesJeux.questions')}</span>
            <span>{game.planification?.length || 0} planifications</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-s8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(game)} 
            className="flex-1 border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200"
          >
            {t('mesJeux.modify')}
          </Button>
          <Button 
            size="sm" 
            onClick={() => onPlan(game)} 
            className="flex-1 text-white font-akili-bold" 
            style={{
              background: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(234, 88, 12))'
            }}
          >
            {t('mesJeux.plan')}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-akili-grey-400 shadow-akili-md">
              <DropdownMenuItem onClick={() => onArchive(game._id)} className="cursor-pointer hover:bg-akili-grey-200">
                <Archive className="w-4 h-4 mr-2 text-yellow-600" />
                Archiver
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={e => e.preventDefault()} className="cursor-pointer hover:bg-akili-grey-200 text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                    <AlertDialogDescription>
                      Êtes-vous sûr de vouloir supprimer le jeu "{game.titre}" ? Cette action est irréversible.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(game._id)} className="bg-red-600 hover:bg-red-700">
                      Supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}