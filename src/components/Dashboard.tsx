
import { Gamepad2, Calendar, Users, TrendingUp, Award, ArrowRight, Play, History, UserPlus, Filter, Search, Plus, MoreHorizontal, Folder, Grid3X3, List, Star, BookOpen, Trophy, Target, Brain, Zap } from "lucide-react";
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
      icon: Brain, 
      bgColor: "bg-akili-purple-500", 
      textColor: "text-white",
      change: "+3 ce mois",
      changeColor: "text-purple-200"
    },
    { 
      title: "Planifications", 
      value: "12", 
      icon: Calendar, 
      bgColor: "bg-akili-blue-500", 
      textColor: "text-white",
      change: "+5 cette semaine",
      changeColor: "text-blue-200"
    },
    { 
      title: "Apprenants", 
      value: "432", 
      subtitle: "École: 380 | Groupes: 35 | Individuels: 17",
      icon: Users, 
      bgColor: "bg-akili-green-500", 
      textColor: "text-white",
      change: "+28 ce mois",
      changeColor: "text-green-200"
    },
  ];

  const quickActions = [
    {
      title: "Nouveau Jeux",
      description: "Créez un nouveau jeu éducatif",
      icon: Zap,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      onClick: () => onNavigate("creer-quiz")
    },
    {
      title: "Planifier une Session",
      description: "Organisez une session de jeu",
      icon: Target,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      onClick: () => onNavigate("planification")
    },
    {
      title: "Historique des Planifications",
      description: "Consultez vos planifications passées",
      icon: History,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      onClick: () => onNavigate("historique-planification")
    },
    {
      title: "Gestion des Apprenants",
      description: "Gérez vos apprenants et groupes",
      icon: UserPlus,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
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
    },
    {
      id: 4,
      title: "Français - Grammaire",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      subject: "Français",
      difficulty: "Facile",
      questions: 12,
      plays: 178,
      lastPlayed: "Il y a 3 jours"
    },
    {
      id: 5,
      title: "Géographie - Capitales du Monde",
      image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop",
      subject: "Géographie",
      difficulty: "Intermédiaire",
      questions: 25,
      plays: 134,
      lastPlayed: "Il y a 1 jour"
    }
  ];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === "all" || game.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const folders = [
    { name: "Histoire", color: "bg-akili-purple-500", count: 8, icon: BookOpen },
    { name: "Mathématiques", color: "bg-akili-blue-500", count: 12, icon: Trophy },
    { name: "Sciences", color: "bg-akili-green-500", count: 6, icon: Star },
    { name: "Français", color: "bg-akili-orange-500", count: 4, icon: BookOpen },
    { name: "Géographie", color: "bg-akili-teal-500", count: 3, icon: Target },
    { name: "Arts", color: "bg-akili-yellow-500", count: 2, icon: Star }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
      <div className="max-w-7xl mx-auto px-s24 py-s32 space-y-32">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-h2-black" style={{ 
              background: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(234, 88, 12))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Tableau de Bord
            </h1>
            <p className="text-body1-medium text-akili-grey-700">Bienvenue dans votre espace éducateur</p>
          </div>
          <div className="flex items-center space-x-s16">
            <div className="relative w-96">
              <Search className="absolute left-s12 top-1/2 transform -translate-y-1/2 text-akili-grey-600 w-5 h-5" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-s40 border-akili-grey-400 focus:border-akili-purple-500 focus:ring-akili-purple-300"
              />
            </div>
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger className="w-48 border-akili-grey-400">
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
              className="text-white font-akili-bold px-s24"
              style={{ background: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(234, 88, 12))' }}
            >
              Créer
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-s24">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-akili-lg border-0 hover:shadow-akili-intense transition-all duration-fast transform hover:-translate-y-1">
              <CardContent className="p-s24">
                <div className="flex items-center justify-between mb-s20">
                  <div className={`w-14 h-14 rounded-akili-xl ${stat.bgColor} flex items-center justify-center shadow-akili-md`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-h2-black text-akili-grey-800 mb-s4">{stat.value}</p>
                    <p className="text-body3-medium text-akili-green-500 font-akili-bold">{stat.change}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-h4-bold text-akili-grey-800 mb-s8">{stat.title}</h3>
                  {stat.subtitle && (
                    <p className="text-body3-medium text-akili-grey-600">{stat.subtitle}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dossiers */}
        <div className="space-y-s20">
          <div className="flex items-center justify-between">
            <h2 className="text-h3-bold text-akili-grey-800">Dossiers ({folders.length})</h2>
            <Button variant="link" className="text-akili-green-500 p-0 font-akili-bold">
              <Plus className="w-4 h-4 mr-s8" />
              Créer nouveau
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-s20">
            {folders.map((folder, index) => (
              <Card key={index} className="bg-white hover:shadow-akili-lg transition-all duration-fast cursor-pointer border-0 shadow-akili-md transform hover:-translate-y-1">
                <CardContent className="p-s20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-s12">
                      <div className={`w-10 h-10 rounded-akili-lg ${folder.color} flex items-center justify-center shadow-akili-sm`}>
                        <folder.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="font-akili-bold text-akili-grey-800">{folder.name}</span>
                        <p className="text-body4-medium text-akili-grey-600">{folder.count} jeux</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="p-1">
                      <MoreHorizontal className="w-4 h-4 text-akili-grey-600" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="space-y-s20">
          <h2 className="text-h3-bold text-akili-grey-800">Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s20">
            {quickActions.map((action, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-akili-lg transition-all duration-fast border-0 shadow-akili-md bg-white transform hover:-translate-y-2" onClick={action.onClick}>
                <CardContent className="p-s28">
                  <div className="flex flex-col items-center text-center space-y-s20">
                    <div className={`w-20 h-20 rounded-akili-xl ${action.iconBg} flex items-center justify-center shadow-akili-lg group-hover:scale-110 transition-transform duration-fast`}>
                      <action.icon className={`w-10 h-10 ${action.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-akili-bold text-akili-grey-800 mb-s8 text-h5-bold">{action.title}</h3>
                      <p className="text-body3-medium text-akili-grey-600 leading-relaxed">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Jeux récents */}
        <div className="space-y-s20">
          <div className="flex items-center justify-between">
            <h2 className="text-h3-bold text-akili-grey-800">Mes Jeux ({games.length})</h2>
            <div className="flex items-center space-x-s12">
              <Button variant="link" className="text-akili-green-500 p-0 font-akili-bold">
                <Plus className="w-4 h-4 mr-s8" />
                Créer nouveau
              </Button>
              <div className="flex space-x-s8">
                <Button variant="outline" size="sm" className="border-akili-grey-400">
                  <Grid3X3 className="w-4 h-4 text-akili-grey-600" />
                </Button>
                <Button variant="outline" size="sm" className="border-akili-grey-400">
                  <List className="w-4 h-4 text-akili-grey-600" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-s24">
            {filteredGames.map((game) => (
              <Card key={game.id} className="group hover:shadow-akili-lg transition-all duration-fast border-0 shadow-akili-md bg-white overflow-hidden transform hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-s12 right-s12 bg-white rounded-full p-s8 shadow-akili-md">
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <MoreHorizontal className="w-4 h-4 text-akili-grey-600" />
                    </Button>
                  </div>
                  <div className="absolute bottom-s12 left-s12">
                    <Badge className="bg-black/20 text-white font-akili-bold backdrop-blur-sm">
                      {game.questions} Questions
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-s20">
                  <div className="space-y-s16">
                    <div>
                      <h3 className="font-akili-bold text-akili-grey-800 mb-s8 text-h5-bold leading-tight">
                        {game.title}
                      </h3>
                      <div className="flex items-center justify-between text-body3-medium text-akili-grey-600">
                        <span className="font-akili-medium">Par AKILI</span>
                        <span>Créé {game.lastPlayed}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-s12 border-t border-akili-grey-400">
                      <div className="flex items-center space-x-s12">
                        <Badge variant="secondary" className="bg-akili-grey-300 text-akili-grey-700 text-body4-medium">
                          {game.subject}
                        </Badge>
                        <Badge variant="secondary" className="bg-akili-blue-300 text-white text-body4-medium">
                          {game.difficulty}
                        </Badge>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => onNavigate("session-live")}
                        className="text-white font-akili-bold px-s20"
                        style={{ background: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(234, 88, 12))' }}
                      >
                        <Play className="w-4 h-4 mr-s8" />
                        Jouer
                      </Button>
                    </div>
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
