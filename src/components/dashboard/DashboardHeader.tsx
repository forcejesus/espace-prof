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
  return <div className="bg-white rounded-xl p-s24 shadow-akili-sm border border-akili-grey-300">
      <div className="flex items-center justify-between mb-s20">
        <div>
          <div className="text-center">
            <h1 className="text-5xl font-black bg-gradient-to-r from-akili-orange-500 to-akili-orange-700 bg-clip-text text-transparent mb-2">
              TABLEAU DE BORD
            </h1>
            <p className="text-lg font-medium text-akili-grey-600">
              Éducateur
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <LanguageSelector />
        </div>
      </div>
      
      {/* Barre de recherche et filtres */}
      
    </div>;
}