
import { User, Mail, School, Settings, Bell, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const MonComptePage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
      <div className="max-w-7xl mx-auto px-s24 py-s32 space-y-32">
        {/* Header */}
        <div>
          <h1 className="text-h2-black text-akili-purple-500 mb-s8">Mon Compte</h1>
          <p className="text-body1-medium text-akili-grey-700">Gérez vos informations personnelles et préférences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-s24">
          {/* Informations Personnelles */}
          <Card className="bg-white shadow-akili-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-akili-purple-500" />
                <span className="text-h5-bold text-akili-grey-800">Informations Personnelles</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-s16">
              <div className="space-y-s8">
                <Label htmlFor="nom" className="text-body2-bold text-akili-grey-800">Nom complet</Label>
                <Input id="nom" defaultValue="Marie Dubois" className="border-akili-grey-400 focus:border-akili-purple-500" />
              </div>
              <div className="space-y-s8">
                <Label htmlFor="email" className="text-body2-bold text-akili-grey-800">Email</Label>
                <Input id="email" type="email" defaultValue="marie.dubois@ecole.fr" className="border-akili-grey-400 focus:border-akili-purple-500" />
              </div>
              <div className="space-y-s8">
                <Label htmlFor="etablissement" className="text-body2-bold text-akili-grey-800">Établissement</Label>
                <Input id="etablissement" defaultValue="École Primaire Saint-Martin" className="border-akili-grey-400 focus:border-akili-purple-500" />
              </div>
              <div className="space-y-s8">
                <Label htmlFor="fonction" className="text-body2-bold text-akili-grey-800">Fonction</Label>
                <Input id="fonction" defaultValue="Professeure des écoles" className="border-akili-grey-400 focus:border-akili-purple-500" />
              </div>
              <Button className="bg-akili-purple-500 hover:bg-akili-purple-700 text-white font-akili-bold mt-s16">
                Mettre à jour
              </Button>
            </CardContent>
          </Card>

          {/* Préférences */}
          <Card className="bg-white shadow-akili-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-akili-purple-500" />
                <span className="text-h5-bold text-akili-grey-800">Préférences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-s24">
              <div className="flex items-center justify-between">
                <div className="space-y-s4">
                  <Label className="text-body2-bold text-akili-grey-800">Notifications par email</Label>
                  <p className="text-body3-medium text-akili-grey-600">Recevoir les notifications importantes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-s4">
                  <Label className="text-body2-bold text-akili-grey-800">Rapports automatiques</Label>
                  <p className="text-body3-medium text-akili-grey-600">Rapport hebdomadaire d'activité</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-s4">
                  <Label className="text-body2-bold text-akili-grey-800">Mode sombre</Label>
                  <p className="text-body3-medium text-akili-grey-600">Interface en mode sombre</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <Card className="bg-white shadow-akili-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <School className="w-5 h-5 text-akili-purple-500" />
                <span className="text-h5-bold text-akili-grey-800">Mes Statistiques</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-s16">
              <div className="grid grid-cols-2 gap-s16">
                <div className="text-center p-s16 bg-akili-purple-500 rounded-akili-lg text-white">
                  <div className="text-h3-black">24</div>
                  <div className="text-body3-medium">Jeux créés</div>
                </div>
                <div className="text-center p-s16 bg-akili-blue-500 rounded-akili-lg text-white">
                  <div className="text-h3-black">156</div>
                  <div className="text-body3-medium">Sessions menées</div>
                </div>
                <div className="text-center p-s16 bg-akili-green-500 rounded-akili-lg text-white">
                  <div className="text-h3-black">432</div>
                  <div className="text-body3-medium">Apprenants touchés</div>
                </div>
                <div className="text-center p-s16 bg-akili-teal-500 rounded-akili-lg text-white">
                  <div className="text-h3-black">4.8</div>
                  <div className="text-body3-medium">Note moyenne</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card className="bg-white shadow-akili-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-akili-purple-500" />
                <span className="text-h5-bold text-akili-grey-800">Sécurité</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-s12">
              <Button variant="outline" className="w-full border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200">
                Changer le mot de passe
              </Button>
              <Button variant="outline" className="w-full border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200">
                Authentification à deux facteurs
              </Button>
              <Button variant="outline" className="w-full border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200">
                Sessions actives
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MonComptePage;
