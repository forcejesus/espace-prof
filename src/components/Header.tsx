
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Calendar, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <header className="bg-white border-b shadow-md sticky top-0 z-50" style={{ borderBottomColor: '#f97316' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#f97316' }}>
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AKILI</h1>
              <p className="text-xs text-gray-600">Plateforme Éducative</p>
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
                    ? "text-white shadow-lg"
                    : "text-gray-700 hover:bg-orange-50"
                }`}
                style={isActive(item.href) ? { background: '#f97316' } : {}}
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
              className="text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-white shadow-lg"
                      : "text-gray-700 hover:bg-orange-50"
                  }`}
                  style={isActive(item.href) ? { background: '#f97316' } : {}}
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
