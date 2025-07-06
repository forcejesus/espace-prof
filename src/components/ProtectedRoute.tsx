import { Navigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { apiConfig } from "@/config/api";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Si la protection par login n'est pas activée, afficher directement le contenu
  if (!apiConfig.enableLoginRequired) {
    return <>{children}</>;
  }

  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}