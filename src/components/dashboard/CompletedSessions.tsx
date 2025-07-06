import { Clock, Users, Trophy, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

export function CompletedSessions() {
  const { t } = useTranslation();
  
  const completedSessions = [
    {
      id: 1,
      gameTitle: "Quiz de Mathématiques",
      participants: 25,
      averageScore: 4.2,
      duration: "15 min",
      completedAt: "Il y a 2 heures",
      status: "Excellent"
    },
    {
      id: 2,
      gameTitle: "Histoire du Congo",
      participants: 18,
      averageScore: 3.8,
      duration: "12 min",
      completedAt: "Il y a 4 heures",
      status: "Bien"
    },
    {
      id: 3,
      gameTitle: "Sciences Naturelles",
      participants: 22,
      averageScore: 4.5,
      duration: "18 min",
      completedAt: "Il y a 1 jour",
      status: "Excellent"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-akili-green-100 text-akili-green-700";
      case "Bien":
        return "bg-akili-blue-100 text-akili-blue-700";
      default:
        return "bg-akili-grey-100 text-akili-grey-700";
    }
  };

  return (
    <div className="space-y-s20">
      <h2 className="text-h3-bold text-akili-grey-800">{t('dashboard.completedSessions.title')}</h2>
      <div className="space-y-s12">
        {completedSessions.map((session) => (
          <Card 
            key={session.id} 
            className="border-0 shadow-akili-sm bg-white hover:shadow-akili-md transition-all duration-fast"
          >
            <CardContent className="p-s16">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-s16">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-akili-green-100 to-akili-green-200 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-akili-green-600" />
                  </div>
                  <div>
                    <h3 className="font-akili-bold text-akili-grey-800 text-body1-bold">{session.gameTitle}</h3>
                    <div className="flex items-center space-x-s12 text-body3-medium text-akili-grey-600">
                      <div className="flex items-center space-x-s4">
                        <Users className="w-4 h-4" />
                        <span>{session.participants} participants</span>
                      </div>
                      <div className="flex items-center space-x-s4">
                        <Clock className="w-4 h-4" />
                        <span>{session.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-s12">
                  <div className="text-center">
                    <div className="text-h5-bold text-akili-orange-600">{session.averageScore}/5</div>
                    <div className="text-body4-medium text-akili-grey-600">Score moyen</div>
                  </div>
                  <Badge className={getStatusColor(session.status)}>
                    {session.status}
                  </Badge>
                  <div className="text-right">
                    <div className="text-body3-medium text-akili-grey-600">{session.completedAt}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}