import { useState, useEffect } from "react";
import { Plus, Search, Filter, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { gameService, Game } from "@/services";
import { GameCard } from "./quiz-library/GameCard";
import { GameCreationDialog } from "./quiz-library/GameCreationDialog";
import { PlanificationDialog } from "./quiz-library/PlanificationDialog";
interface QuizLibraryProps {
  onNavigate: (view: string) => void;
  onEditQuiz: (quiz: any) => void;
}
export function QuizLibrary({
  onNavigate,
  onEditQuiz
}: QuizLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlanificationDialogOpen, setIsPlanificationDialogOpen] = useState(false);
  const [selectedGameForPlan, setSelectedGameForPlan] = useState<Game | null>(null);
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
  const filteredQuizzes = games.filter(game => {
    const matchesSearch = game.titre.toLowerCase().includes(searchTerm.toLowerCase());
    // Pour l'instant, pas de filtrage par matière car cette info n'est pas dans l'API
    return matchesSearch;
  });
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

  const handleArchiveGame = async (gameId: string) => {
    try {
      await gameService.archiveGame(gameId);
      // Actualiser la liste des jeux après archivage
      const result = await gameService.getMyGames();
      setGames(result.data);
    } catch (err) {
      console.error('Erreur lors de l\'archivage du jeu:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'archivage');
    }
  };

  const handlePlanifierGame = (game: Game) => {
    setSelectedGameForPlan(game);
    setIsPlanificationDialogOpen(true);
  };
  return <div className="min-h-screen" style={{
    backgroundColor: 'var(--colors-grey-200)'
  }}>
      <div className="max-w-7xl mx-auto px-s24 py-s32 space-y-32">
        {/* Header avec filtres avancés - Fixe */}
        <div className="sticky top-0 z-10 bg-white shadow-lg border-b border-gray-200 pb-s20 mb-s32 space-y-s20">
          <div className="px-s24 pt-s20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-s16">
              <div className="flex items-center gap-s12">
                <h2 className="text-h3-bold text-akili-grey-800">{t('mesJeux.title')}</h2>
                <div className="bg-orange-100 text-orange-800 px-s12 py-s4 rounded-full text-sm font-semibold">
                  {filteredQuizzes.length} jeux
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-s12">
                {/* Recherche améliorée */}
                <div className="relative">
                  <Search className="absolute left-s12 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                  <Input 
                    placeholder={t('mesJeux.search')} 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    className="pl-s40 w-80 h-11 border-2 border-orange-200 focus:border-orange-500 focus:ring-orange-300 rounded-xl bg-white shadow-sm" 
                  />
                </div>
                
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)} 
                  className="h-11 px-s20 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="w-5 h-5 mr-s8" />
                  {t('mesJeux.createNew')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* État de chargement */}
        {loading && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-s24">
            {[...Array(6)].map((_, index) => <Card key={index} className="group hover:shadow-akili-md transition-all duration-fast border-0 shadow-akili-sm bg-white">
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
              </Card>)}
          </div>}

        {/* État d'erreur */}
        {error && !loading && <div className="text-center py-s48">
            <Brain className="w-16 h-16 text-akili-red-500 mx-auto mb-s16" />
            <h3 className="text-h5-medium text-akili-grey-700 mb-s8">Erreur de chargement</h3>
            <p className="text-body2-medium text-akili-grey-600 mb-s16">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-akili-purple-500 hover:bg-akili-purple-700 text-white">
              Réessayer
            </Button>
          </div>}

        {/* Jeux en mode grille */}
        {!loading && !error && <>
            {filteredQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-s24">
                {filteredQuizzes.map((game, index) => (
                  <GameCard
                    key={game._id}
                    game={game}
                    index={index}
                    onEdit={onEditQuiz}
                    onPlan={handlePlanifierGame}
                    onArchive={handleArchiveGame}
                    onDelete={handleDeleteGame}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-s48">
                <Brain className="w-16 h-16 text-akili-grey-500 mx-auto mb-s16" />
                <h3 className="text-h5-medium text-akili-grey-700 mb-s8">{t('mesJeux.noGamesFound')}</h3>
                <p className="text-body2-medium text-akili-grey-600 mb-s16">
                  {searchTerm || filterSubject !== "all" ? t('mesJeux.tryModifying') : t('mesJeux.createFirst')}
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-akili-purple-500 hover:bg-akili-purple-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('mesJeux.createGame')}
                </Button>
              </div>
            )}
        </>}
      </div>

      {/* Dialogs */}
      <GameCreationDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onNavigate={onNavigate}
      />

      <PlanificationDialog
        open={isPlanificationDialogOpen}
        onOpenChange={setIsPlanificationDialogOpen}
        selectedGame={selectedGameForPlan}
        onError={setError}
      />
    </div>;
}