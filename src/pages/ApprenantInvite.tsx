import { useState } from "react";
import { UserPlus, User, Search, Filter, Plus, Mail, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

const ApprenantInvitePage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const apprenantsInvites = [
    {
      id: 1,
      nom: "Sophie Ndongo",
      email: "sophie.ndongo@gmail.com",
      invitePar: "Marie Dubois",
      statut: "Actif",
      derniereActivite: "Il y a 2 heures",
      scoreMoyen: 4.1,
      dateInvitation: "15 Nov 2024"
    },
    {
      id: 2,
      nom: "Paul Moukoko",
      email: "paul.moukoko@yahoo.fr",
      invitePar: "Jean Martin",
      statut: "En attente",
      derniereActivite: "Jamais connecté",
      scoreMoyen: 0,
      dateInvitation: "12 Nov 2024"
    },
    {
      id: 3,
      nom: "Grace Mambou",
      email: "grace.mambou@outlook.com",
      invitePar: "Marie Dubois",
      statut: "Actif",
      derniereActivite: "Il y a 1 jour",
      scoreMoyen: 3.9,
      dateInvitation: "10 Nov 2024"
    }
  ];

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "Actif":
        return "bg-akili-green-100 text-akili-green-700";
      case "En attente":
        return "bg-akili-orange-100 text-akili-orange-700";
      case "Inactif":
        return "bg-akili-grey-100 text-akili-grey-700";
      default:
        return "bg-akili-grey-100 text-akili-grey-700";
    }
  };

  return (
    <div className="p-s24 space-y-s24">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-xl p-s24 shadow-akili-lg">
        <div className="flex items-center space-x-s16">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-h2-bold text-white">{t('pages.apprenantInvite.title')}</h1>
            <p className="text-body1-medium text-white/80">{t('pages.apprenantInvite.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-s20">
        <Card className="bg-white border-0 shadow-akili-sm">
          <CardContent className="p-s20">
            <div className="flex items-center space-x-s12">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-h4-bold text-orange-600">156</p>
                <p className="text-body3-medium text-akili-grey-600">Total invités</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-akili-sm">
          <CardContent className="p-s20">
            <div className="flex items-center space-x-s12">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-h4-bold text-green-600">124</p>
                <p className="text-body3-medium text-akili-grey-600">Actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-akili-sm">
          <CardContent className="p-s20">
            <div className="flex items-center space-x-s12">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-h4-bold text-yellow-600">32</p>
                <p className="text-body3-medium text-akili-grey-600">En attente</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-akili-sm">
          <CardContent className="p-s20">
            <div className="flex items-center space-x-s12">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-h4-bold text-blue-600">4.2</p>
                <p className="text-body3-medium text-akili-grey-600">Score moyen</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions et Filtres */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-s16">
        <div className="flex items-center space-x-s16 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-akili-grey-400 w-4 h-4" />
            <Input
              placeholder={t('pages.apprenantInvite.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-akili-grey-300 focus:border-orange-500"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40 border-akili-grey-300 focus:border-orange-500">
              <Filter className="w-4 h-4 mr-2 text-orange-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="Actif">Actif</SelectItem>
              <SelectItem value="En attente">En attente</SelectItem>
              <SelectItem value="Inactif">Inactif</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white shadow-akili-md">
          <UserPlus className="w-4 h-4 mr-2" />
          {t('pages.apprenantInvite.newInvitation')}
        </Button>
      </div>

      {/* Liste des Apprenants Invités */}
      <div className="space-y-s12">
        {apprenantsInvites.map((apprenant) => (
          <Card key={apprenant.id} className="border-0 shadow-akili-sm hover:shadow-akili-md transition-all duration-300">
            <CardContent className="p-s20">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-s16 md:space-y-0">
                <div className="flex items-center space-x-s16">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-akili-bold text-akili-grey-800 text-body1-bold">{apprenant.nom}</h3>
                    <p className="text-body3-medium text-akili-grey-600">{apprenant.email}</p>
                    <p className="text-body4-medium text-akili-grey-500">Invité par {apprenant.invitePar}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-s16">
                  <div className="text-center">
                    <div className="text-h5-bold text-orange-600">
                      {apprenant.scoreMoyen > 0 ? `${apprenant.scoreMoyen}/5` : '-'}
                    </div>
                    <div className="text-body4-medium text-akili-grey-600">Score moyen</div>
                  </div>
                  <Badge className={getStatutColor(apprenant.statut)}>
                    {apprenant.statut}
                  </Badge>
                  <div className="text-right">
                    <p className="text-body3-medium text-akili-grey-600">{apprenant.derniereActivite}</p>
                    <p className="text-body4-medium text-akili-grey-500">Invité le {apprenant.dateInvitation}</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                    Voir détails
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApprenantInvitePage;