
import { useState, useEffect } from "react";
import { Plus, Search, Filter, Play, Edit, Trash2, Users, Clock, BookOpen, MoreVertical, MoreHorizontal, Grid3X3, List, Star, Trophy, Target, Brain, Zap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { gameService, Game } from "@/services";
import { planificationService } from "@/services/planificationService";

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
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlanificationDialogOpen, setIsPlanificationDialogOpen] = useState(false);
  const [selectedGameForPlan, setSelectedGameForPlan] = useState<Game | null>(null);
  const [planificationData, setPlanificationData] = useState({
    date_debut: "",
    date_fin: "",
    heure_debut: "",
    heure_fin: "",
    limite_participant: 100,
    type: "live"
  });
  const { t } = useTranslation();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await gameService.getMyGames();
        setGames(result.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des jeux:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

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

  const filteredQuizzes = games.filter(game => {
    const matchesSearch = game.titre.toLowerCase().includes(searchTerm.toLowerCase());
    // Pour l'instant, pas de filtrage par matière car cette info n'est pas dans l'API
    return matchesSearch;
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

  const handleDeleteGame = async (gameId: string) => {
    try {
      await gameService.deleteGame(gameId);
      // Actualiser la liste des jeux après suppression
      const result = await gameService.getMyGames();
      setGames(result.data);
    } catch (err) {
      console.error('Erreur lors de la suppression du jeu:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  };

  const handlePlanifierGame = (game: Game) => {
    setSelectedGameForPlan(game);
    setIsPlanificationDialogOpen(true);
  };

  const handleCreatePlanification = async () => {
    if (!selectedGameForPlan) return;
    
    try {
      await planificationService.createPlanification({
        statut: "en attente",
        date_debut: planificationData.date_debut,
        date_fin: planificationData.date_fin,
        heure_debut: planificationData.heure_debut,
        heure_fin: planificationData.heure_fin,
        limite_participant: planificationData.limite_participant,
        type: planificationData.type as 'live' | 'attribuer',
        jeu: selectedGameForPlan._id
      });
      
      setIsPlanificationDialogOpen(false);
      setPlanificationData({
        date_debut: "",
        date_fin: "",
        heure_debut: "",
        heure_fin: "",
        limite_participant: 100,
        type: "live"
      });
      setSelectedGameForPlan(null);
    } catch (err) {
      console.error('Erreur lors de la création de la planification:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la planification');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--colors-grey-200)' }}>
      <div className="max-w-7xl mx-auto px-s24 py-s32 space-y-32">
        {/* Header avec filtres avancés */}
        <div className="space-y-s20 animate-fade-in-up animate-delay-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-s16">
            <h2 className="text-h3-bold text-akili-grey-800">{t('mesJeux.title')} ({filteredQuizzes.length})</h2>
            
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-s12">
              {/* Recherche locale */}
              <div className="relative">
                <Search className="absolute left-s12 top-1/2 transform -translate-y-1/2 text-akili-grey-600 w-4 h-4" />
                <Input
                  placeholder={t('mesJeux.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-s36 w-72 border-akili-grey-400 focus:border-akili-purple-500"
                />
              </div>
              
              {/* Filtres */}
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="w-48 border-akili-grey-400">
                  <Filter className="w-4 h-4 mr-2 text-akili-purple-500" />
                  <SelectValue placeholder={t('mesJeux.filterBySubject')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('mesJeux.allSubjects')}</SelectItem>
                  <SelectItem value="Histoire">{t('subjects.histoire')}</SelectItem>
                  <SelectItem value="Mathématiques">{t('subjects.mathematiques')}</SelectItem>
                  <SelectItem value="Sciences">{t('subjects.sciences')}</SelectItem>
                  <SelectItem value="Français">{t('subjects.francais')}</SelectItem>
                  <SelectItem value="Géographie">{t('subjects.geographie')}</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="link" 
                className="text-akili-green-500 p-0 font-akili-bold"
                onClick={() => onNavigate("creer-quiz")}
              >
                <Plus className="w-4 h-4 mr-s8" />
                {t('mesJeux.createNew')}
              </Button>
            </div>
          </div>
        </div>

        {/* État de chargement */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-s24">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="group hover:shadow-akili-md transition-all duration-fast border-0 shadow-akili-sm bg-white">
                <CardContent className="p-0">
                  <Skeleton className="aspect-video w-full rounded-t-lg" />
                  <div className="p-s20 space-y-s12">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex space-x-s8">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <div className="flex space-x-s8">
                      <Skeleton className="h-8 flex-1" />
                      <Skeleton className="h-8 flex-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* État d'erreur */}
        {error && !loading && (
          <div className="text-center py-s48">
            <Brain className="w-16 h-16 text-akili-red-500 mx-auto mb-s16" />
            <h3 className="text-h5-medium text-akili-grey-700 mb-s8">Erreur de chargement</h3>
            <p className="text-body2-medium text-akili-grey-600 mb-s16">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-akili-purple-500 hover:bg-akili-purple-700 text-white"
            >
              Réessayer
            </Button>
          </div>
        )}

        {/* Jeux en mode grille */}
        {!loading && !error && (
          <>
            {filteredQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-s24">
                {filteredQuizzes.map((game, index) => (
                  <Card key={game._id} className={`group hover:shadow-akili-md transition-all duration-fast border-0 shadow-akili-sm bg-white animate-scale-in animate-delay-${(index % 5 + 1) * 100}`}>
                    <CardContent className="p-0">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <img 
                          src={game.image || "https://via.placeholder.com/400x300/f97316/ffffff?text=AKILI+GAME+-+jeux+sans+image"} 
                          alt={game.titre}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300/f97316/ffffff?text=AKILI+GAME+-+jeux+sans+image";
                          }}
                        />
                      </div>
                      
                      <div className="p-s20">
                        <div className="mb-s16">
                          <h3 className="font-akili-bold text-akili-grey-800 mb-s8 text-h5-bold line-clamp-2">
                            {game.titre}
                          </h3>
                          <div className="flex items-center space-x-s16 text-body3-medium text-akili-grey-600 mb-s12">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-s4" />
                              {formatRelativeDate(game.date)}
                            </span>
                            <span>0 {t('mesJeux.questions')}</span>
                          </div>
                          <div className="flex items-center space-x-s8 mb-s16">
                            <Badge variant="secondary" className="bg-akili-grey-300 text-akili-grey-700 text-body4-medium">
                              {game.createdBy?.nom} {game.createdBy?.prenom}
                            </Badge>
                            <Badge variant="secondary" className="bg-akili-blue-300 text-white text-body4-medium">
                              {game.ecole?.libelle}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-s8">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onEditQuiz(game)}
                            className="flex-1 border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200"
                          >
                            {t('mesJeux.modify')}
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handlePlanifierGame(game)}
                            className="flex-1 text-white font-akili-bold"
                            style={{ background: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(234, 88, 12))' }}
                          >
                            {t('mesJeux.plan')}
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="border-red-500 text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
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
                                <AlertDialogAction 
                                  onClick={() => handleDeleteGame(game._id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-s48">
                <Brain className="w-16 h-16 text-akili-grey-500 mx-auto mb-s16" />
                <h3 className="text-h5-medium text-akili-grey-700 mb-s8">{t('mesJeux.noGamesFound')}</h3>
                <p className="text-body2-medium text-akili-grey-600 mb-s16">
                  {searchTerm || filterSubject !== "all" 
                    ? t('mesJeux.tryModifying')
                    : t('mesJeux.createFirst')
                  }
                </p>
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-akili-purple-500 hover:bg-akili-purple-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t('mesJeux.createGame')}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Dialog de Création */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-akili-grey-800">{t('quizCreator.newGame')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-s16">
            <div>
              <Label htmlFor="game-name" className="text-body2-medium text-akili-grey-700">
                {t('quizCreator.gameName')} *
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
                {t('quizCreator.gameImage')}
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
                  alt={t('quizCreator.preview')}
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
                {t('quizCreator.cancel')}
              </Button>
              <Button 
                onClick={handleCreateGame}
                disabled={!newGameName.trim()}
                className="bg-akili-purple-500 hover:bg-akili-purple-700 text-white"
              >
                {t('quizCreator.create')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de Planification */}
      <Dialog open={isPlanificationDialogOpen} onOpenChange={setIsPlanificationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-akili-grey-800">
              Planifier le jeu: {selectedGameForPlan?.titre}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-s16">
            <div className="grid grid-cols-2 gap-s12">
              <div>
                <Label htmlFor="date-debut" className="text-body2-medium text-akili-grey-700">
                  Date début *
                </Label>
                <Input
                  id="date-debut"
                  type="date"
                  value={planificationData.date_debut}
                  onChange={(e) => setPlanificationData(prev => ({...prev, date_debut: e.target.value}))}
                  className="mt-1 border-akili-grey-400 focus:border-akili-purple-500"
                />
              </div>
              <div>
                <Label htmlFor="date-fin" className="text-body2-medium text-akili-grey-700">
                  Date fin *
                </Label>
                <Input
                  id="date-fin"
                  type="date"
                  value={planificationData.date_fin}
                  onChange={(e) => setPlanificationData(prev => ({...prev, date_fin: e.target.value}))}
                  min={planificationData.date_debut}
                  className="mt-1 border-akili-grey-400 focus:border-akili-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-s12">
              <div>
                <Label htmlFor="heure-debut" className="text-body2-medium text-akili-grey-700">
                  Heure début *
                </Label>
                <Input
                  id="heure-debut"
                  type="time"
                  value={planificationData.heure_debut}
                  onChange={(e) => setPlanificationData(prev => ({...prev, heure_debut: e.target.value}))}
                  className="mt-1 border-akili-grey-400 focus:border-akili-purple-500"
                />
              </div>
              <div>
                <Label htmlFor="heure-fin" className="text-body2-medium text-akili-grey-700">
                  Heure fin *
                </Label>
                <Input
                  id="heure-fin"
                  type="time"
                  value={planificationData.heure_fin}
                  onChange={(e) => setPlanificationData(prev => ({...prev, heure_fin: e.target.value}))}
                  className="mt-1 border-akili-grey-400 focus:border-akili-purple-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="limite-participant" className="text-body2-medium text-akili-grey-700">
                Limite participants *
              </Label>
              <Input
                id="limite-participant"
                type="number"
                min="1"
                value={planificationData.limite_participant}
                onChange={(e) => setPlanificationData(prev => ({...prev, limite_participant: Number(e.target.value)}))}
                className="mt-1 border-akili-grey-400 focus:border-akili-purple-500"
              />
            </div>

            <div>
              <Label htmlFor="type" className="text-body2-medium text-akili-grey-700">
                Type de planification *
              </Label>
              <Select value={planificationData.type} onValueChange={(value) => setPlanificationData(prev => ({...prev, type: value}))}>
                <SelectTrigger className="mt-1 border-akili-grey-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="attribuer">Attribuer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsPlanificationDialogOpen(false)}
                className="border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200"
              >
                Annuler
              </Button>
              <Button 
                onClick={handleCreatePlanification}
                disabled={!planificationData.date_debut || !planificationData.date_fin || !planificationData.heure_debut || !planificationData.heure_fin}
                className="bg-akili-purple-500 hover:bg-akili-purple-700 text-white"
              >
                Planifier
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
