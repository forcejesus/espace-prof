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
import { GameConfigurationStep } from "@/components/game-modifier/GameConfigurationStep";
import { QuestionsManagementStep } from "@/components/game-modifier/QuestionsManagementStep";

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
        const gameData = await gameService.getGameById(id);
        
        if (gameData) {
          setGame(gameData);
          setGameName(gameData.titre);
          setGameImage(gameData.image || "");
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
      const formData = new FormData();
      formData.append('titre', gameName);
      formData.append('_id', game._id);
      
      if (gameImage && gameImage !== game.image) {
        // Si gameImage est un fichier, l'ajouter au FormData
        if (typeof gameImage === 'string') {
          formData.append('image', gameImage);
        }
      }
      
      const updatedGame = await gameService.updateGame(game._id, formData);
      
      // Mettre à jour l'état local
      setGame(updatedGame);
      setGameImage(updatedGame.image || "");
      
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
          <TabsList className="grid w-full grid-cols-2 h-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-2 shadow-lg border border-primary/20">
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
            <GameConfigurationStep 
              game={game}
              onSave={async (gameData) => {
                const formData = new FormData();
                formData.append('titre', gameData.titre);
                formData.append('_id', game._id);
                
                if (gameData.image) {
                  formData.append('image', gameData.image);
                }
                
                const updatedGame = await gameService.updateGame(game._id, formData);
                setGame(updatedGame);
                
                toast({
                  title: "Succès",
                  description: "Configuration sauvegardée",
                });
              }}
              loading={saving}
            />
          </TabsContent>

          {/* Tab 2: Questions et Réponses */}
          <TabsContent value="questions">
            <QuestionsManagementStep 
              game={game}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}