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
  return <div className="w-full bg-gradient-to-br from-white via-orange-50/30 to-white border border-gray-200/60 rounded-2xl shadow-lg backdrop-blur-sm -mx-s24 -mt-s24 mb-s24">
      <div className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent">
              Tableau de Bord
            </h1>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
              Éducateur
            </div>
          </div>
          
          <div className="flex items-center space-x-s16">
            <div className="text-right text-gray-700">
              <p className="text-sm opacity-70">Aujourd'hui</p>
              <p className="text-lg font-semibold">{new Date().toLocaleDateString('fr-FR')}</p>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>;
}