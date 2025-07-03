
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

        {/* Statistiques en premier et en valeur */}
        <Card className="bg-white shadow-akili-lg border-0 mb-s32 animate-fade-in-up">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <School className="w-6 h-6 text-white" />
              <span className="text-h4-bold text-white">Mes Statistiques</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-s32">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-s24">
              <div className="text-center p-s32 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white shadow-2xl hover:scale-110 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl font-black mb-s12 transform group-hover:scale-110 transition-transform duration-300">24</div>
                  <div className="text-h5-bold uppercase tracking-wider">Jeux créés</div>
                </div>
              </div>
              <div className="text-center p-s32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white shadow-2xl hover:scale-110 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl font-black mb-s12 transform group-hover:scale-110 transition-transform duration-300">156</div>
                  <div className="text-h5-bold uppercase tracking-wider">Sessions menées</div>
                </div>
              </div>
              <div className="text-center p-s32 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl text-white shadow-2xl hover:scale-110 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl font-black mb-s12 transform group-hover:scale-110 transition-transform duration-300">432</div>
                  <div className="text-h5-bold uppercase tracking-wider">Apprenants touchés</div>
                </div>
              </div>
              <div className="text-center p-s32 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl text-white shadow-2xl hover:scale-110 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl font-black mb-s12 transform group-hover:scale-110 transition-transform duration-300">4.8</div>
                  <div className="text-h5-bold uppercase tracking-wider">Note moyenne</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-s24">
          {/* Informations Personnelles */}
          <Card className="bg-white shadow-akili-sm border-0 animate-slide-in-left animate-delay-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-akili-purple-500" />
                <span className="text-h5-bold text-akili-grey-800">Informations Personnelles</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-s20">
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
              <Button className="bg-akili-purple-500 hover:bg-akili-purple-700 text-white font-akili-bold mt-s20">
                Mettre à jour
              </Button>
            </CardContent>
          </Card>

          {/* Préférences */}
          <Card className="bg-white shadow-akili-sm border-0 animate-slide-in-left animate-delay-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-akili-purple-500" />
                <span className="text-h5-bold text-akili-grey-800">Préférences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-s24">
              <div className="flex items-center justify-between py-s8">
                <div className="space-y-s4">
                  <Label className="text-body2-bold text-akili-grey-800">Notifications par email</Label>
                  <p className="text-body3-medium text-akili-grey-600">Recevoir les notifications importantes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-s8">
                <div className="space-y-s4">
                  <Label className="text-body2-bold text-akili-grey-800">Rapports automatiques</Label>
                  <p className="text-body3-medium text-akili-grey-600">Rapport hebdomadaire d'activité</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-s8">
                <div className="space-y-s4">
                  <Label className="text-body2-bold text-akili-grey-800">Mode sombre</Label>
                  <p className="text-body3-medium text-akili-grey-600">Interface en mode sombre</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card className="bg-white shadow-akili-sm border-0 lg:col-span-2 animate-fade-in-up animate-delay-400">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-akili-purple-500" />
                <span className="text-h5-bold text-akili-grey-800">Sécurité</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-s16">
              <Button variant="outline" className="border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200 p-s16 h-auto">
                <div className="text-center">
                  <div className="font-akili-bold mb-s4">Changer le mot de passe</div>
                  <div className="text-body4-medium text-akili-grey-600">Mettre à jour votre sécurité</div>
                </div>
              </Button>
              <Button variant="outline" className="border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200 p-s16 h-auto">
                <div className="text-center">
                  <div className="font-akili-bold mb-s4">Authentification 2FA</div>
                  <div className="text-body4-medium text-akili-grey-600">Sécurité renforcée</div>
                </div>
              </Button>
              <Button variant="outline" className="border-akili-grey-400 text-akili-grey-700 hover:bg-akili-grey-200 p-s16 h-auto">
                <div className="text-center">
                  <div className="font-akili-bold mb-s4">Sessions actives</div>
                  <div className="text-body4-medium text-akili-grey-600">Gérer vos connexions</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MonComptePage;
