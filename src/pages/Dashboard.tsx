
import { Dashboard } from "@/components/Dashboard";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (view: string) => {
    navigate(`/${view}`);
  };

  return (
    <div className="font-sans" style={{ fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <Dashboard onNavigate={handleNavigate} />
    </div>
  );
};

export default DashboardPage;
