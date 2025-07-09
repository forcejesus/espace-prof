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
  return <div className="bg-gradient-to-br from-white via-orange-50/30 to-orange-100/50 rounded-2xl p-s32 shadow-lg border border-orange-200/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-s24">
        <div className="flex-1">
          <div className="relative">
            {/* Élément décoratif en arrière-plan */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-orange-200/30 to-orange-300/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-yellow-200/40 to-orange-200/30 rounded-full blur-lg"></div>
            
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl mb-s16 shadow-lg">
                <span className="text-3xl font-black text-white">A</span>
              </div>
              
              <h1 className="text-5xl font-black bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-s8 animate-fade-in">
                TABLEAU DE BORD
              </h1>
              
              <div className="flex items-center justify-center space-x-2 mb-s8">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <p className="text-xl font-semibold text-grey-700">
                  Éducateur
                </p>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              </div>
              
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium text-grey-600">En ligne</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-s16">
          <div className="hidden md:flex items-center space-x-s12 px-s16 py-s8 bg-white/60 rounded-xl backdrop-blur-sm border border-orange-200/50">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
            <span className="text-sm font-medium text-grey-700">Bienvenue!</span>
          </div>
          <LanguageSelector />
        </div>
      </div>
      
      {/* Séparateur décoratif */}
      <div className="flex items-center justify-center mb-s20">
        <div className="flex space-x-2">
          <div className="w-3 h-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"></div>
          <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full"></div>
          <div className="w-3 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
        </div>
      </div>
      
    </div>;
}