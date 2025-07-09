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
  return <div className="w-full h-[150px] bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 -mx-s24 -mt-s24 flex items-center justify-center mb-s24">
      <div className="max-w-6xl mx-auto text-center px-s24 w-full">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-4xl font-black text-white mb-s8 tracking-tight">
              TABLEAU DE BORD
            </h1>
            <p className="text-lg text-orange-100 font-light">
              Votre espace éducateur
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