
import { useState, useEffect } from "react";
import { ArrowLeft, Users, Play, Pause, Square, SkipForward, Trophy, Clock, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface LiveSessionProps {
  onNavigate: (view: string) => void;
  planificationData?: {
    planificationId: string;
    pin: string;
    jeu: any;
  };
}

export function LiveSession({ onNavigate, planificationData }: LiveSessionProps) {
  const [sessionState, setSessionState] = useState("waiting"); // waiting, playing, paused, finished
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gamePin] = useState(planificationData?.pin || "123456");
  
  const participants = [
    { id: 1, name: "Amina Diallo", score: 850, streak: 3, answered: true },
    { id: 2, name: "Kwame Asante", score: 720, streak: 2, answered: true },
    { id: 3, name: "Fatou Ndiaye", score: 680, streak: 1, answered: false },
    { id: 4, name: "Mamadou Keita", score: 640, streak: 0, answered: true },
    { id: 5, name: "Aissatou Ba", score: 580, streak: 1, answered: false },
    { id: 6, name: "Ousmane Traoré", score: 520, streak: 0, answered: true },
    { id: 7, name: "Mariam Kone", score: 480, streak: 2, answered: true },
    { id: 8, name: "Ibrahim Sow", score: 420, streak: 0, answered: false },
  ];

  const questions = [
    {
      id: 1,
      question: "Quelle est la capitale de la France ?",
      options: ["Paris", "Lyon", "Marseille", "Toulouse"],
      correctAnswer: 0,
      timeLimit: 30
    },
    {
      id: 2,
      question: "En quelle année a eu lieu la Révolution française ?",
      options: ["1789", "1792", "1804", "1815"],
      correctAnswer: 0,
      timeLimit: 25
    },
    {
      id: 3,
      question: "Qui a écrit 'Les Misérables' ?",
      options: ["Émile Zola", "Victor Hugo", "Gustave Flaubert", "Honoré de Balzac"],
      correctAnswer: 1,
      timeLimit: 20
    }
  ];

  const currentQuestionData = questions[currentQuestion];
  const totalQuestions = questions.length;
  const answeredCount = participants.filter(p => p.answered).length;
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionState === "playing" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionState, timeLeft]);

  const startSession = () => {
    setSessionState("playing");
    setTimeLeft(currentQuestionData.timeLimit);
  };

  const pauseSession = () => {
    setSessionState(sessionState === "playing" ? "paused" : "playing");
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(questions[currentQuestion + 1].timeLimit);
      setSessionState("playing");
    } else {
      setSessionState("finished");
    }
  };

  const endSession = () => {
    setSessionState("finished");
  };

  const renderWaitingRoom = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-2xl p-8 mb-6">
          <h2 className="text-3xl font-bold mb-2">Salle d'Attente</h2>
          <p className="text-orange-100 mb-6">Les étudiants peuvent rejoindre avec le code PIN</p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
            <p className="text-orange-100 text-lg mb-2">Code PIN</p>
            <div className="text-6xl font-bold tracking-wider">{gamePin}</div>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-orange-100">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>{participants.length} participants</span>
            </div>
            <div className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              <span>{totalQuestions} questions</span>
            </div>
          </div>
        </div>

        <Button
          onClick={startSession}
          size="lg"
          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-8 py-3 text-lg"
        >
          <Play className="w-5 h-5 mr-2" />
          Démarrer le Quiz
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-orange-500" />
            Participants Connectés ({participants.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {participants.map((participant) => (
              <div key={participant.id} className="bg-akili-grey-50 rounded-lg p-3 text-center">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm font-medium">
                  {participant.name.charAt(0)}
                </div>
                <p className="text-sm font-medium text-grey-800 truncate">{participant.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGameSession = () => (
    <div className="space-y-6">
      {/* Contrôles et Infos */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Badge className="bg-orange-100 text-orange-800 px-3 py-1">
              Question {currentQuestion + 1}/{totalQuestions}
            </Badge>
            <div className="flex items-center text-grey-700">
              <Clock className="w-4 h-4 mr-1" />
              <span className="font-mono text-lg">{timeLeft}s</span>
            </div>
            <div className="flex items-center text-grey-700">
              <Users className="w-4 h-4 mr-1" />
              <span>{answeredCount}/{participants.length} répondu</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={pauseSession}
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              {sessionState === "playing" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              onClick={nextQuestion}
              className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white"
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Question Suivante
            </Button>
            <Button
              onClick={endSession}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Square className="w-4 h-4 mr-2" />
              Terminer
            </Button>
          </div>
        </div>

        <Progress value={progressPercentage} className="h-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Question Actuelle */}
        <Card className="bg-gradient-to-br from-akili-grey-50 to-orange-100">
          <CardHeader>
            <CardTitle className="text-xl text-grey-800">
              {currentQuestionData.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {currentQuestionData.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    index === currentQuestionData.correctAnswer
                      ? "border-green-300 bg-green-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3 ${
                      index === currentQuestionData.correctAnswer
                        ? "bg-green-500"
                        : "bg-slate-400"
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Classement en Direct */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Classement en Direct
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {participants
                .sort((a, b) => b.score - a.score)
                .map((participant, index) => (
                  <div
                    key={participant.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      participant.answered ? "bg-green-50 border border-green-200" : "bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                        index === 0 ? "bg-yellow-500" :
                        index === 1 ? "bg-gray-400" :
                        index === 2 ? "bg-orange-600" : "bg-slate-400"
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{participant.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-slate-600">{participant.score} pts</span>
                          {participant.streak > 0 && (
                            <Badge variant="outline" className="text-xs">
                              🔥 {participant.streak}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      participant.answered ? "bg-green-500" : "bg-slate-300"
                    }`} />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl p-8 mb-6">
          <Trophy className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Quiz Terminé !</h2>
          <p className="text-green-100">Félicitations à tous les participants</p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => onNavigate("historique-session")}
            className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white"
          >
            Voir les Résultats Détaillés
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate("mes-jeux")}
            className="border-grey-400 text-grey-700 hover:bg-akili-grey-50"
          >
            Retour à Mes Jeux
          </Button>
        </div>
      </div>

      {/* Podium */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">🏆 Podium Final</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-end space-x-8 mb-8">
            {/* 2ème place */}
            <div className="text-center">
              <div className="w-20 h-24 bg-gradient-to-t from-gray-400 to-gray-500 rounded-t-lg flex items-end justify-center pb-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xl">🥈</span>
                </div>
              </div>
              <div className="mt-3">
                <p className="font-bold text-slate-800">{participants[1]?.name}</p>
                <p className="text-slate-600">{participants[1]?.score} pts</p>
              </div>
            </div>

            {/* 1ère place */}
            <div className="text-center">
              <div className="w-20 h-32 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-lg flex items-end justify-center pb-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xl">🥇</span>
                </div>
              </div>
              <div className="mt-3">
                <p className="font-bold text-slate-800">{participants[0]?.name}</p>
                <p className="text-slate-600">{participants[0]?.score} pts</p>
              </div>
            </div>

            {/* 3ème place */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-t from-orange-600 to-orange-700 rounded-t-lg flex items-end justify-center pb-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xl">🥉</span>
                </div>
              </div>
              <div className="mt-3">
                <p className="font-bold text-slate-800">{participants[2]?.name}</p>
                <p className="text-slate-600">{participants[2]?.score} pts</p>
              </div>
            </div>
          </div>

          {/* Classement complet */}
          <div className="space-y-2">
            {participants
              .sort((a, b) => b.score - a.score)
              .map((participant, index) => (
                <div key={participant.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-slate-600 w-6">#{index + 1}</span>
                    <span className="font-medium text-slate-800">{participant.name}</span>
                  </div>
                  <span className="font-bold text-slate-800">{participant.score} pts</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen w-full p-6 space-y-6 bg-akili-grey-50">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate("planification")}
            className="text-grey-700 hover:bg-akili-grey-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux Planifications
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-grey-800">Session Live</h1>
            <p className="text-grey-700">
              {planificationData?.jeu?.titre && `Jeu: ${planificationData.jeu.titre} - `}
              {sessionState === "waiting" && "En attente des participants"}
              {sessionState === "playing" && `Question ${currentQuestion + 1}/${totalQuestions} en cours`}
              {sessionState === "paused" && "Session en pause"}
              {sessionState === "finished" && "Session terminée"}
            </p>
          </div>
        </div>
        
        {sessionState !== "waiting" && sessionState !== "finished" && (
          <div className="flex items-center space-x-4 text-sm text-grey-700">
            <span>PIN: <strong>{gamePin}</strong></span>
          </div>
        )}
      </div>

      {/* Contenu selon l'état */}
      {sessionState === "waiting" && renderWaitingRoom()}
      {(sessionState === "playing" || sessionState === "paused") && renderGameSession()}
      {sessionState === "finished" && renderResults()}
    </div>
  );
}
