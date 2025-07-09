
import { useState } from "react";
import { Users, UserPlus, User, Search, Filter, Plus, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

const GroupeApprenantPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const groupes = [
    {
      id: 1,
      nom: "Classe 3èmeA",
      description: "Mathématiques niveau avancé",
      membres: 25,
      actif: true,
      derniere_activite: "Il y a 2 jours"
    },
    {
      id: 2,
      nom: "Groupe Sciences",
      description: "Groupe d'approfondissement sciences",
      membres: 18,
      actif: true,
      derniere_activite: "Il y a 1 jour"
    },
    {
      id: 3,
      nom: "Club Histoire",
      description: "Passionnés d'histoire",
      membres: 12,
      actif: false,
      derniere_activite: "Il y a 1 semaine"
    }
  ];

  const apprenants = [
    {
      id: 1,
      nom: "Amina Diallo",
      email: "amina.diallo@ecole.fr",
      classe: "3èmeA",
      niveau: "Avancé",
      derniere_connexion: "Il y a 1 heure",
      score_moyen: 4.2
    },
    {
      id: 2,
      nom: "Kwame Asante",
      email: "kwame.asante@ecole.fr",
      classe: "3èmeB",
      niveau: "Intermédiaire",
      derniere_connexion: "Il y a 3 heures",
      score_moyen: 3.8
    },
    {
      id: 3,
      nom: "Fatou Ndiaye",
      email: "fatou.ndiaye@ecole.fr",
      classe: "3èmeA",
      niveau: "Expert",
      derniere_connexion: "Il y a 30 min",
      score_moyen: 4.7
    }
  ];

  const getNiveauColor = (niveau: string) => {
    switch (niveau) {
      case "Expert":
        return "bg-purple-100 text-purple-800";
      case "Avancé":
        return "bg-green-100 text-green-800";
      case "Intermédiaire":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-s24 space-y-s24">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-xl p-s24 shadow-akili-lg">
        <div className="flex items-center space-x-s16">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-h2-bold text-white">{t('pages.groupeApprenant.title')}</h1>
            <p className="text-body1-medium text-white/80">{t('pages.groupeApprenant.subtitle')}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="groupes" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-orange-50">
          <TabsTrigger value="groupes" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Groupes
          </TabsTrigger>
          <TabsTrigger value="apprenants" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Apprenants
          </TabsTrigger>
        </TabsList>

        <TabsContent value="groupes" className="space-y-6">
          {/* Actions et Filtres pour Groupes */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher un groupe..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Groupe
            </Button>
          </div>

          {/* Liste des Groupes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupes.map((groupe) => (
              <Card key={groupe.id} className="border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900">
                        {groupe.nom}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{groupe.description}</p>
                    </div>
                    <Badge className={groupe.actif ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {groupe.actif ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span>{groupe.membres} membres</span>
                    </div>
                    <span className="text-gray-500">{groupe.derniere_activite}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50 flex-1">
                      Modifier
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white flex-1">
                      Voir détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="apprenants" className="space-y-6">
          {/* Actions et Filtres pour Apprenants */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher un apprenant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40 border-orange-200 focus:border-orange-500">
                  <Filter className="w-4 h-4 mr-2 text-orange-500" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous niveaux</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                  <SelectItem value="Avancé">Avancé</SelectItem>
                  <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white shadow-lg">
              <UserPlus className="w-4 h-4 mr-2" />
              Nouvel Apprenant
            </Button>
          </div>

          {/* Liste des Apprenants */}
          <div className="space-y-4">
            {apprenants.map((apprenant) => (
              <Card key={apprenant.id} className="border-2 border-orange-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{apprenant.nom}</h3>
                        <p className="text-sm text-gray-600">{apprenant.email}</p>
                        <p className="text-sm text-gray-600">{apprenant.classe}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{apprenant.score_moyen}/5</div>
                        <div className="text-xs text-gray-600">Score moyen</div>
                      </div>
                      <Badge className={getNiveauColor(apprenant.niveau)}>
                        {apprenant.niveau}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{apprenant.derniere_connexion}</p>
                        <Button variant="outline" size="sm" className="mt-2 border-orange-300 text-orange-700 hover:bg-orange-50">
                          Voir profil
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupeApprenantPage;
