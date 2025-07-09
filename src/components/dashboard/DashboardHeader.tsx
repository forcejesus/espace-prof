import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
interface DashboardHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterSubject: string;
  setFilterSubject: (subject: string) => void;
  onNavigate: (view: string) => void;
}
export function DashboardHeader({
  searchTerm,
  setSearchTerm,
  filterSubject,
  setFilterSubject,
  onNavigate
}: DashboardHeaderProps) {
  return <div className="w-full bg-gradient-to-r from-orange-500 to-orange-700 p-s32 -mx-s24 -mt-s24 mb-s24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-s8">
              Tableau de Bord
            </h1>
            <p className="text-orange-100 text-lg">
              Bienvenue dans votre espace éducateur
            </p>
          </div>
          
          <div className="flex items-center space-x-s16">
            <div className="text-right text-white">
              <p className="text-sm opacity-90">Aujourd'hui</p>
              <p className="text-lg font-semibold">{new Date().toLocaleDateString('fr-FR')}</p>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>;
}