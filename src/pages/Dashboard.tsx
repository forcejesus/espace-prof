
import { Dashboard } from "@/components/Dashboard";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (view: string) => {
    navigate(`/${view}`);
  };

  return <Dashboard onNavigate={handleNavigate} />;
};

export default DashboardPage;
