
import { HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuizInfoStepProps {
  quizData: {
    title: string;
    description: string;
    subject: string;
    difficulty: string;
    estimatedDuration: string;
  };
  setQuizData: (data: any) => void;
}

export function QuizInfoStep({ quizData, setQuizData }: QuizInfoStepProps) {
  const subjects = ["Mathématiques", "Histoire", "Sciences", "Français", "Géographie", "Anglais", "Arts", "Sport"];
  const difficulties = ["Facile", "Intermédiaire", "Difficile"];

  return (
    <div className="space-y-s32">
      {/* En-tête avec animation */}
      <div className="text-center space-y-s16 animate-fade-in-up">
        <div className="inline-flex items-center space-x-s12 bg-gradient-to-r from-purple-100 to-blue-100 px-s24 py-s12 rounded-full">
          <HelpCircle className="w-6 h-6 text-purple-600" />
          <span className="text-h5-bold text-purple-700">Informations Générales</span>
        </div>
        <p className="text-body1-medium text-akili-grey-600 max-w-2xl mx-auto">
          Commençons par définir les informations de base de votre jeu éducatif
        </p>
      </div>

      <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50/50 rounded-2xl overflow-hidden">
        <CardContent className="p-s40 space-y-s32">
          {/* Titre */}
          <div className="space-y-s12">
            <label className="flex items-center text-body1-bold text-akili-grey-800 mb-s8">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-s8"></span>
              Titre du Quiz
            </label>
            <Input
              value={quizData.title}
              onChange={(e) => setQuizData({...quizData, title: e.target.value})}
              placeholder="Ex: Histoire de France - La Révolution française"
              className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl px-s20 py-s16 text-body1-medium transition-all duration-300 hover:bg-white"
            />
          </div>

          {/* Description */}
          <div className="space-y-s12">
            <label className="block text-body1-bold text-akili-grey-800 mb-s8">
              Description
            </label>
            <Textarea
              value={quizData.description}
              onChange={(e) => setQuizData({...quizData, description: e.target.value})}
              placeholder="Décrivez brièvement le contenu et les objectifs pédagogiques de votre quiz..."
              rows={4}
              className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl px-s20 py-s16 text-body1-medium transition-all duration-300 hover:bg-white resize-none"
            />
          </div>

          {/* Grille des sélections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-s24">
            <div className="space-y-s12">
              <label className="flex items-center text-body1-bold text-akili-grey-800">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-s8"></span>
                Matière
              </label>
              <Select value={quizData.subject} onValueChange={(value) => setQuizData({...quizData, subject: value})}>
                <SelectTrigger className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:border-purple-400 rounded-xl px-s20 py-s16 h-auto hover:bg-white transition-all duration-300">
                  <SelectValue placeholder="Choisir une matière" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 border-purple-200">
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="rounded-lg">
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-s12">
              <label className="block text-body1-bold text-akili-grey-800">
                Difficulté
              </label>
              <Select value={quizData.difficulty} onValueChange={(value) => setQuizData({...quizData, difficulty: value})}>
                <SelectTrigger className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:border-purple-400 rounded-xl px-s20 py-s16 h-auto hover:bg-white transition-all duration-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 border-purple-200">
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty} className="rounded-lg">
                      <div className="flex items-center space-x-s8">
                        <div className={`w-3 h-3 rounded-full ${
                          difficulty === 'Facile' ? 'bg-green-400' : 
                          difficulty === 'Intermédiaire' ? 'bg-yellow-400' : 'bg-red-400'
                        }`}></div>
                        <span>{difficulty}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-s12">
              <label className="block text-body1-bold text-akili-grey-800">
                Durée Estimée
              </label>
              <Input
                value={quizData.estimatedDuration}
                onChange={(e) => setQuizData({...quizData, estimatedDuration: e.target.value})}
                placeholder="Ex: 10-15 minutes"
                className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl px-s20 py-s16 text-body1-medium transition-all duration-300 hover:bg-white"
              />
            </div>
          </div>

          {/* Conseils */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-s24">
            <div className="flex items-start space-x-s16">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">💡</span>
              </div>
              <div className="space-y-s8">
                <h4 className="text-body1-bold text-blue-900">Conseils pour un bon quiz</h4>
                <ul className="text-body2-medium text-blue-800 space-y-s4">
                  <li>• Choisissez un titre clair et engageant</li>
                  <li>• La description aide les apprenants à comprendre les objectifs</li>
                  <li>• Adaptez la difficulté au niveau de vos apprenants</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
