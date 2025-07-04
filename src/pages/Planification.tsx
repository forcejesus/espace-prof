import { useState } from "react";
import { Calendar, Clock, Users, Gamepad2, Plus, Search, Filter, ChevronRight, Play, Edit, BarChart3, TrendingUp, CalendarDays, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PlanificationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const planifications = [
    {
      id: 1,
      title: "Histoire de France - Révolution",
      game: "Quiz Révolution Française",
      date: "2024-01-15",
      time: "14:00",
      duration: "45 min",
      participants: 25,
      status: "Programmé",
      group: "Classe 3èmeA",
      difficulty: "Intermédiaire",
      questions: 20
    },
    {
      id: 2,
      title: "Mathématiques - Algèbre",
      game: "Quiz Équations du Second Degré",
      date: "2024-01-16",
      time: "10:30",
      duration: "30 min",
      participants: 18,
      status: "En cours",
      group: "Groupe Math Avancé",
      difficulty: "Difficile",
      questions: 15
    },
    {
      id: 3,
      title: "Sciences - Système Solaire",
      game: "Exploration Spatiale",
      date: "2024-01-14",
      time: "16:00",
      duration: "60 min",
      participants: 22,
      status: "Terminé",
      group: "Classe 5èmeB",
      difficulty: "Facile",
      questions: 25
    },
    {
      id: 4,
      title: "Français - Littérature",
      game: "Les Grands Auteurs",
      date: "2024-01-17",
      time: "09:00",
      duration: "40 min",
      participants: 20,
      status: "Programmé",
      group: "Classe 2ndeC",
      difficulty: "Intermédiaire",
      questions: 18
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Programmé":
        return {
          color: "bg-gradient-to-r from-blue-500 to-blue-600",
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          icon: CalendarDays
        };
      case "En cours":
        return {
          color: "bg-gradient-to-r from-emerald-500 to-green-600",
          bgColor: "bg-emerald-50",
          textColor: "text-emerald-700",
          icon: Play
        };
      case "Terminé":
        return {
          color: "bg-gradient-to-r from-gray-500 to-gray-600",
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          icon: BarChart3
        };
      default:
        return {
          color: "bg-gradient-to-r from-gray-500 to-gray-600",
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          icon: CalendarDays
        };
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Facile":
        return "bg-green-100 text-green-800 border-green-200";
      case "Intermédiaire":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Difficile":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredPlanifications = planifications.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || plan.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Statistiques rapides
  const stats = {
    total: planifications.length,
    scheduled: planifications.filter(p => p.status === "Programmé").length,
    inProgress: planifications.filter(p => p.status === "En cours").length,
    completed: planifications.filter(p => p.status === "Terminé").length,
    totalParticipants: planifications.reduce((sum, p) => sum + p.participants, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* Header Section Amélioré */}
        <div className="relative">
          {/* Background décoratif */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5 rounded-3xl"></div>
          <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full"></div>
          
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Planification des Sessions
                    </h1>
                    <p className="text-lg text-gray-600 mt-1">Organisez et gérez vos sessions de jeu éducatives</p>
                  </div>
                </div>
                
                {/* Statistiques rapides */}
                <div className="flex flex-wrap gap-6 mt-6">
                  <div className="flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-xl">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-700">{stats.total} Sessions au total</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-emerald-50 px-4 py-2 rounded-xl">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-emerald-700">{stats.scheduled} Programmées</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-purple-50 px-4 py-2 rounded-xl">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-purple-700">{stats.totalParticipants} Participants</span>
                  </div>
                </div>
              </div>
              
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Plus className="w-5 h-5 mr-2" />
                Nouvelle Planification
              </Button>
            </div>
          </div>
        </div>

        {/* Filtres et Recherche */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher une session..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-gray-200 bg-white/80 backdrop-blur-sm focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 h-12 border-gray-200 bg-white/80 backdrop-blur-sm rounded-xl">
                <Filter className="w-4 h-4 mr-2 text-blue-500" />
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-gray-200 rounded-xl">
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Programmé">Programmé</SelectItem>
                <SelectItem value="En cours">En cours</SelectItem>
                <SelectItem value="Terminé">Terminé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Liste des Planifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPlanifications.map((plan, index) => {
            const statusConfig = getStatusConfig(plan.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <Card 
                key={plan.id} 
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
                            {plan.status}
                          </Badge>
                        </div>
                        
                        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                          {plan.title}
                        </CardTitle>
                        
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Gamepad2 className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">{plan.game}</span>
                        </div>
                      </div>
                      
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 space-y-6">
                  {/* Informations principales */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="font-bold text-gray-800">{plan.date}</div>
                          <div className="text-sm text-gray-600">à {plan.time}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                      <div className="flex items-center space-x-3">
                        <Timer className="w-5 h-5 text-purple-500" />
                        <div>
                          <div className="font-bold text-gray-800">{plan.duration}</div>
                          <div className="text-sm text-gray-600">{plan.questions} questions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Participants et groupe */}
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-emerald-500" />
                        <div>
                          <div className="font-bold text-gray-800">{plan.participants} participants</div>
                          <div className="text-sm text-gray-600">{plan.group}</div>
                        </div>
                      </div>
                      <Badge className={`${getDifficultyColor(plan.difficulty)} border font-medium`}>
                        {plan.difficulty}
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
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {plan.status === "En cours" ? "Rejoindre" : "Démarrer"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* État vide */}
        {filteredPlanifications.length === 0 && (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Calendar className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune planification trouvée</h3>
            <p className="text-gray-600 mb-6">Créez votre première session de jeu pour commencer</p>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
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