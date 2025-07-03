
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
      title: "Jeu Histoire - Révolution",
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
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
      <div className="max-w-7xl mx-auto px-s24 py-s32 space-y-32">
        {/* Header */}
        <div>
          <h1 className="text-h2-black text-akili-purple-500 mb-s8">Historique des Planifications</h1>
          <p className="text-body1-medium text-akili-grey-700">Consultez les résultats de vos sessions passées</p>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-s24">
          <Card className="bg-white shadow-akili-sm border-0">
            <CardContent className="p-s24 text-center">
              <div className="w-16 h-16 bg-akili-purple-500 rounded-akili-xl flex items-center justify-center mx-auto mb-s12">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="text-h3-black text-akili-grey-800">47</div>
              <div className="text-body3-medium text-akili-grey-600">Sessions totales</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-akili-sm border-0">
            <CardContent className="p-s24 text-center">
              <div className="w-16 h-16 bg-akili-blue-500 rounded-akili-xl flex items-center justify-center mx-auto mb-s12">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-h3-black text-akili-grey-800">1,248</div>
              <div className="text-body3-medium text-akili-grey-600">Participations</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-akili-sm border-0">
            <CardContent className="p-s24 text-center">
              <div className="w-16 h-16 bg-akili-green-500 rounded-akili-xl flex items-center justify-center mx-auto mb-s12">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-h3-black text-akili-grey-800">89%</div>
              <div className="text-body3-medium text-akili-grey-600">Taux de réussite</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-akili-sm border-0">
            <CardContent className="p-s24 text-center">
              <div className="w-16 h-16 bg-akili-teal-500 rounded-akili-xl flex items-center justify-center mx-auto mb-s12">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-h3-black text-akili-grey-800">32 min</div>
              <div className="text-body3-medium text-akili-grey-600">Durée moyenne</div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <div className="flex flex-col md:flex-row md:items-center gap-s16">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-s12 top-1/2 transform -translate-y-1/2 text-akili-grey-600 w-5 h-5" />
            <Input
              placeholder="Rechercher dans l'historique..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-s40 border-akili-grey-400 focus:border-akili-purple-500 focus:ring-akili-purple-300"
            />
          </div>
          <Select value={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger className="w-48 border-akili-grey-400">
              <Filter className="w-4 h-4 mr-2 text-akili-purple-500" />
              <SelectValue placeholder="Filtrer par période" />
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
        <div className="space-y-s16">
          {historique.map((session) => (
            <Card key={session.id} className="bg-white shadow-akili-sm border-0 hover:shadow-akili-md transition-all duration-fast">
              <CardContent className="p-s24">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-s16 md:space-y-0">
                  <div className="flex-1">
                    <h3 className="text-h5-bold text-akili-grey-800 mb-s8">{session.title}</h3>
                    <p className="text-body3-medium text-akili-grey-600">Session du {session.date}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-s16 text-center">
                    <div>
                      <div className="text-h5-bold text-akili-grey-800">{session.participants}</div>
                      <div className="text-body4-medium text-akili-grey-600">Participants</div>
                    </div>
                    <div>
                      <div className="text-h5-bold text-akili-green-500">{session.reussite}</div>
                      <div className="text-body4-medium text-akili-grey-600">Réussite</div>
                    </div>
                    <div>
                      <div className="text-h5-bold text-akili-blue-500">{session.duree}</div>
                      <div className="text-body4-medium text-akili-grey-600">Durée</div>
                    </div>
                    <div>
                      <div className="text-h5-bold text-akili-purple-500">{session.score}/5</div>
                      <div className="text-body4-medium text-akili-grey-600">Score</div>
                    </div>
                  </div>
                  
                  <Badge className="bg-akili-green-500 text-white font-akili-bold w-fit">
                    {session.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoriquePlanificationPage;
