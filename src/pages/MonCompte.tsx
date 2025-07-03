
import { User, Mail, School, Settings, Bell, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const MonComptePage = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Mon Compte</h1>
            <p className="text-orange-100">Gérez vos informations personnelles et préférences</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Informations Personnelles */}
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-orange-500" />
              <span>Informations Personnelles</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom complet</Label>
              <Input id="nom" defaultValue="Marie Dubois" className="border-orange-200 focus:border-orange-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="marie.dubois@ecole.fr" className="border-orange-200 focus:border-orange-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="etablissement">Établissement</Label>
              <Input id="etablissement" defaultValue="École Primaire Saint-Martin" className="border-orange-200 focus:border-orange-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fonction">Fonction</Label>
              <Input id="fonction" defaultValue="Professeure des écoles" className="border-orange-200 focus:border-orange-500" />
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
              Mettre à jour
            </Button>
          </CardContent>
        </Card>

        {/* Préférences */}
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-orange-500" />
              <span>Préférences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Notifications par email</Label>
                <p className="text-sm text-gray-600">Recevoir les notifications importantes</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Rapports automatiques</Label>
                <p className="text-sm text-gray-600">Rapport hebdomadaire d'activité</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Mode sombre</Label>
                <p className="text-sm text-gray-600">Interface en mode sombre</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <School className="w-5 h-5 text-orange-500" />
              <span>Mes Statistiques</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">24</div>
                <div className="text-sm text-gray-600">Jeux créés</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">156</div>
                <div className="text-sm text-gray-600">Sessions menées</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">432</div>
                <div className="text-sm text-gray-600">Apprenants touchés</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">4.8</div>
                <div className="text-sm text-gray-600">Note moyenne</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sécurité */}
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-orange-500" />
              <span>Sécurité</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-50">
              Changer le mot de passe
            </Button>
            <Button variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-50">
              Authentification à deux facteurs
            </Button>
            <Button variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-50">
              Sessions actives
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MonComptePage;
