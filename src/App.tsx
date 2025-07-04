
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar";
import DashboardPage from "./pages/Dashboard";
import MesJeuxPage from "./pages/MesJeux";
import PlanificationPage from "./pages/Planification";
import MonComptePage from "./pages/MonCompte";
import QuizCreatorPage from "./pages/QuizCreator";
import LiveSessionPage from "./pages/LiveSession";
import SessionHistoryPage from "./pages/SessionHistory";
import HistoriquePlanificationPage from "./pages/HistoriquePlanification";
import GroupeApprenantPage from "./pages/GroupeApprenant";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  const handleNavigate = (view: string) => {
    window.location.href = `/${view}`;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={
              <SidebarProvider defaultOpen={true}>
                <div className="min-h-screen flex w-full bg-akili-grey-50">
                  <Sidebar onNavigate={handleNavigate} />
                  <SidebarInset className="flex-1">
                    <Routes>
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/mes-jeux" element={<MesJeuxPage />} />
                      <Route path="/planification" element={<PlanificationPage />} />
                      <Route path="/mon-compte" element={<MonComptePage />} />
                      <Route path="/creer-quiz" element={<QuizCreatorPage />} />
                      <Route path="/session-live" element={<LiveSessionPage />} />
                      <Route path="/historique-session" element={<SessionHistoryPage />} />
                      <Route path="/historique-planification" element={<HistoriquePlanificationPage />} />
                      <Route path="/groupe-apprenant" element={<GroupeApprenantPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </SidebarInset>
                </div>
              </SidebarProvider>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
