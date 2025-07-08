import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, MessageSquare, Upload, Image as ImageIcon } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Header mis en évidence */}
      <div className="w-full bg-card border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/mes-jeux")}
              className="flex items-center gap-2 hover:bg-muted"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Modification du jeu</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs mis en évidence */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-12 bg-muted/50 rounded-xl p-1">
            <TabsTrigger 
              value="config" 
              className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
            >
              <Settings className="w-4 h-4" />
              Configuration du jeu
            </TabsTrigger>
            <TabsTrigger 
              value="questions" 
              className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Questions et Réponses
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Configuration */}
          <TabsContent value="config">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Settings className="w-5 h-5 text-primary" />
                  Configuration du jeu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Nom du jeu avec plus de valeur */}
                <div className="space-y-3">
                  <Label htmlFor="game-name" className="text-base font-semibold">Nom du jeu</Label>
                  <Input
                    id="game-name"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    placeholder="Entrez le nom du jeu"
                    className="text-lg py-3"
                  />
                  <p className="text-sm text-muted-foreground">
                    Choisissez un nom accrocheur et descriptif pour votre jeu
                  </p>
                </div>

                {/* Image du jeu avec preview amélioré */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Image du jeu</Label>
                  
                  {/* Image actuelle ou message si pas d'image */}
                  <div className="space-y-4">
                    {game.image ? (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Image actuelle :</p>
                        <div className="w-80 h-48 rounded-xl overflow-hidden border-2 border-border shadow-md">
                          <img
                            src={game.image.startsWith('http') ? game.image : `http://localhost:3000/${game.image.replace('public/', '')}`}
                            alt="Image actuelle du jeu"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/320x192/f97316/ffffff?text=AKILI+GAME";
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="w-80 h-48 rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center bg-muted/20">
                        <ImageIcon className="w-12 h-12 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground font-medium">Ce jeu n'a pas d'image</p>
                        <p className="text-sm text-muted-foreground/70">Ajoutez une image ci-dessous</p>
                      </div>
                    )}
                  </div>

                  {/* Input pour nouvelle image */}
                  <div className="space-y-3">
                    <Label htmlFor="game-image" className="text-sm font-medium">Modifier l'image (URL)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="game-image"
                        value={gameImage}
                        onChange={(e) => setGameImage(e.target.value)}
                        placeholder="URL de la nouvelle image"
                        className="flex-1"
                      />
                      <Button variant="outline" size="icon">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Preview de la nouvelle image */}
                  {gameImage && gameImage !== game.image && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Aperçu de la nouvelle image :</Label>
                      <div className="w-80 h-48 rounded-xl overflow-hidden border-2 border-primary/20 shadow-md">
                        <img
                          src={gameImage.startsWith('http') ? gameImage : `http://localhost:3000/${gameImage.replace('public/', '')}`}
                          alt="Aperçu nouvelle image"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/320x192/ef4444/ffffff?text=Image+invalide";
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bouton de sauvegarde */}
                <div className="flex justify-end pt-6 border-t">
                  <Button 
                    onClick={handleSaveConfig}
                    disabled={saving || !gameName.trim()}
                    className="px-8 py-3"
                  >
                    {saving ? "Sauvegarde..." : "Sauvegarder la configuration"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Questions et Réponses */}
          <TabsContent value="questions">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Questions et Réponses
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {game && (
                  <QuestionsStep
                    questions={game.questions || []}
                    setQuestions={(questions) => {
                      setGame(prev => prev ? { ...prev, questions } : null);
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}