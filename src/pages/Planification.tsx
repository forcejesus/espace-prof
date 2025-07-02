
import { useState } from "react";
import { Calendar, Clock, Users, Gamepad2, Plus, Search, Filter } from "lucide-react";
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
      title: "Quiz Histoire - Révolution Française",
      game: "Histoire de France - Révolution",
      date: "2024-01-15",
      time: "14:00",
      duration: "45 min",
      participants: 25,
      status: "Programmé",
      group: "Classe 3èmeA"
    },
    {
      id: 2,
      title: "Session Mathématiques",
      game: "Mathématiques - Géométrie",
      date: "2024-01-16",
      time: "10:30",
      duration: "30 min",
      participants: 18,
      status: "En cours",
      group: "Groupe Math Avancé"
    },
    {
      id: 3,
      title: "Sciences - Système Solaire",
      game: "Sciences - Le Système Solaire",
      date: "2024-01-14",
      time: "16:00",
      duration: "60 min",
      participants: 22,
      status: "Terminé",
      group: "Classe 5èmeB"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Programmé":
        return "bg-blue-100 text-blue-800";
      case "En cours":
        return "bg-green-100 text-green-800";
      case "Terminé":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredPlanifications = planifications.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || plan.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 md:p-8 space-y-8 font-mono">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500 to-violet-600 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Planification des Sessions</h1>
            <p className="text-violet-100">Organisez et gérez vos sessions de jeu</p>
          </div>
        </div>
      </div>

      {/* Actions et Filtres */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400 w-4 h-4" />
            <Input
              placeholder="Rechercher une planification..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-violet-200 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 border-violet-200 focus:border-violet-500">
              <Filter className="w-4 h-4 mr-2 text-violet-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous statuts</SelectItem>
              <SelectItem value="Programmé">Programmé</SelectItem>
              <SelectItem value="En cours">En cours</SelectItem>
              <SelectItem value="Terminé">Terminé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Planification
        </Button>
      </div>

      {/* Liste des Planifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPlanifications.map((plan) => (
          <Card key={plan.id} className="border-2 border-violet-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-bold text-gray-900 mb-2">
                    {plan.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Gamepad2 className="w-4 h-4 text-violet-500" />
                    <span>{plan.game}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(plan.status)}>
                  {plan.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-violet-500" />
                  <span>{plan.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-violet-500" />
                  <span>{plan.time} ({plan.duration})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-violet-500" />
                  <span>{plan.participants} participants</span>
                </div>
                <div className="text-sm font-medium text-gray-700">
                  {plan.group}
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button variant="outline" size="sm" className="border-violet-300 text-violet-700 hover:bg-violet-50">
                  Modifier
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white">
                  Démarrer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlanificationPage;
