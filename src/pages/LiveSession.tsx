
import { LiveSession } from "@/components/LiveSession";
import { useNavigate } from "react-router-dom";

const LiveSessionPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (view: string) => {
    navigate(`/${view}`);
  };

  return <LiveSession onNavigate={handleNavigate} />;
};

export default LiveSessionPage;
