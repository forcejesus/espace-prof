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
        {/* Header avec filtres avancés */}
        <div className="space-y-s20 animate-fade-in-up animate-delay-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-s16">
            <h2 className="text-h3-bold text-akili-grey-800">{t('mesJeux.title')} ({filteredQuizzes.length})</h2>
            
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-s12">
              {/* Recherche locale */}
              <div className="relative">
                <Search className="absolute left-s12 top-1/2 transform -translate-y-1/2 text-akili-grey-600 w-4 h-4" />
                <Input placeholder={t('mesJeux.search')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-s36 w-72 border-akili-grey-400 focus:border-akili-purple-500" />
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
              
              <Button variant="link" className="text-akili-green-500 p-0 font-akili-bold" onClick={() => onNavigate("creer-quiz")}>
                <Plus className="w-4 h-4 mr-s8" />
                {t('mesJeux.createNew')}
              </Button>
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