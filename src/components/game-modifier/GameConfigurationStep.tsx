import { useState } from "react";
import { FileImage, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Game } from "@/services/types";

interface GameConfigurationStepProps {
  game: Game;
  onSave: (gameData: { titre: string; image?: string | File }) => Promise<void>;
  loading?: boolean;
}

export function GameConfigurationStep({ game, onSave, loading }: GameConfigurationStepProps) {
  const [gameName, setGameName] = useState(game.titre);
  const [gameImage, setGameImage] = useState<string | File>(game.image || "");
  const [previewImage, setPreviewImage] = useState<string>(game.image || "");
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erreur",
        description: "Le fichier est trop volumineux (max 5MB)",
        variant: "destructive"
      });
      return;
    }

    // Créer un aperçu
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setGameImage(file);
  };

  const handleSave = async () => {
    if (!gameName.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre du jeu est requis",
        variant: "destructive"
      });
      return;
    }

    try {
      await onSave({
        titre: gameName,
        image: gameImage !== game.image ? gameImage : undefined
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    }
  };

  const getImageUrl = (imageSource: string | null) => {
    if (!imageSource) return null;
    
    if (imageSource.startsWith('http')) {
      return imageSource;
    }
    
    if (imageSource.startsWith('public/')) {
      return `http://localhost:3000/${imageSource.replace('public/', '')}`;
    }
    
    return imageSource;
  };

  return (
    <Card className="shadow-sm border-orange-200">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
        <CardTitle className="flex items-center gap-2 text-xl text-orange-800">
          Configuration du jeu
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        {/* Nom du jeu */}
        <div className="space-y-3">
          <Label htmlFor="game-name" className="text-base font-semibold text-gray-700">
            Nom du jeu *
          </Label>
          <Input
            id="game-name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value.slice(0, 50))}
            placeholder="Entrez le nom du jeu (max 50 caractères)"
            className="text-lg py-3 border-orange-200 focus:border-orange-500 focus:ring-orange-200"
            maxLength={50}
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Choisissez un nom accrocheur et descriptif pour votre jeu
            </p>
            <span className="text-xs text-gray-400">{gameName.length}/50</span>
          </div>
        </div>

        {/* Image du jeu */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-gray-700">Image du jeu</Label>
          
          {/* Image actuelle */}
          <div className="space-y-4">
            {getImageUrl(game.image) ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Image actuelle :</p>
                <div className="w-full max-w-2xl h-64 rounded-xl overflow-hidden border-2 border-orange-200 shadow-md">
                  <img
                    src={getImageUrl(game.image)!}
                    alt="Image actuelle du jeu"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/640x256/f97316/ffffff?text=AKILI+GAME";
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full max-w-2xl h-64 rounded-xl border-2 border-dashed border-orange-300 flex flex-col items-center justify-center bg-orange-50">
                <FileImage className="w-12 h-12 text-orange-400 mb-2" />
                <p className="text-orange-600 font-medium">Ce jeu n'a pas d'image</p>
                <p className="text-sm text-orange-500">Ajoutez une image ci-dessous</p>
              </div>
            )}
          </div>

          {/* Upload de nouvelle image */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Modifier l'image</Label>
            <div className="flex items-center justify-center w-full">
              <label 
                htmlFor="game-image" 
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-orange-300 border-dashed rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-orange-500" />
                  <p className="mb-2 text-sm text-orange-700">
                    <span className="font-medium">Cliquez pour télécharger</span> ou glissez-déposez
                  </p>
                  <p className="text-xs text-orange-600">PNG, JPG, GIF (max 5MB)</p>
                </div>
                <input 
                  id="game-image" 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          {/* Preview de la nouvelle image */}
          {previewImage && previewImage !== game.image && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Aperçu de la nouvelle image :</Label>
              <div className="w-full max-w-2xl h-64 rounded-xl overflow-hidden border-2 border-orange-400 shadow-md relative">
                <img
                  src={previewImage}
                  alt="Aperçu nouvelle image"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/320x192/ef4444/ffffff?text=Image+invalide";
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPreviewImage(game.image || "");
                    setGameImage(game.image || "");
                  }}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300 rounded-sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-end pt-6 border-t border-orange-100">
          <Button 
            onClick={handleSave}
            disabled={loading || !gameName.trim()}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white"
          >
            {loading ? "Sauvegarde..." : "Sauvegarder la configuration"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}