
import { User, Award, BarChart3, BookOpen, Play, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProfilePage = () => {
  const achievements = [
    { title: "Premier Quiz", description: "Créé votre premier quiz", icon: BookOpen, earned: true },
    { title: "Session Populaire", description: "100+ participants dans une session", icon: Play, earned: true },
    { title: "Quiz Master", description: "Créé 50+ quiz", icon: Award, earned: false },
    { title: "Éducateur Actif", description: "30 jours d'activité consécutifs", icon: Calendar, earned: true },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Mon Profil</h1>
        <p className="text-slate-600">Votre progression et statistiques</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white border-0 shadow-sm lg:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Mme Dubois</h2>
            <p className="text-slate-600">Professeur de Sciences</p>
            <p className="text-sm text-slate-500 mt-2">Collège Jean Moulin</p>
            <Badge className="mt-3 bg-green-100 text-green-800">Membre Actif</Badge>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-800">
                <BarChart3 className="w-5 h-5 mr-2 text-indigo-500" />
                Statistiques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">24</div>
                  <div className="text-sm text-slate-600">Quiz Créés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">156</div>
                  <div className="text-sm text-slate-600">Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">432</div>
                  <div className="text-sm text-slate-600">Étudiants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">78%</div>
                  <div className="text-sm text-slate-600">Score Moyen</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-800">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border-2 ${
                      achievement.earned 
                        ? "border-green-200 bg-green-50" 
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achievement.earned 
                          ? "bg-green-100 text-green-600" 
                          : "bg-slate-100 text-slate-400"
                      }`}>
                        <achievement.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`font-medium ${
                          achievement.earned ? "text-slate-800" : "text-slate-500"
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-slate-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
