
import { useState } from "react";
import { Search, Plus, Filter, BookOpen, Play, Edit, Copy, Trash2, Users, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface QuizLibraryProps {
  onNavigate: (view: string) => void;
  onEditQuiz: (quiz: any) => void;
}

export function QuizLibrary({ onNavigate, onEditQuiz }: QuizLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const quizzes = [
    {
      id: 1,
      title: "Histoire de France - Révolution",
      description: "Quiz sur la Révolution française de 1789",
      subject: "Histoire",
      difficulty: "Intermédiaire",
      questionsCount: 15,
      estimatedDuration: "10-15 min",
      timesPlayed: 23,
      averageScore: 78,
      rating: 4.5,
      lastPlayed: "Il y a 2 jours",
      thumbnail: "🏛️"
    },
    {
      id: 2,
      title: "Mathématiques - Géométrie",
      description: "Formes, aires et périmètres",
      subject: "Mathématiques",
      difficulty: "Facile",
      questionsCount: 12,
      estimatedDuration: "8-12 min",
      timesPlayed: 45,
      averageScore: 82,
      rating: 4.8,
      lastPlayed: "Hier",
      thumbnail: "📐"
    },
    {
      id: 3,
      title: "Sciences - Le Corps Humain",
      description: "Anatomie et physiologie de base",
      subject: "Sciences",
      difficulty: "Intermédiaire",
      questionsCount: 18,
      estimatedDuration: "12-18 min",
      timesPlayed: 31,
      averageScore: 75,
      rating: 4.3,
      lastPlayed: "Il y a 1 semaine",
      thumbnail: "🫀"
    },
    {
      id: 4,
      title: "Français - Grammaire",
      description: "Conjugaison et orthographe",
      subject: "Français",
      difficulty: "Facile",
      questionsCount: 20,
      estimatedDuration: "15-20 min",
      timesPlayed: 38,
      averageScore: 71,
      rating: 4.2,
      lastPlayed: "Il y a 3 jours",
      thumbnail: "📚"
    },
    {
      id: 5,
      title: "Géographie - Capitales du Monde",
      description: "Connaître les capitales des pays",
      subject: "Géographie",
      difficulty: "Difficile",
      questionsCount: 25,
      estimatedDuration: "18-25 min",
      timesPlayed: 19,
      averageScore: 65,
      rating: 4.6,
      lastPlayed: "Il y a 5 jours",
      thumbnail: "🌍"
    },
    {
      id: 6,
      title: "Anglais - Vocabulaire Niveau 1",
      description: "Mots de base et expressions courantes",
      subject: "Anglais",
      difficulty: "Facile",
      questionsCount: 16,
      estimatedDuration: "10-15 min",
      timesPlayed: 42,
      averageScore: 79,
      rating: 4.4,
      lastPlayed: "Aujourd'hui",
      thumbnail: "🇬🇧"
    }
  ];

  const subjects = ["all", "Mathématiques", "Histoire", "Sciences", "Français", "Géographie", "Anglais"];

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || quiz.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Facile": return "bg-green-100 text-green-800";
      case "Intermédiaire": return "bg-yellow-100 text-yellow-800";
      case "Difficile": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleEditQuiz = (quiz: any) => {
    onEditQuiz(quiz);
    onNavigate("creator");
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Ma Bibliothèque de Quiz</h1>
          <p className="text-slate-600">Gérez et organisez tous vos quiz</p>
        </div>
        <Button 
          onClick={() => onNavigate("creator")}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Créer un Quiz
        </Button>
      </div>

      {/* Filtres et Recherche */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Rechercher un quiz..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 focus:border-indigo-300 focus:ring-indigo-300"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={selectedSubject === subject ? "default" : "outline"}
              onClick={() => setSelectedSubject(subject)}
              className={`whitespace-nowrap ${
                selectedSubject === subject
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {subject === "all" ? "Toutes matières" : subject}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid des Quiz */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <Card key={quiz.id} className="bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-200 group">
            <CardContent className="p-0">
              {/* En-tête de la carte */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{quiz.thumbnail}</div>
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                </div>
                
                <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {quiz.title}
                </h3>
                <p className="text-slate-600 text-sm mb-3">{quiz.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {quiz.questionsCount} questions
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {quiz.estimatedDuration}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="flex items-center text-slate-600">
                    <Users className="w-4 h-4 mr-1" />
                    {quiz.timesPlayed} parties jouées
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-slate-700">{quiz.rating}</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Score moyen</span>
                    <span className="font-medium text-slate-800">{quiz.averageScore}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${quiz.averageScore}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mb-4">Dernière session: {quiz.lastPlayed}</p>
              </div>

              {/* Actions */}
              <div className="border-t border-slate-100 p-4 bg-slate-50 rounded-b-lg">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => onNavigate("live")}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Jouer
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditQuiz(quiz)}
                    className="border-slate-200 text-slate-600 hover:bg-slate-100"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-200 text-slate-600 hover:bg-slate-100"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-200 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">Aucun quiz trouvé</h3>
          <p className="text-slate-500 mb-4">
            {searchTerm || selectedSubject !== "all" 
              ? "Essayez de modifier vos critères de recherche"
              : "Commencez par créer votre premier quiz"
            }
          </p>
          <Button 
            onClick={() => onNavigate("creator")}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Créer un Quiz
          </Button>
        </div>
      )}
    </div>
  );
}
