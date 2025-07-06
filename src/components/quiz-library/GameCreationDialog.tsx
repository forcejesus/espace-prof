import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

interface GameCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (view: string) => void;
}

export function GameCreationDialog({ open, onOpenChange, onNavigate }: GameCreationDialogProps) {
  const [newGameName, setNewGameName] = useState("");
  const [newGameImage, setNewGameImage] = useState("");
  const { t } = useTranslation();

  const handleCreateGame = () => {
    if (newGameName.trim()) {
      console.log("Creating game:", {
        name: newGameName,
        image: newGameImage
      });
      onOpenChange(false);
      setNewGameName("");
      setNewGameImage("");
      onNavigate("creer-quiz");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setNewGameName("");
    setNewGameImage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-akili-grey-800">{t('quizCreator.newGame')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-s16">
          <div>
            <Label htmlFor="game-name" className="text-body2-medium text-akili-grey-700">
              {t('quizCreator.gameName')} *
            </Label>
            <Input 
              id="game-name" 
              value={newGameName} 
              onChange={e => setNewGameName(e.target.value)} 
              placeholder="Ex: Jeu de Géographie" 
              className="mt-1 border-akili-grey-400 focus:border-akili-purple-500 focus:ring-akili-purple-300" 
            />
          </div>
          
          <div>
            <Label htmlFor="game-image" className="text-body2-medium text-akili-grey-700">
              {t('quizCreator.gameImage')}
            </Label>
            <Input 
              id="game-image" 
              value={newGameImage} 
              onChange={e => setNewGameImage(e.target.value)} 
              placeholder="https://example.com/image.jpg" 
              className="mt-1 border-akili-grey-400 focus:border-akili-purple-500 focus:ring-akili-purple-300" 
            />
          </div>

          {newGameImage && (
            <div className="mt-2">
              <img 
                src={newGameImage} 
                alt={t('quizCreator.preview')} 
                className="w-full h-32 object-cover rounded-akili-md border border-akili-grey-400" 
                onError={e => {
                  e.currentTarget.style.display = 'none';
                }} 
              />
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="outline" 
              onClick={handleClose} 
              className="border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200"
            >
              {t('quizCreator.cancel')}
            </Button>
            <Button 
              onClick={handleCreateGame} 
              disabled={!newGameName.trim()} 
              className="bg-akili-purple-500 hover:bg-akili-purple-700 text-white"
            >
              {t('quizCreator.create')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}