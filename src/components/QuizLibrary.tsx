import { useState, useEffect } from "react";
import { Plus, Search, Filter, Brain, Grid3X3, List, LayoutGrid } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
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
  return <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
        {/* Header moderne et pleine largeur */}
        <div className="w-full bg-gradient-to-br from-white via-orange-50/30 to-white border border-gray-200/60 rounded-2xl shadow-lg backdrop-blur-sm">
          <div className="p-6 md:p-8">
            {/* Titre et compteur */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent">
                  {t('mesJeux.title')}
                </h1>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                  {filteredQuizzes.length} jeux
                </div>
              </div>
              
              <Button 
                onClick={() => setIsCreateDialogOpen(true)} 
                className="h-12 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                {t('mesJeux.createNew')}
              </Button>
            </div>
            
            {/* Barre de recherche et contrôles */}
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Recherche */}
              <div className="relative flex-1 w-full lg:max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                <Input 
                  placeholder="Rechercher un jeu..." 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)} 
                  className="pl-12 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-200" 
                />
              </div>
              
              {/* Sélecteur de vue */}
              <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`h-10 px-4 rounded-lg transition-all duration-200 ${
                    viewMode === "list" 
                      ? "bg-white shadow-md text-orange-600 font-semibold" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <List className="w-4 h-4 mr-2" />
                  Liste
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`h-10 px-4 rounded-lg transition-all duration-200 ${
                    viewMode === "grid" 
                      ? "bg-white shadow-md text-orange-600 font-semibold" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  Grille
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-6">
          {/* État de chargement */}
          {loading && <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
              {[...Array(6)].map((_, index) => <Card key={index} className="group hover:shadow-lg transition-all duration-200 border border-gray-200 bg-white rounded-xl">
                  <CardContent className="p-0">
                    <Skeleton className="aspect-video w-full rounded-t-xl" />
                    <div className="p-6 space-y-4">
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex space-x-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <div className="flex space-x-2">
                        <Skeleton className="h-8 flex-1" />
                        <Skeleton className="h-8 flex-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>}

          {/* État d'erreur */}
          {error && !loading && <div className="text-center py-16">
              <Brain className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Erreur de chargement</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} className="bg-orange-500 hover:bg-orange-600 text-white">
                Réessayer
              </Button>
            </div>}

          {/* Liste des jeux */}
          {!loading && !error && <>
              {filteredQuizzes.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                  {filteredQuizzes.map((game, index) => (
                    <GameCard
                      key={game._id}
                      game={game}
                      index={index}
                      onEdit={onEditQuiz}
                      onPlan={handlePlanifierGame}
                      onArchive={handleArchiveGame}
                      onDelete={handleDeleteGame}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('mesJeux.noGamesFound')}</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm ? t('mesJeux.tryModifying') : t('mesJeux.createFirst')}
                  </p>
                  <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('mesJeux.createGame')}
                  </Button>
                </div>
              )}
          </>}
        </div>
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