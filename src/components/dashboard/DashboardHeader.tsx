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
      <div className="flex items-center">
        <Button 
          onClick={() => onNavigate("creer-quiz")}
          className="text-white font-akili-bold px-s24"
          style={{ background: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(234, 88, 12))' }}
        >
          Créer un nouveau jeu
        </Button>
      </div>
    </div>
  );
}