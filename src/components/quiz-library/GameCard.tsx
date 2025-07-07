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
    <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden bg-gray-100 flex items-center justify-center">
          {game.image ? (
            <img 
              src={`http://localhost:3000/${game.image.replace('public/', '')}`} 
              alt={game.titre} 
              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" 
              onError={e => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300/f97316/ffffff?text=AKILI+GAME+-+erreur+image";
              }} 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex flex-col justify-center items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-pattern opacity-10"></div>
              <h4 className="text-2xl font-bold relative z-10">AKILI GAME</h4>
              <p className="text-sm opacity-90 relative z-10 mt-2">Pas d'image disponible</p>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-s24">
        <div className="mb-s20">
          <h3 className="font-bold text-gray-900 mb-s12 text-lg leading-tight" title={game.titre}>
            {game.titre.length > 50 ? `${game.titre.substring(0, 50)}...` : game.titre}
          </h3>
          <div className="flex flex-col gap-s8 text-sm text-gray-600 mb-s16">
            <div className="flex items-center bg-gray-100 px-s8 py-s4 rounded-lg">
              <Clock className="w-4 h-4 mr-s4 text-orange-500" />
              <span>{formatRelativeDate(game.date)}</span>
            </div>
            <div className="flex items-center bg-blue-100 px-s8 py-s4 rounded-lg text-blue-700">
              <span>📝 {game.questions?.length || 0} questions</span>
            </div>
            <div className="flex items-center bg-green-100 px-s8 py-s4 rounded-lg text-green-700">
              <span>📅 {game.planification?.length || 0} planifications</span>
            </div>
          </div>
        </div>
        
        {/* Footer amélioré */}
        <div className="flex items-center gap-s8 pt-s16 border-t border-gray-100">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(game)} 
            className="flex-1 h-10 border-2 border-gray-300 text-gray-700 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-200 rounded-xl font-medium"
          >
            ✏️ {t('mesJeux.modify')}
          </Button>
          <Button 
            size="sm" 
            onClick={() => onPlan(game)} 
            className="flex-1 h-10 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            🚀 {t('mesJeux.plan')}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 w-10 border-2 border-gray-300 text-gray-700 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-200 rounded-xl">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border-2 border-gray-200 shadow-xl rounded-xl p-2">
              <DropdownMenuItem onClick={() => onArchive(game._id)} className="cursor-pointer hover:bg-yellow-50 rounded-lg p-3 transition-colors duration-200">
                <Archive className="w-4 h-4 mr-2 text-yellow-600" />
                <span className="font-medium">Archiver</span>
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={e => e.preventDefault()} className="cursor-pointer hover:bg-red-50 text-red-600 rounded-lg p-3 transition-colors duration-200">
                    <Trash2 className="w-4 h-4 mr-2" />
                    <span className="font-medium">Supprimer</span>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl border-2">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">Confirmer la suppression</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600">
                      Êtes-vous sûr de vouloir supprimer le jeu "{game.titre}" ? Cette action est irréversible.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(game._id)} className="bg-red-600 hover:bg-red-700 rounded-xl">
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