
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
    <div className="space-y-6">
      <Card className="border-orange-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
          <CardTitle className="flex items-center text-orange-800">
            <HelpCircle className="w-5 h-5 mr-2 text-orange-600" />
            Informations Générales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre du Quiz *
            </label>
            <Input
              value={quizData.title}
              onChange={(e) => setQuizData({...quizData, title: e.target.value})}
              placeholder="Ex: Histoire de France - Révolution"
              className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Textarea
              value={quizData.description}
              onChange={(e) => setQuizData({...quizData, description: e.target.value})}
              placeholder="Décrivez brièvement le contenu de votre quiz..."
              rows={3}
              className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Matière *
              </label>
              <Select value={quizData.subject} onValueChange={(value) => setQuizData({...quizData, subject: value})}>
                <SelectTrigger className="bg-white border-orange-200 focus:border-orange-500">
                  <SelectValue placeholder="Choisir une matière" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulté
              </label>
              <Select value={quizData.difficulty} onValueChange={(value) => setQuizData({...quizData, difficulty: value})}>
                <SelectTrigger className="bg-white border-orange-200 focus:border-orange-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durée Estimée
            </label>
            <Input
              value={quizData.estimatedDuration}
              onChange={(e) => setQuizData({...quizData, estimatedDuration: e.target.value})}
              placeholder="Ex: 10-15 minutes"
              className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
