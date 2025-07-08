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
  viewMode?: "list" | "grid";
}

export function GameCard({ game, index, onEdit, onPlan, onArchive, onDelete, viewMode = "grid" }: GameCardProps) {
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

  if (viewMode === "list") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-200 border border-gray-200 bg-white rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="flex">
            {/* Image à gauche */}
            <div className="w-48 h-32 flex-shrink-0 relative overflow-hidden bg-gray-100">
              {game.image ? (
                <img 
                  src={`http://localhost:3000/${game.image.replace('public/', '')}`} 
                  alt={game.titre} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  onError={e => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/192x128/f97316/ffffff?text=Image";
                  }} 
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 text-white flex flex-col justify-center items-center">
                  <div className="text-xs font-semibold opacity-90">AKILI GAME</div>
                </div>
              )}
            </div>
            
            {/* Contenu à droite */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 mr-4">
                  <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2" title={game.titre}>
                    {game.titre}
                  </h3>
                  
                  {/* Statistiques en ligne */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>{formatRelativeDate(game.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>{game.questions?.length || 0} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>{game.planification?.length || 0} planifications</span>
                    </div>
                  </div>
                </div>
                
                {/* Menu actions à droite */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg rounded-lg">
                    <DropdownMenuItem onClick={() => onArchive(game._id)} className="cursor-pointer">
                      <Archive className="w-4 h-4 mr-2 text-yellow-600" />
                      Archiver
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={e => e.preventDefault()} className="cursor-pointer text-red-600">
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
              
              {/* Actions en bas */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onEdit(game)} 
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {t('mesJeux.modify')}
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => onPlan(game)} 
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {t('mesJeux.plan')}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Mode grille (par défaut)
  return (
    <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-200 bg-white rounded-xl overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden bg-gray-100">
          {game.image ? (
            <img 
              src={`http://localhost:3000/${game.image.replace('public/', '')}`} 
              alt={game.titre} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              onError={e => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x225/f97316/ffffff?text=Image";
              }} 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 text-white flex flex-col justify-center items-center">
              <div className="text-2xl font-bold">AKILI GAME</div>
              <div className="text-sm opacity-90 mt-1">Pas d'image</div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="font-bold text-lg text-gray-900 mb-4 line-clamp-2" title={game.titre}>
            {game.titre}
          </h3>
          
          {/* Statistiques alignées verticalement */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">Créé</span>
              </div>
              <span className="font-medium text-gray-900">{formatRelativeDate(game.date)}</span>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-bold">?</span>
                <span className="text-gray-600">Questions</span>
              </div>
              <span className="font-medium text-blue-700">{game.questions?.length || 0}</span>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-green-500 flex items-center justify-center text-white text-xs font-bold">📅</span>
                <span className="text-gray-600">Planifications</span>
              </div>
              <span className="font-medium text-green-700">{game.planification?.length || 0}</span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(game)} 
            className="flex-1"
          >
            <Edit className="w-4 h-4 mr-2" />
            {t('mesJeux.modify')}
          </Button>
          <Button 
            size="sm" 
            onClick={() => onPlan(game)} 
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
          >
            {t('mesJeux.plan')}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg rounded-lg">
              <DropdownMenuItem onClick={() => onArchive(game._id)} className="cursor-pointer">
                <Archive className="w-4 h-4 mr-2 text-yellow-600" />
                Archiver
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={e => e.preventDefault()} className="cursor-pointer text-red-600">
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