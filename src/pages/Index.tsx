
import { Dashboard } from "@/components/Dashboard";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleNavigate = (view: string) => {
    navigate(`/${view}`);
  };

  return <Dashboard onNavigate={handleNavigate} />;
};

export default Index;
