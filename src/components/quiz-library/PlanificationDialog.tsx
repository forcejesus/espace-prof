import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Game } from "@/services";
import { planificationService } from "@/services/planificationService";

interface PlanificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedGame: Game | null;
  onError: (error: string) => void;
}

export function PlanificationDialog({ open, onOpenChange, selectedGame, onError }: PlanificationDialogProps) {
  const [planificationData, setPlanificationData] = useState({
    date_debut: "",
    date_fin: "",
    heure_debut: "",
    heure_fin: "",
    limite_participant: 100,
    type: "live"
  });

  const handleCreatePlanification = async () => {
    if (!selectedGame) return;
    
    try {
      await planificationService.createPlanification({
        statut: "en attente",
        date_debut: planificationData.date_debut,
        date_fin: planificationData.date_fin,
        heure_debut: planificationData.heure_debut,
        heure_fin: planificationData.heure_fin,
        limite_participant: planificationData.limite_participant,
        type: planificationData.type as 'live' | 'attribuer',
        jeu: selectedGame._id
      });
      
      handleClose();
    } catch (err) {
      console.error('Erreur lors de la création de la planification:', err);
      onError(err instanceof Error ? err.message : 'Erreur lors de la planification');
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setPlanificationData({
      date_debut: "",
      date_fin: "",
      heure_debut: "",
      heure_fin: "",
      limite_participant: 100,
      type: "live"
    });
  };

  const isFormValid = planificationData.date_debut && 
                     planificationData.date_fin && 
                     planificationData.heure_debut && 
                     planificationData.heure_fin;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-akili-grey-800">
            Planifier le jeu: {selectedGame?.titre}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-s16">
          <div className="grid grid-cols-2 gap-s12">
            <div>
              <Label htmlFor="date-debut" className="text-body2-medium text-akili-grey-700">
                Date début *
              </Label>
              <Input 
                id="date-debut" 
                type="date" 
                value={planificationData.date_debut} 
                onChange={e => setPlanificationData(prev => ({
                  ...prev,
                  date_debut: e.target.value
                }))} 
                className="mt-1 border-akili-grey-400 focus:border-akili-purple-500" 
              />
            </div>
            <div>
              <Label htmlFor="date-fin" className="text-body2-medium text-akili-grey-700">
                Date fin *
              </Label>
              <Input 
                id="date-fin" 
                type="date" 
                value={planificationData.date_fin} 
                onChange={e => setPlanificationData(prev => ({
                  ...prev,
                  date_fin: e.target.value
                }))} 
                min={planificationData.date_debut} 
                className="mt-1 border-akili-grey-400 focus:border-akili-purple-500" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-s12">
            <div>
              <Label htmlFor="heure-debut" className="text-body2-medium text-akili-grey-700">
                Heure début *
              </Label>
              <Input 
                id="heure-debut" 
                type="time" 
                value={planificationData.heure_debut} 
                onChange={e => setPlanificationData(prev => ({
                  ...prev,
                  heure_debut: e.target.value
                }))} 
                className="mt-1 border-akili-grey-400 focus:border-akili-purple-500" 
              />
            </div>
            <div>
              <Label htmlFor="heure-fin" className="text-body2-medium text-akili-grey-700">
                Heure fin *
              </Label>
              <Input 
                id="heure-fin" 
                type="time" 
                value={planificationData.heure_fin} 
                onChange={e => setPlanificationData(prev => ({
                  ...prev,
                  heure_fin: e.target.value
                }))} 
                className="mt-1 border-akili-grey-400 focus:border-akili-purple-500" 
              />
            </div>
          </div>

          <div>
            <Label htmlFor="limite-participant" className="text-body2-medium text-akili-grey-700">
              Limite participants *
            </Label>
            <Input 
              id="limite-participant" 
              type="number" 
              min="1" 
              value={planificationData.limite_participant} 
              onChange={e => setPlanificationData(prev => ({
                ...prev,
                limite_participant: Number(e.target.value)
              }))} 
              className="mt-1 border-akili-grey-400 focus:border-akili-purple-500" 
            />
          </div>

          <div>
            <Label htmlFor="type" className="text-body2-medium text-akili-grey-700">
              Type de planification *
            </Label>
            <Select 
              value={planificationData.type} 
              onValueChange={value => setPlanificationData(prev => ({
                ...prev,
                type: value
              }))}
            >
              <SelectTrigger className="mt-1 border-akili-grey-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="attribuer">Attribuer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="outline" 
              onClick={handleClose} 
              className="border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200"
            >
              Annuler
            </Button>
            <Button 
              onClick={handleCreatePlanification} 
              disabled={!isFormValid} 
              className="bg-akili-purple-500 hover:bg-akili-purple-700 text-white"
            >
              Planifier
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}