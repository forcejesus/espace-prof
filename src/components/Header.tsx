
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Calendar, User, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      title: "Mes Jeux",
      href: "/mes-jeux",
      icon: Gamepad2,
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
    <header className="bg-white border-b border-orange-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-orange-900 font-mono">AKILI</h1>
              <p className="text-xs text-orange-600 font-mono">Plateforme Éducative</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                    : "text-orange-700 hover:bg-orange-50 hover:text-orange-800"
                }`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-orange-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Menu Mobile Déroulant */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-orange-200 py-4">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                      : "text-orange-700 hover:bg-orange-50 hover:text-orange-800"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
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
