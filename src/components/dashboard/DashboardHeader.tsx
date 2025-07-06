import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="bg-white rounded-xl p-s24 shadow-akili-sm border border-akili-grey-300">
      <div className="flex items-center justify-between mb-s20">
        <div>
          <h1 className="text-h2-bold bg-gradient-to-r from-akili-orange-500 to-akili-orange-700 bg-clip-text text-transparent">
            Dashboard Éducateur
          </h1>
          <p className="text-body1-medium text-akili-grey-600">
            Gérez vos jeux éducatifs et planifications
          </p>
        </div>
        
        <div className="flex items-center space-x-s12">
          <Button 
            variant="outline"
            size="sm"
            className="border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200"
          >
            Exporter
          </Button>
          <Button 
            onClick={() => onNavigate("creer-quiz")}
            className="bg-gradient-to-r from-akili-orange-500 to-akili-orange-600 hover:from-akili-orange-600 hover:to-akili-orange-700 text-white border-0 px-s20"
          >
            + Nouveau Jeu
          </Button>
        </div>
      </div>
      
      {/* Barre de recherche et filtres */}
      <div className="flex items-center space-x-s16">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-s12 top-1/2 transform -translate-y-1/2 text-akili-grey-500 w-4 h-4" />
          <Input
            placeholder="Rechercher dans vos jeux..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-s36 border-akili-grey-400 focus:border-akili-orange-500 focus:ring-akili-orange-500"
          />
        </div>
        
        <Select value={filterSubject} onValueChange={setFilterSubject}>
          <SelectTrigger className="w-48 border-akili-grey-400 focus:border-akili-orange-500">
            <SelectValue placeholder="Filtrer par matière" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les matières</SelectItem>
            <SelectItem value="math">Mathématiques</SelectItem>
            <SelectItem value="french">Français</SelectItem>
            <SelectItem value="science">Sciences</SelectItem>
            <SelectItem value="history">Histoire</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}