
import { useState } from "react";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { StatsCards } from "./dashboard/StatsCards";
import { FoldersSection } from "./dashboard/FoldersSection";
import { QuickActions } from "./dashboard/QuickActions";
import { GamesSection } from "./dashboard/GamesSection";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
      <div className="max-w-7xl mx-auto px-s24 py-s32 space-y-32">
        <DashboardHeader 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterSubject={filterSubject}
          setFilterSubject={setFilterSubject}
          onNavigate={onNavigate}
        />
        
        <StatsCards />
        
        <FoldersSection />
        
        <QuickActions onNavigate={onNavigate} />
        
        <GamesSection 
          onNavigate={onNavigate}
          searchTerm={searchTerm}
          filterSubject={filterSubject}
        />
      </div>
    </div>
  );
}
