
import { useState } from "react";
import { Calendar, Users, Trophy, Clock, TrendingUp, Download, Eye, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SessionHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedSession, setSelectedSession] = useState<any>(null);

  const sessions = [
    {
      id: 1,
      quizTitle: "Histoire de France - Révolution",
      date: "2024-12-20",
      time: "14:30",
      participantsCount: 28,
      averageScore: 78,
      duration: "12min 30s",
      questionsCount: 15,
      bestScore: { student: "MAMBOU Marcel", score: 95 },
      status: "completed",
      participants: [
        { id: 1, name: "MAMBOU Marcel", score: 95, correctAnswers: 14, avgTime: "2.1s" },
        { id: 2, name: "KISSANGOU Délice", score: 87, correctAnswers: 13, avgTime: "3.2s" },
        { id: 3, name: "NTSOUMOU Mondésir", score: 82, correctAnswers: 12, avgTime: "2.8s" },
        { id: 4, name: "NGANGOU Ned", score: 76, correctAnswers: 11, avgTime: "4.1s" },
        { id: 5, name: "DISSOUSSOU Emery Patrice", score: 71, correctAnswers: 10, avgTime: "3.5s" },
      ]
    },
    {
      id: 2,
      quizTitle: "Mathématiques - Géométrie",
      date: "2024-12-18",
      time: "10:15",
      participantsCount: 25,
      averageScore: 82,
      duration: "15min 45s",
      questionsCount: 12,
      bestScore: { student: "POBA Brice", score: 100 },
      status: "completed",
      participants: [
        { id: 1, name: "POBA Brice", score: 100, correctAnswers: 12, avgTime: "1.8s" },
        { id: 2, name: "KOUMBA Grace", score: 91, correctAnswers: 11, avgTime: "2.4s" },
        { id: 3, name: "MOUSSOUNDA Paul", score: 88, correctAnswers: 10, avgTime: "3.1s" },
      ]
    },
    {
      id: 3,
      quizTitle: "Sciences - Le Corps Humain",
      date: "2024-12-15",
      time: "09:00",
      participantsCount: 30,
      averageScore: 75,
      duration: "18min 20s",
      questionsCount: 18,
      bestScore: { student: "NTSOUMOU Mondésir", score: 92 },
      status: "completed"
    },
    {
      id: 4,
      quizTitle: "Français - Grammaire",
      date: "2024-12-12",
      time: "16:45",
      participantsCount: 22,
      averageScore: 68,
      duration: "20min 15s",
      questionsCount: 20,
      bestScore: { student: "MAMBOU Marcel", score: 85 },
      status: "completed"
    }
  ];

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.quizTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesPeriod = true;
    if (selectedPeriod !== "all") {
      const sessionDate = new Date(session.date);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - sessionDate.getTime()) / (1000 * 3600 * 24));
      
      switch (selectedPeriod) {
        case "week":
          matchesPeriod = daysDiff <= 7;
          break;
        case "month":
          matchesPeriod = daysDiff <= 30;
          break;
        case "quarter":
          matchesPeriod = daysDiff <= 90;
          break;
      }
    }
    
    return matchesSearch && matchesPeriod;
  });

  const stats = {
    totalSessions: sessions.length,
    totalParticipants: sessions.reduce((sum, session) => sum + session.participantsCount, 0),
    averageScore: Math.round(sessions.reduce((sum, session) => sum + session.averageScore, 0) / sessions.length),
    totalQuestions: sessions.reduce((sum, session) => sum + session.questionsCount, 0)
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const renderSessionDetails = (session: any) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{session.quizTitle}</h3>
          <p className="text-slate-600">{formatDate(session.date)} à {session.time}</p>
        </div>
        <Button
          variant="ghost"
          onClick={() => setSelectedSession(null)}
          className="text-slate-600"
        >
          ✕
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-indigo-50 rounded-lg p-4 text-center">
          <Users className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-800">{session.participantsCount}</p>
          <p className="text-sm text-slate-600">Participants</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <Trophy className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-800">{session.averageScore}%</p>
          <p className="text-sm text-slate-600">Score Moyen</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-800">{session.duration}</p>
          <p className="text-sm text-slate-600">Durée</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <TrendingUp className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-800">{session.bestScore.score}%</p>
          <p className="text-sm text-slate-600">Meilleur Score</p>
        </div>
      </div>

      {session.participants && (
        <Card>
          <CardHeader>
            <CardTitle>Résultats Détaillés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {session.participants.map((participant, index) => (
                <div key={participant.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                      index === 0 ? "bg-yellow-500" :
                      index === 1 ? "bg-gray-400" :
                      index === 2 ? "bg-orange-600" : "bg-slate-400"
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{participant.name}</p>
                      <p className="text-sm text-slate-600">
                        {participant.correctAnswers}/{session.questionsCount} correctes
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-800">{participant.score}%</p>
                    <p className="text-sm text-slate-600">Temps moy: {participant.avgTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center space-x-4">
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          Exporter (PDF)
        </Button>
        <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50">
          <Download className="w-4 h-4 mr-2" />
          Exporter (CSV)
        </Button>
      </div>
    </div>
  );

  if (selectedSession) {
    return (
      <div className="p-6">
        {renderSessionDetails(selectedSession)}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Historique des Sessions</h1>
        <p className="text-slate-600">Analysez les performances de vos quiz</p>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600">Sessions Totales</p>
                <p className="text-2xl font-bold text-indigo-800">{stats.totalSessions}</p>
              </div>
              <Calendar className="w-8 h-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Participants Total</p>
                <p className="text-2xl font-bold text-green-800">{stats.totalParticipants}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Score Général</p>
                <p className="text-2xl font-bold text-orange-800">{stats.averageScore}%</p>
              </div>
              <Trophy className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Questions Posées</p>
                <p className="text-2xl font-bold text-purple-800">{stats.totalQuestions}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Rechercher une session..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 focus:border-indigo-300 focus:ring-indigo-300"
          />
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48 bg-white border-slate-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les périodes</SelectItem>
            <SelectItem value="week">Cette semaine</SelectItem>
            <SelectItem value="month">Ce mois</SelectItem>
            <SelectItem value="quarter">Ce trimestre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Liste des sessions */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <Card key={session.id} className="bg-white hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className="text-lg font-semibold text-slate-800">{session.quizTitle}</h3>
                    <Badge className="bg-green-100 text-green-800">Terminé</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-slate-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(session.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{session.participantsCount} participants</span>
                    </div>
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 mr-2" />
                      <span>{session.averageScore}% moyen</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span>{session.bestScore.score}% max</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm text-slate-500">
                      Meilleur score: <strong>{session.bestScore.student}</strong> ({session.bestScore.score}%)
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2 ml-6">
                  <Button
                    size="sm"
                    onClick={() => setSelectedSession(session)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Détails
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">Aucune session trouvée</h3>
          <p className="text-slate-500">
            {searchTerm || selectedPeriod !== "all" 
              ? "Essayez de modifier vos critères de recherche"
              : "Vous n'avez pas encore organisé de sessions"
            }
          </p>
        </div>
      )}
    </div>
  );
}
