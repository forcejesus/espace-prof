import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { gameService, Game } from "@/services";
import { QuestionsStep } from "@/components/quiz-creator/QuestionsStep";

export default function ModifierJeu() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("config");
  
  // États pour la configuration
  const [gameName, setGameName] = useState("");
  const [gameImage, setGameImage] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const result = await gameService.getMyGames();
        const foundGame = result.data.find(g => g._id === id);
        
        if (foundGame) {
          setGame(foundGame);
          setGameName(foundGame.titre);
          setGameImage(foundGame.image || "");
        } else {
          toast({
            title: "Erreur",
            description: "Jeu non trouvé",
            variant: "destructive",
          });
          navigate("/mes-jeux");
        }
      } catch (error) {
        console.error("Erreur lors du chargement du jeu:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger le jeu",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id, navigate, toast]);

  const handleSaveConfig = async () => {
    if (!game) return;
    
    try {
      setSaving(true);
      // TODO: Appel API pour mettre à jour la configuration du jeu
      // await gameService.updateGame(game._id, { titre: gameName, image: gameImage });
      
      toast({
        title: "Succès",
        description: "Configuration sauvegardée",
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du jeu...</p>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Jeu non trouvé</p>
          <Button onClick={() => navigate("/mes-jeux")} className="mt-4">
            Retour à mes jeux
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/mes-jeux")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Modifier le jeu</h1>
            <p className="text-gray-600 mt-1">{game.titre}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="config" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configuration du jeu
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Questions et Réponses
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Configuration */}
          <TabsContent value="config">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Configuration du jeu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Nom du jeu */}
                  <div className="space-y-2">
                    <Label htmlFor="game-name">Nom du jeu</Label>
                    <Input
                      id="game-name"
                      value={gameName}
                      onChange={(e) => setGameName(e.target.value)}
                      placeholder="Entrez le nom du jeu"
                    />
                  </div>

                  {/* Image du jeu */}
                  <div className="space-y-2">
                    <Label htmlFor="game-image">Image du jeu (URL)</Label>
                    <Input
                      id="game-image"
                      value={gameImage}
                      onChange={(e) => setGameImage(e.target.value)}
                      placeholder="URL de l'image"
                    />
                  </div>
                </div>

                {/* Aperçu de l'image */}
                {gameImage && (
                  <div className="space-y-2">
                    <Label>Aperçu de l'image</Label>
                    <div className="w-64 h-36 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={gameImage.startsWith('http') ? gameImage : `http://localhost:3000/${gameImage.replace('public/', '')}`}
                        alt="Aperçu"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/256x144/f97316/ffffff?text=Image";
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Bouton de sauvegarde */}
                <div className="flex justify-end pt-4 border-t">
                  <Button 
                    onClick={handleSaveConfig}
                    disabled={saving || !gameName.trim()}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    {saving ? "Sauvegarde..." : "Sauvegarder la configuration"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Questions et Réponses */}
          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Questions et Réponses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <QuestionsStep
                  questions={game.questions || []}
                  setQuestions={(questions) => {
                    setGame(prev => prev ? { ...prev, questions } : null);
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}