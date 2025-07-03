
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, GamepadIcon, Calendar, User, Menu, X, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      title: "Tableau de Bord",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Mes Jeux",
      href: "/mes-jeux",
      icon: GamepadIcon,
    },
    {
      title: "Planification",
      href: "/planification",
      icon: Calendar,
    },
    {
      title: "Mon Compte",
      href: "/mon-compte",
      icon: User,
    },
  ];

  return (
    <header className="bg-white border-b-2 shadow-lg sticky top-0 z-50" style={{ borderBottomColor: '#f97316' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-center">
              <h1 className="text-3xl font-black tracking-tight" style={{ color: '#f97316' }}>AKILI</h1>
              <p className="text-xs text-gray-700 font-semibold uppercase tracking-wide">Espace Éducateur</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-2">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={`flex items-center px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-sm ${
                  isActive(item.href)
                    ? "text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:shadow-md"
                }`}
                style={isActive(item.href) ? { background: 'linear-gradient(135deg, #f97316, #ea580c)' } : {}}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.title}
              </Link>
            ))}
            
            {/* Dropdown Menu Paramètres */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-orange-600 p-2">
                  <Settings className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Mes paramètres
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-orange-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Menu Mobile Déroulant */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4" style={{ borderTopColor: '#f97316' }}>
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-5 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isActive(item.href)
                      ? "text-white shadow-lg"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                  style={isActive(item.href) ? { background: 'linear-gradient(135deg, #f97316, #ea580c)' } : {}}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
