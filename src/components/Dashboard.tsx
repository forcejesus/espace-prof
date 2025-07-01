
import { BarChart3, BookOpen, Play, Users, TrendingUp, Award, Clock, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    { label: "Quiz Créés", value: "24", icon: BookOpen, color: "indigo", change: "+3 ce mois" },
    { label: "Sessions Jouées", value: "156", icon: Play, color: "green", change: "+12 cette semaine" },
    { label: "Étudiants Actifs", value: "432", icon: Users, color: "orange", change: "+28 ce mois" },
    { label: "Score Moyen", value: "78%", icon: Target, color: "purple", change: "+5% vs mois dernier" },
  ];

  const recentSessions = [
    { title: "Mathématiques - Géométrie", participants: 28, score: 82, date: "Il y a 2h" },
    { title: "Histoire - Révolution Française", participants: 25, score: 75, date: "Hier" },
    { title: "Sciences - Le Corps Humain", participants: 30, score: 88, date: "Il y a 2 jours" },
  ];

  const popularQuiz = [
    { title: "Tables de Multiplication", plays: 45, rating: 4.8, subject: "Mathématiques" },
    { title: "Capitales du Monde", plays: 38, rating: 4.6, subject: "Géographie" },
    { title: "Grammaire Française", plays: 32, rating: 4.5, subject: "Français" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Bonjour, Mme Dubois ! 👋</h1>
          <p className="text-slate-600">Voici un aperçu de vos activités récentes</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={() => onNavigate("creator")}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Nouveau Quiz
          </Button>
          <Button 
            onClick={() => onNavigate("live")}
            variant="outline"
            className="border-orange-200 text-orange-600 hover:bg-orange-50 px-6 py-2 rounded-lg"
          >
            <Play className="w-4 h-4 mr-2" />
            Session Live
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${stat.color}-400 to-${stat.color}-600 flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions Récentes */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <Clock className="w-5 h-5 mr-2 text-indigo-500" />
              Sessions Récentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div>
                  <h4 className="font-medium text-slate-800">{session.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {session.participants}
                    </span>
                    <span className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      {session.score}%
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-500">{session.date}</span>
              </div>
            ))}
            <Button 
              variant="ghost" 
              onClick={() => onNavigate("history")}
              className="w-full text-indigo-600 hover:bg-indigo-50"
            >
              Voir tout l'historique
            </Button>
          </CardContent>
        </Card>

        {/* Quiz Populaires */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
              Quiz Populaires
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {popularQuiz.map((quiz, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div>
                  <h4 className="font-medium text-slate-800">{quiz.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                    <span>{quiz.subject}</span>
                    <span className="flex items-center">
                      ⭐ {quiz.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-slate-800">{quiz.plays} parties</span>
                </div>
              </div>
            ))}
            <Button 
              variant="ghost" 
              onClick={() => onNavigate("library")}
              className="w-full text-orange-600 hover:bg-orange-50"
            >
              Voir tous les quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
