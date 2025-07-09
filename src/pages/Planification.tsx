import { useState, useEffect } from "react";
import { planificationService } from "@/services/planificationService";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { PlanificationHeader } from "@/components/planification/PlanificationHeader";
import { PlanificationFilters } from "@/components/planification/PlanificationFilters";
import { PlanificationList } from "@/components/planification/PlanificationList";
import { LoadingState } from "@/components/planification/LoadingState";
import { EmptyState } from "@/components/planification/EmptyState";

const PlanificationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [planifications, setPlanifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleStartLiveSession = (planification: any) => {
    // Naviguer vers la page session-live en plein écran
    navigate('/session-live', { 
      state: { 
        planificationId: planification._id,
        pin: planification.pin,
        jeu: planification.jeu
      } 
    });
  };

  const handleCreateNew = () => {
    // TODO: Implémenter la création d'une nouvelle planification
    console.log("Créer une nouvelle planification");
  };

  useEffect(() => {
    const fetchPlanifications = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await planificationService.getMyPlanifications();
        setPlanifications(result.data || []);
      } catch (err) {
        console.error('Erreur lors de la récupération des planifications:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        toast({
          title: "Erreur",
          description: "Impossible de charger les planifications",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlanifications();
  }, [toast]);

  const filteredPlanifications = planifications.filter(plan => {
    const matchesSearch = plan.jeu?.titre?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesStatus = filterStatus === "all" || plan.type === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
        
        {/* Header Section */}
        <PlanificationHeader onCreateNew={handleCreateNew} />

        {/* Filtres et Recherche */}
        <PlanificationFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />

        {/* Loading state */}
        {loading && <LoadingState />}

        {/* Liste des Planifications */}
        {!loading && (
          <>
            {filteredPlanifications.length > 0 ? (
              <PlanificationList
                planifications={filteredPlanifications}
                onStartLiveSession={handleStartLiveSession}
              />
            ) : (
              <EmptyState onCreateNew={handleCreateNew} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlanificationPage;