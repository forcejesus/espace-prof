import { useState, useEffect } from "react";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { StatsCards } from "./dashboard/StatsCards";
import { QuickActions } from "./dashboard/QuickActions";
import { CompletedSessions } from "./dashboard/CompletedSessions";
import { Analytics } from "./dashboard/Analytics";
import { RecentGames } from "./dashboard/RecentGames";
import { useTranslation } from "react-i18next";
import { dashboardService, DashboardData } from "@/services/dashboardService";
import { gameService, Game } from "@/services/gameService";

interface DashboardProps {
  onNavigate: (view: string) => void;
  games?: Game[];
}

export function Dashboard({
  onNavigate,
  games = []
}: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Récupérer les données du dashboard et les jeux en parallèle
        const [dashboardResult, gamesResult] = await Promise.all([
          dashboardService.getDashboard(),
          gameService.getMyGames()
        ]);
        
        setDashboardData(dashboardResult);
        setGamesData(gamesResult.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-s24 space-y-s24">
      <DashboardHeader 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        filterSubject={filterSubject} 
        setFilterSubject={setFilterSubject} 
        onNavigate={onNavigate} 
      />
      
      <StatsCards data={dashboardData} loading={loading} error={error} />
      
      <QuickActions onNavigate={onNavigate} />
      
    </div>
  );
}