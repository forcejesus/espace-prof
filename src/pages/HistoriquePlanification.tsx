
import { useState } from "react";
import { History, Calendar, Users, Clock, TrendingUp, Filter, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const HistoriquePlanificationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("all");

  const historique = [
    {
      id: 1,
      title: "Quiz Histoire - Révolution",
      date: "2024-01-10",
      participants: 25,
      reussite: "92%",
      duree: "35 min",
      score: 4.8,
      status: "Terminé"
    },
    {
      id: 2,
      title: "Mathématiques - Géométrie",
      date: "2024-01-08",
      participants: 18,
      reussite: "87%",
      duree: "28 min",
      score: 4.5,
      status: "Terminé"
    },
    {
      id: 3,
      title: "Sciences - Système Solaire",
      date: "2024-01-05",
      participants: 22,
      reussite: "89%",
      duree: "42 min",
      score: 4.7,
      status: "Terminé"
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <History className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Historique des Planifications</h1>
            <p className="text-orange-100">Consultez les résultats de vos sessions passées</p>
          </div>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2 border-orange-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">47</div>
            <div className="text-sm text-gray-600">Sessions totales</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-orange-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">1,248</div>
            <div className="text-sm text-gray-600">Participations</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-orange-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">89%</div>
            <div className="text-sm text-gray-600">Taux de réussite</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-orange-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">32 min</div>
            <div className="text-sm text-gray-600">Durée moyenne</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
          <Input
            placeholder="Rechercher dans l'historique..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <Select value={filterPeriod} onValueChange={setFilterPeriod}>
          <SelectTrigger className="w-40 border-orange-200 focus:border-orange-500">
            <Filter className="w-4 h-4 mr-2 text-orange-500" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes périodes</SelectItem>
            <SelectItem value="week">Cette semaine</SelectItem>
            <SelectItem value="month">Ce mois</SelectItem>
            <SelectItem value="quarter">Ce trimestre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Liste de l'historique */}
      <div className="space-y-4">
        {historique.map((session) => (
          <Card key={session.id} className="border-2 border-orange-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{session.title}</h3>
                  <p className="text-sm text-gray-600">Session du {session.date}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{session.participants}</div>
                    <div className="text-xs text-gray-600">Participants</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{session.reussite}</div>
                    <div className="text-xs text-gray-600">Réussite</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">{session.duree}</div>
                    <div className="text-xs text-gray-600">Durée</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-600">{session.score}/5</div>
                    <div className="text-xs text-gray-600">Score</div>
                  </div>
                </div>
                
                <Badge className="bg-green-100 text-green-800 w-fit">
                  {session.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoriquePlanificationPage;
