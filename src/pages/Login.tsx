
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      {/* Formes décoratives */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-80"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full opacity-60"></div>
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-orange-500 mb-2">AKILI</h1>
            <p className="text-sm text-gray-600 font-medium">Espace Éducateur</p>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Good to see you again</h2>
        </div>

        {/* Carte de connexion */}
        <Card className="bg-white shadow-2xl border-0 rounded-3xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Your email
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. elon@tesla.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Your password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="e.g. ilovemangools123"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 h-12 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Sign in
              </Button>
            </form>

            <div className="mt-6 flex justify-between text-sm">
              <button className="text-blue-600 hover:text-blue-800 font-medium underline">
                Don't have an account?
              </button>
              <button className="text-blue-600 hover:text-blue-800 font-medium underline">
                Forgot password?
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer avec les services */}
        <div className="flex justify-center space-x-6 text-xs text-gray-500 mt-8">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>KWFinder</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>SERPChecker</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>SERPWatcher</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>LinkMiner</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
            <span>SiteProfiler</span>
          </div>
        </div>
      </div>
    </div>
  );
}
