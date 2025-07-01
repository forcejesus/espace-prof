
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { QuizLibrary } from "@/components/QuizLibrary";
import { QuizCreator } from "@/components/QuizCreator";
import { SessionHistory } from "@/components/SessionHistory";
import { LiveSession } from "@/components/LiveSession";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveView} />;
      case "library":
        return <QuizLibrary onNavigate={setActiveView} onEditQuiz={setSelectedQuiz} />;
      case "creator":
        return <QuizCreator quiz={selectedQuiz} onNavigate={setActiveView} />;
      case "history":
        return <SessionHistory />;
      case "live":
        return <LiveSession onNavigate={setActiveView} />;
      default:
        return <Dashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-indigo-50">
        <Sidebar activeView={activeView} onNavigate={setActiveView} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
