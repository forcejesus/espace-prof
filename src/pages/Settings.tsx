
import { Settings, User, Bell, Shield, Palette, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Paramètres</h1>
        <p className="text-slate-600">Configurez vos préférences et paramètres</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <User className="w-5 h-5 mr-2 text-indigo-500" />
              Informations Personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" defaultValue="Mme Dubois" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="marie.dubois@ecole.fr" />
            </div>
            <div>
              <Label htmlFor="school">Établissement</Label>
              <Input id="school" defaultValue="Collège Jean Moulin" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <Bell className="w-5 h-5 mr-2 text-orange-500" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifs">Notifications par email</Label>
              <Switch id="email-notifs" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="quiz-notifs">Nouvelles sessions de quiz</Label>
              <Switch id="quiz-notifs" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="results-notifs">Résultats automatiques</Label>
              <Switch id="results-notifs" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
          Sauvegarder les modifications
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
