import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onCreateNew: () => void;
}

export function EmptyState({ onCreateNew }: EmptyStateProps) {
  return (
    <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60">
      <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
        <Calendar className="w-12 h-12 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune planification trouvée</h3>
      <p className="text-gray-600 mb-6">Créez votre première session de jeu pour commencer</p>
      <Button 
        onClick={onCreateNew}
        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
      >
        <Plus className="w-5 h-5 mr-2" />
        Créer une planification
      </Button>
    </div>
  );
}