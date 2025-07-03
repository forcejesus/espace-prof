
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
      title: "Jeu Histoire - Révolution Française",
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
        return "bg-akili-blue-500 text-white";
      case "En cours":
        return "bg-akili-green-500 text-white";
      case "Terminé":
        return "bg-akili-grey-500 text-white";
      default:
        return "bg-akili-grey-500 text-white";
    }
  };

  const filteredPlanifications = planifications.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || plan.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
      <div className="max-w-7xl mx-auto px-s24 py-s32 space-y-32">
        {/* Header avec actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-s16">
          <div>
            <h1 className="text-h2-black text-akili-purple-500 mb-s8">Planification des Sessions</h1>
            <p className="text-body1-medium text-akili-grey-700">Organisez et gérez vos sessions de jeu</p>
          </div>
          
          <div className="flex items-center space-x-s16">
            <div className="relative">
              <Search className="absolute left-s12 top-1/2 transform -translate-y-1/2 text-akili-grey-600 w-5 h-5" />
              <Input
                placeholder="Rechercher une planification..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-s40 border-akili-grey-400 focus:border-akili-purple-500 focus:ring-akili-purple-300 w-96"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48 border-akili-grey-400">
                <Filter className="w-4 h-4 mr-2 text-akili-purple-500" />
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous statuts</SelectItem>
                <SelectItem value="Programmé">Programmé</SelectItem>
                <SelectItem value="En cours">En cours</SelectItem>
                <SelectItem value="Terminé">Terminé</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-akili-purple-500 hover:bg-akili-purple-700 text-white font-akili-bold px-s24">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Planification
            </Button>
          </div>
        </div>

        {/* Liste des Planifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-s24">
          {filteredPlanifications.map((plan) => (
            <Card key={plan.id} className="bg-white shadow-akili-sm border-0 hover:shadow-akili-md transition-all duration-fast">
              <CardHeader className="pb-s16">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-h5-bold text-akili-grey-800 mb-s8">
                      {plan.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 text-body3-medium text-akili-grey-600">
                      <Gamepad2 className="w-4 h-4 text-akili-purple-500" />
                      <span>{plan.game}</span>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(plan.status)} font-akili-bold`}>
                    {plan.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-s16">
                <div className="grid grid-cols-2 gap-s16 text-body3-medium">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-akili-purple-500" />
                    <span className="text-akili-grey-700">{plan.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-akili-blue-500" />
                    <span className="text-akili-grey-700">{plan.time} ({plan.duration})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-akili-green-500" />
                    <span className="text-akili-grey-700">{plan.participants} participants</span>
                  </div>
                  <div className="text-body3-bold text-akili-grey-800">
                    {plan.group}
                  </div>
                </div>

                <div className="flex space-x-s12 pt-s16">
                  <Button variant="outline" size="sm" className="border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200">
                    Modifier
                  </Button>
                  <Button size="sm" className="bg-akili-green-500 hover:bg-akili-green-700 text-white font-akili-bold">
                    Démarrer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanificationPage;
