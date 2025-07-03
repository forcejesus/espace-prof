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
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-h2-black" style={{ 
          background: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(234, 88, 12))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Tableau de Bord
        </h1>
        <p className="text-body1-medium text-akili-grey-700">Bienvenue dans votre espace éducateur</p>
      </div>
      <div className="flex items-center space-x-s16">
        <div className="relative w-96">
          <Search className="absolute left-s12 top-1/2 transform -translate-y-1/2 text-akili-grey-600 w-5 h-5" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-s40 border-akili-grey-400 focus:border-akili-purple-500 focus:ring-akili-purple-300"
          />
        </div>
        <Select value={filterSubject} onValueChange={setFilterSubject}>
          <SelectTrigger className="w-48 border-akili-grey-400">
            <SelectValue placeholder="Trier par: Plus récent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes matières</SelectItem>
            <SelectItem value="recent">Plus récent</SelectItem>
            <SelectItem value="popular">Plus populaire</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          onClick={() => onNavigate("creer-quiz")}
          className="text-white font-akili-bold px-s24"
          style={{ background: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(234, 88, 12))' }}
        >
          Créer
        </Button>
      </div>
    </div>
  );
}