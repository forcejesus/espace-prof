import { useState, useEffect } from "react";
import { Calendar, Clock, Users, Gamepad2, Plus, Search, Filter, ChevronRight, Play, Edit, BarChart3, TrendingUp, CalendarDays, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { planificationService, Planification } from "@/services/planificationService";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "en-attente":
        return {
          color: "bg-gradient-to-r from-blue-500 to-blue-600",
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          icon: CalendarDays,
          label: "En attente"
        };
      case "en-cours":
        return {
          color: "bg-gradient-to-r from-emerald-500 to-green-600",
          bgColor: "bg-emerald-50",
          textColor: "text-emerald-700",
          icon: Play,
          label: "En cours"
        };
      case "terminé":
        return {
          color: "bg-gradient-to-r from-gray-500 to-gray-600",
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          icon: BarChart3,
          label: "Terminé"
        };
      default:
        return {
          color: "bg-gradient-to-r from-gray-500 to-gray-600",
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          icon: CalendarDays,
          label: status
        };
    }
  };

  const filteredPlanifications = planifications.filter(plan => {
    const matchesSearch = plan.jeu?.titre?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesStatus = filterStatus === "all" || plan.type === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
        
        {/* Header Section avec couleurs orange */}
        <div className="w-full bg-gradient-to-br from-white via-orange-50/30 to-white border border-gray-200/60 rounded-2xl shadow-lg backdrop-blur-sm">
          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent">
                      Planifications des jeux
                    </h1>
                    <p className="text-lg text-gray-600 mt-1">Organisez et gérez vos planifications de jeux éducatifs</p>
                  </div>
                </div>
              </div>
              
              <Button className="h-12 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Plus className="w-5 h-5 mr-2" />
                Nouvelle Planification
              </Button>
            </div>
          </div>
        </div>

        {/* Filtres et Recherche */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtrer les planifications</h3>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5 z-10" />
              <Input
                placeholder="Rechercher par nom du jeu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-200"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 h-12 border-2 border-gray-200 bg-white/80 backdrop-blur-sm rounded-xl">
                <Filter className="w-4 h-4 mr-2 text-orange-500" />
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-gray-200 rounded-xl">
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="Live">Live</SelectItem>
                <SelectItem value="Examen">Examen</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Timer className="w-12 h-12 text-white animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Chargement...</h3>
            <p className="text-gray-600">Récupération des planifications</p>
          </div>
        )}

        {/* Liste des Planifications */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPlanifications.map((plan, index) => {
              const statusConfig = getStatusConfig(plan.statut);
              const StatusIcon = statusConfig.icon;
              
              return (
                <Card 
                  key={plan._id} 
                  className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 rounded-2xl overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Header avec gradient */}
                  <CardHeader className={`${statusConfig.bgColor} border-b border-gray-100 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/20 to-transparent rounded-full"></div>
                    <div className="relative">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 ${statusConfig.color} rounded-xl flex items-center justify-center shadow-lg`}>
                              <StatusIcon className="w-5 h-5 text-white" />
                            </div>
                            <Badge className={`${statusConfig.color} text-white font-medium px-3 py-1 rounded-lg shadow-sm`}>
                              {statusConfig.label}
                            </Badge>
                          </div>
                          
                          <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                            {plan.type} - PIN: {plan.pin}
                          </CardTitle>
                          
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Gamepad2 className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">{plan.jeu?.titre || 'Jeu sans titre'}</span>
                          </div>
                        </div>
                        
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-6">
                    {/* Informations principales */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-orange-500" />
                          <div>
                            <div className="font-bold text-gray-800">{plan.date_debut}</div>
                            <div className="text-sm text-gray-600">à {plan.heure_debut}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <div className="flex items-center space-x-3">
                          <Timer className="w-5 h-5 text-orange-500" />
                          <div>
                            <div className="font-bold text-gray-800">{plan.heure_debut} - {plan.heure_fin}</div>
                            <div className="text-sm text-gray-600">{plan.jeu?.questions?.length || 0} questions</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Participants */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="font-bold text-gray-800">
                              {plan.nombreParticipants || 0} / {plan.limite_participant} participants
                            </div>
                            <div className="text-sm text-gray-600">
                              {plan.placesRestantes || plan.limite_participant} places restantes
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800 border border-orange-200 font-medium">
                          {plan.type}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex space-x-3 pt-2 border-t border-gray-100">
                      <Button 
                        variant="outline" 
                        className="flex-1 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 rounded-xl"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </Button>
                      {plan.type === "Live" && (
                        <Button 
                          onClick={() => handleStartLiveSession(plan)}
                          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {plan.statut === "en-cours" ? "Rejoindre" : "Démarrer"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* État vide */}
        {!loading && filteredPlanifications.length === 0 && (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Calendar className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune planification trouvée</h3>
            <p className="text-gray-600 mb-6">Créez votre première session de jeu pour commencer</p>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <Plus className="w-5 h-5 mr-2" />
              Créer une planification
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanificationPage;