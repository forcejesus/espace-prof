
import { User, Mail, School, Settings, Bell, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";

const MonComptePage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="p-s24 space-y-s24">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-xl p-s24 shadow-akili-lg">
        <div className="flex items-center space-x-s16">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-h2-bold text-white">{t('pages.monCompte.title')}</h1>
            <p className="text-body1-medium text-white/80">{t('pages.monCompte.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-s20">
        <Card className="bg-white border-0 shadow-akili-sm">
          <CardContent className="p-s20">
            <div className="flex items-center space-x-s12">
              <div className="w-12 h-12 rounded-lg bg-akili-orange-100 flex items-center justify-center">
                <School className="w-6 h-6 text-akili-orange-600" />
              </div>
              <div>
                <p className="text-h4-bold text-akili-orange-600">24</p>
                <p className="text-body3-medium text-akili-grey-600">{t('pages.monCompte.stats.gamesCreated')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-akili-sm">
          <CardContent className="p-s20">
            <div className="flex items-center space-x-s12">
              <div className="w-12 h-12 rounded-lg bg-akili-blue-100 flex items-center justify-center">
                <Bell className="w-6 h-6 text-akili-blue-600" />
              </div>
              <div>
                <p className="text-h4-bold text-akili-blue-600">156</p>
                <p className="text-body3-medium text-akili-grey-600">{t('pages.monCompte.stats.sessionsLed')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-akili-sm">
          <CardContent className="p-s20">
            <div className="flex items-center space-x-s12">
              <div className="w-12 h-12 rounded-lg bg-akili-green-100 flex items-center justify-center">
                <User className="w-6 h-6 text-akili-green-600" />
              </div>
              <div>
                <p className="text-h4-bold text-akili-green-600">432</p>
                <p className="text-body3-medium text-akili-grey-600">{t('pages.monCompte.stats.studentsReached')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-akili-sm">
          <CardContent className="p-s20">
            <div className="flex items-center space-x-s12">
              <div className="w-12 h-12 rounded-lg bg-akili-purple-100 flex items-center justify-center">
                <Shield className="w-6 h-6 text-akili-purple-500" />
              </div>
              <div>
                <p className="text-h4-bold text-akili-purple-500">4.8</p>
                <p className="text-body3-medium text-akili-grey-600">{t('pages.monCompte.stats.averageRating')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-s24">
        {/* Informations Personnelles */}
        <Card className="bg-white shadow-akili-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-orange-500" />
              <span className="text-h5-bold text-akili-grey-800">{t('pages.monCompte.personalInfo.title')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-s20">
            <div className="space-y-s8">
              <Label htmlFor="nom" className="text-body2-bold text-akili-grey-800">{t('pages.monCompte.personalInfo.fullName')}</Label>
              <Input id="nom" defaultValue="Marie Dubois" className="border-akili-grey-300 focus:border-orange-500" />
            </div>
            <div className="space-y-s8">
              <Label htmlFor="email" className="text-body2-bold text-akili-grey-800">{t('pages.monCompte.personalInfo.email')}</Label>
              <Input id="email" type="email" defaultValue="marie.dubois@ecole.fr" className="border-akili-grey-300 focus:border-orange-500" />
            </div>
            <div className="space-y-s8">
              <Label htmlFor="etablissement" className="text-body2-bold text-akili-grey-800">{t('pages.monCompte.personalInfo.institution')}</Label>
              <Input id="etablissement" defaultValue="École Primaire Saint-Martin" className="border-akili-grey-300 focus:border-orange-500" />
            </div>
            <div className="space-y-s8">
              <Label htmlFor="fonction" className="text-body2-bold text-akili-grey-800">{t('pages.monCompte.personalInfo.function')}</Label>
              <Input id="fonction" defaultValue="Professeure des écoles" className="border-akili-grey-300 focus:border-orange-500" />
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-akili-bold mt-s20">
              {t('pages.monCompte.personalInfo.update')}
            </Button>
          </CardContent>
        </Card>

        {/* Préférences */}
        <Card className="bg-white shadow-akili-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-orange-500" />
              <span className="text-h5-bold text-akili-grey-800">{t('pages.monCompte.preferences.title')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-s24">
            <div className="flex items-center justify-between py-s8">
              <div className="space-y-s4">
                <Label className="text-body2-bold text-akili-grey-800">{t('pages.monCompte.preferences.emailNotifications')}</Label>
                <p className="text-body3-medium text-akili-grey-600">{t('pages.monCompte.preferences.emailNotificationsDesc')}</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between py-s8">
              <div className="space-y-s4">
                <Label className="text-body2-bold text-akili-grey-800">{t('pages.monCompte.preferences.autoReports')}</Label>
                <p className="text-body3-medium text-akili-grey-600">{t('pages.monCompte.preferences.autoReportsDesc')}</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between py-s8">
              <div className="space-y-s4">
                <Label className="text-body2-bold text-akili-grey-800">{t('pages.monCompte.preferences.darkMode')}</Label>
                <p className="text-body3-medium text-akili-grey-600">{t('pages.monCompte.preferences.darkModeDesc')}</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Sécurité */}
        <Card className="bg-white shadow-akili-sm border-0 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-orange-500" />
              <span className="text-h5-bold text-akili-grey-800">{t('pages.monCompte.security.title')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-s16">
            <Button variant="outline" className="border-akili-grey-300 text-akili-grey-700 hover:bg-akili-grey-100 p-s16 h-auto">
              <div className="text-center">
                <div className="font-akili-bold mb-s4">{t('pages.monCompte.security.changePassword')}</div>
                <div className="text-body4-medium text-akili-grey-600">{t('pages.monCompte.security.changePasswordDesc')}</div>
              </div>
            </Button>
            <Button variant="outline" className="border-akili-grey-300 text-akili-grey-700 hover:bg-akili-grey-100 p-s16 h-auto">
              <div className="text-center">
                <div className="font-akili-bold mb-s4">{t('pages.monCompte.security.twoFactor')}</div>
                <div className="text-body4-medium text-akili-grey-600">{t('pages.monCompte.security.twoFactorDesc')}</div>
              </div>
            </Button>
            <Button variant="outline" className="border-akili-grey-300 text-akili-grey-700 hover:bg-akili-grey-100 p-s16 h-auto">
              <div className="text-center">
                <div className="font-akili-bold mb-s4">{t('pages.monCompte.security.activeSessions')}</div>
                <div className="text-body4-medium text-akili-grey-600">{t('pages.monCompte.security.activeSessionsDesc')}</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MonComptePage;
