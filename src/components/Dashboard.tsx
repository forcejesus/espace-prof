
import { Gamepad2, Calendar, Users, TrendingUp, Award, ArrowRight, Play, History, UserPlus, Filter, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");

  const stats = [
    { 
      title: "Jeux Créés", 
      value: "24", 
      icon: Gamepad2, 
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600", 
      textColor: "text-white",
      change: "+3 ce mois",
      changeColor: "text-orange-200"
    },
    { 
      title: "Planifications", 
      value: "12", 
      icon: Calendar, 
      bgColor: "bg-gradient-to-br from-violet-500 to-violet-600", 
      textColor: "text-white",
      change: "+5 cette semaine",
      changeColor: "text-violet-200"
    },
    { 
      title: "Apprenants", 
      value: "432", 
      subtitle: "École: 380 | Groupes: 35 | Individuels: 17",
      icon: Users, 
      bgColor: "bg-gradient-to-br from-green-500 to-green-600", 
      textColor: "text-white",
      change: "+28 ce mois",
      changeColor: "text-green-200"
    },
  ];

  const quickActions = [
    {
      title: "Nouveau Jeu",
      description: "Créez un nouveau jeu éducatif",
      icon: Gamepad2,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-100",
      onClick: () => onNavigate("creer-quiz")
    },
    {
      title: "Planifier une Session",
      description: "Organisez une session de jeu",
      icon: Calendar,
      iconColor: "text-violet-500",
      iconBg: "bg-violet-100",
      onClick: () => onNavigate("planification")
    },
    {
      title: "Historique Planification",
      description: "Consultez vos planifications",
      icon: History,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
      onClick: () => onNavigate("historique-planification")
    },
    {
      title: "Groupe/Apprenant",
      description: "Gérez vos groupes et apprenants",
      icon: UserPlus,
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
      onClick: () => onNavigate("groupe-apprenant")
    }
  ];

  const games = [
    {
      id: 1,
      title: "Histoire de France - Révolution",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      subject: "Histoire",
      difficulty: "Intermédiaire",
      questions: 15,
      plays: 245,
      lastPlayed: "Il y a 2 jours"
    },
    {
      id: 2,
      title: "Mathématiques - Géométrie",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
      subject: "Mathématiques",
      difficulty: "Facile",
      questions: 10,
      plays: 156,
      lastPlayed: "Il y a 5 jours"
    },
    {
      id: 3,
      title: "Sciences - Le Système Solaire",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
      subject: "Sciences",
      difficulty: "Difficile",
      questions: 20,
      plays: 89,
      lastPlayed: "Il y a 1 semaine"
    }
  ];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === "all" || game.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="p-4 md:p-8 space-y-8 font-mono">
      {/* Header de bienvenue */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <Gamepad2 className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Tableau de Bord AKILI 🎮</h1>
              <p className="text-orange-100 text-lg">Votre plateforme de jeux éducatifs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques mises en valeur */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden border-2 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-16 h-16 rounded-2xl ${stat.bgColor} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm font-medium ${stat.changeColor.replace('text-', 'text-').replace('-200', '-600')}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{stat.title}</h3>
                {stat.subtitle && (
                  <p className="text-sm text-gray-600 font-medium">{stat.subtitle}</p>
                )}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions Rapides */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Actions Rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-orange-200" onClick={action.onClick}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 rounded-2xl ${action.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className={`w-8 h-8 ${action.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Liste des jeux avec filtres */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Mes Jeux</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un jeu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-500 font-mono"
              />
            </div>
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger className="w-40 border-orange-200 focus:border-orange-500 font-mono">
                <Filter className="w-4 h-4 mr-2 text-orange-500" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes matières</SelectItem>
                <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                <SelectItem value="Histoire">Histoire</SelectItem>
                <SelectItem value="Sciences">Sciences</SelectItem>
                <SelectItem value="Français">Français</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={() => onNavigate("creer-quiz")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg font-mono"
            >
              Nouveau Jeu
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <Card key={game.id} className="group hover:shadow-xl transition-all duration-300 border-2 border-orange-200 overflow-hidden">
              <div className="relative">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3 bg-orange-500 text-white font-mono">
                  {game.subject}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                  {game.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-4">
                    <span>{game.questions} questions</span>
                    <span>{game.plays} sessions</span>
                  </div>
                  <Badge variant="outline" className="border-orange-300 text-orange-700 font-mono">
                    {game.difficulty}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{game.lastPlayed}</span>
                  <Button 
                    size="sm"
                    onClick={() => onNavigate("session-live")}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-mono"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Jouer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
