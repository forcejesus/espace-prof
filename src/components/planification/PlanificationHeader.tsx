import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlanificationHeaderProps {
  onCreateNew: () => void;
}

export function PlanificationHeader({ onCreateNew }: PlanificationHeaderProps) {
  return (
    <div className="w-full bg-gradient-to-br from-white via-orange-50/30 to-white border border-gray-200/60 rounded-2xl shadow-lg backdrop-blur-sm">
      <div className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent">
                  Planifications des jeux
                </h1>
                <p className="text-lg text-gray-600 mt-1">Organisez et gérez vos planifications de jeux éducatifs</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={onCreateNew}
            className="h-12 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle Planification
          </Button>
        </div>
      </div>
    </div>
  );
}