
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DashboardPage from "./pages/Dashboard";
import QuizLibraryPage from "./pages/QuizLibrary";
import QuizCreatorPage from "./pages/QuizCreator";
import LiveSessionPage from "./pages/LiveSession";
import SessionHistoryPage from "./pages/SessionHistory";
import SettingsPage from "./pages/Settings";
import ProfilePage from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />}>
            <Route index element={<DashboardPage />} />
            <Route path="library" element={<QuizLibraryPage />} />
            <Route path="creator" element={<QuizCreatorPage />} />
            <Route path="live" element={<LiveSessionPage />} />
            <Route path="history" element={<SessionHistoryPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
