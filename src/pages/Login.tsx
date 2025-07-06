import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Lock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const {
    t
  } = useTranslation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: t('login.error'),
        description: t('login.fillAllFields'),
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      await authService.login({
        email,
        password
      });
      toast({
        title: t('login.successTitle'),
        description: t('login.successMessage')
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: t('login.errorTitle'),
        description: error instanceof Error ? error.message : t('login.errorMessage'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      {/* Sélecteur de langue */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector />
      </div>
      
      {/* Formes décoratives */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-80"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full opacity-60"></div>
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-2xl opacity-30 scale-110"></div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent mb-3 relative z-10 animate-fade-in-up">
              AKILI
            </h1>
            <p className="text-lg text-orange-600 font-semibold relative z-10">{t('login.subtitle')}</p>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('login.welcome')}</h2>
        </div>

        {/* Carte de connexion */}
        <Card className="bg-white shadow-2xl border-0 rounded-3xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  {t('login.emailLabel')}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input id="email" type="email" placeholder={t('login.emailPlaceholder')} value={email} onChange={e => setEmail(e.target.value)} className="pl-10 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  {t('login.passwordLabel')}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder={t('login.passwordPlaceholder')} value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 h-12 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg">
                {isLoading ? <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('login.connecting')}
                  </> : t('login.loginButton')}
              </Button>
            </form>

          </CardContent>
        </Card>

        {/* Footer avec les services */}
        
      </div>
    </div>;
}