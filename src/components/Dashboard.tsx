import { useState } from "react";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { StatsCards } from "./dashboard/StatsCards";
import { QuickActions } from "./dashboard/QuickActions";
import { CompletedSessions } from "./dashboard/CompletedSessions";
import { Analytics } from "./dashboard/Analytics";
import { RecentGames } from "./dashboard/RecentGames";
import { useTranslation } from "react-i18next";
interface Game {
  _id: string;
  titre: string;
  image: string | null;
  createdBy: {
    _id: string;
    nom: string;
    prenom: string;
    matricule: string;
    genre: string;
    statut: string;
    phone: string;
    email: string;
    adresse: string;
    role: string;
    pays?: {
      _id: string;
      libelle: string;
    };
  } | null;
  ecole: {
    _id: string;
    libelle: string;
    ville: string;
    telephone: string;
  } | null;
  date: string;
}
interface DashboardProps {
  onNavigate: (view: string) => void;
  games?: Game[];
}
export function Dashboard({
  onNavigate,
  games = []
}: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");

  // Données par défaut si aucune donnée n'est fournie
  const defaultGames: Game[] = [{
    _id: "1",
    titre: "Jeu de mathématiques avancées",
    image: null,
    createdBy: {
      _id: "1",
      nom: "Dupont",
      prenom: "Marie",
      matricule: "AKILI-P00001",
      genre: "Féminin",
      statut: "actif",
      phone: "065001122",
      email: "marie.dupont@akili.com",
      adresse: "123 Rue de l'Education",
      role: "enseignant"
    },
    ecole: {
      _id: "1",
      libelle: "École Primaire Centrale",
      ville: "Brazzaville",
      telephone: "065001144"
    },
    date: new Date(Date.now() - 86400000).toISOString()
  }, {
    _id: "2",
    titre: "Quiz d'histoire du Congo",
    image: null,
    createdBy: {
      _id: "2",
      nom: "Martin",
      prenom: "Jean",
      matricule: "AKILI-P00002",
      genre: "Masculin",
      statut: "actif",
      phone: "065001123",
      email: "jean.martin@akili.com",
      adresse: "456 Avenue de la Paix",
      role: "enseignant"
    },
    ecole: {
      _id: "2",
      libelle: "Lycée Moderne",
      ville: "Pointe-Noire",
      telephone: "065001145"
    },
    date: new Date(Date.now() - 172800000).toISOString()
  }];
  const gamesToDisplay = games.length > 0 ? games : defaultGames;
  return <div className="p-s24 space-y-s24">
      <DashboardHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterSubject={filterSubject} setFilterSubject={setFilterSubject} onNavigate={onNavigate} />
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-s24">
        <QuickActions onNavigate={onNavigate} />
        <CompletedSessions />
      </div>
      
    </div>;
}