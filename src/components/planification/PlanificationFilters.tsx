import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PlanificationFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onFilterChange: (value: string) => void;
}

export function PlanificationFilters({ 
  searchTerm, 
  onSearchChange, 
  filterStatus, 
  onFilterChange 
}: PlanificationFiltersProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtrer les planifications</h3>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5 z-10" />
          <Input
            placeholder="Rechercher par nom du jeu..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-200"
          />
        </div>
        
        <Select value={filterStatus} onValueChange={onFilterChange}>
          <SelectTrigger className="w-full md:w-48 h-12 border-2 border-gray-200 bg-white/80 backdrop-blur-sm rounded-xl">
            <Filter className="w-4 h-4 mr-2 text-orange-500" />
            <SelectValue placeholder="Filtrer par type" />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-sm border-gray-200 rounded-xl">
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="Live">Live</SelectItem>
            <SelectItem value="Examen">Examen</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}