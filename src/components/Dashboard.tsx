
import { Gamepad2, Calendar, Users, TrendingUp, Award, ArrowRight, Play, History, UserPlus, Filter, Search, Plus, MoreHorizontal } from "lucide-react";
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
      bgColor: "bg-gradient-to-br from-purple-500 to-indigo-600", 
      textColor: "text-white",
      change: "+3 ce mois",
      changeColor: "text-purple-200"
    },
    { 
      title: "Planifications", 
      value: "12", 
      icon: Calendar, 
      bgColor: "bg-gradient-to-br from-blue-500 to-purple-600", 
      textColor: "text-white",
      change: "+5 cette semaine",
      changeColor: "text-blue-200"
    },
    { 
      title: "Apprenants", 
      value: "432", 
      subtitle: "École: 380 | Groupes: 35 | Individuels: 17",
      icon: Users, 
      bgColor: "bg-gradient-to-br from-indigo-500 to-purple-600", 
      textColor: "text-white",
      change: "+28 ce mois",
      changeColor: "text-indigo-200"
    },
  ];

  const quickActions = [
    {
      title: "Nouveau Jeu",
      description: "Créez un nouveau jeu éducatif",
      icon: Plus,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600",
      onClick: () => onNavigate("creer-quiz")
    },
    {
      title: "Planifier une Session",
      description: "Organisez une session de jeu",
      icon: Calendar,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-blue-500 to-purple-600",
      onClick: () => onNavigate("planification")
    },
    {
      title: "Historique",
      description: "Consultez vos planifications",
      icon: History,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
      onClick: () => onNavigate("historique-planification")
    },
    {
      title: "Groupes",
      description: "Gérez vos groupes et apprenants",
      icon: UserPlus,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-purple-600 to-pink-600",
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

  const folders = [
    { name: "Histoire", color: "bg-purple-500", count: 8 },
    { name: "Mathématiques", color: "bg-blue-500", count: 12 },
    { name: "Sciences", color: "bg-indigo-500", count: 6 },
    { name: "Français", color: "bg-purple-600", count: 4 },
    { name: "Géographie", color: "bg-blue-600", count: 3 },
    { name: "Arts", color: "bg-indigo-600", count: 2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header avec barre de recherche */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Université AKILI</h1>
              <p className="text-gray-600">Espace Éducateur</p>
            </div>
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-purple-300 focus:ring-purple-300"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="w-48 border-gray-200">
                  <SelectValue placeholder="Trier par: Plus récent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes matières</SelectItem>
                  <SelectItem value="recent">Plus récent</SelectItem>
                  <SelectItem value="popular">Plus populaire</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={() => onNavigate("creer-quiz")}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-6"
              >
                Créer
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-sm border-0 hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.change}</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{stat.title}</h3>
                {stat.subtitle && (
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dossiers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Dossiers (6) <Button variant="link" className="text-green-600 p-0 ml-2">Créer nouveau</Button></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {folders.map((folder, index) => (
              <Card key={index} className="bg-white hover:shadow-md transition-all duration-300 cursor-pointer border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg ${folder.color} flex items-center justify-center`}>
                      <div className="w-4 h-4 bg-white rounded-sm opacity-80"></div>
                    </div>
                    <span className="font-medium text-gray-900">{folder.name}</span>
                    <Button variant="ghost" size="sm" className="ml-auto p-1">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-md transition-all duration-300 border-0 shadow-sm bg-white" onClick={action.onClick}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-16 h-16 rounded-2xl ${action.iconBg} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <action.icon className={`w-8 h-8 ${action.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Jeux récents */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Kahoots (5) <Button variant="link" className="text-green-600 p-0 ml-2">Créer nouveau</Button></h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-gray-200">
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-gray-400 rounded-sm"></div>
                  <div className="bg-gray-400 rounded-sm"></div>
                  <div className="bg-gray-400 rounded-sm"></div>
                  <div className="bg-gray-400 rounded-sm"></div>
                </div>
              </Button>
              <Button variant="outline" size="sm" className="border-gray-200">
                <div className="w-4 h-4 flex flex-col gap-0.5">
                  <div className="bg-gray-400 h-0.5 rounded"></div>
                  <div className="bg-gray-400 h-0.5 rounded"></div>
                  <div className="bg-gray-400 h-0.5 rounded"></div>
                  <div className="bg-gray-400 h-0.5 rounded"></div>
                </div>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <Card key={game.id} className="group hover:shadow-md transition-all duration-300 border-0 shadow-sm bg-white overflow-hidden">
                <div className="relative">
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-sm">
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white text-sm font-medium bg-black/20 px-2 py-1 rounded">
                      {game.questions} Questions
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {game.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>Par AKILI</span>
                    <span>Créé {game.lastPlayed}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Pas visible</span>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Marqué</span>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => onNavigate("session-live")}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-4"
                    >
                      Jouer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
