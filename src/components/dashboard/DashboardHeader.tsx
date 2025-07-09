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
  return <div className="w-full min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 -mx-s24 -mt-s24 flex items-center justify-center">
      <div className="max-w-6xl mx-auto text-center px-s24">
        <div className="mb-s32">
          <h1 className="text-8xl font-black text-white mb-s16 tracking-tight">
            TABLEAU DE BORD
          </h1>
          <p className="text-2xl text-orange-100 mb-s24 font-light">
            Votre espace éducateur
          </p>
          <div className="text-orange-200 text-lg">
            {new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
        
        <div className="absolute top-s24 right-s24">
          <LanguageSelector />
        </div>
      </div>
    </div>;
}