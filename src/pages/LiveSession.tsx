
import { LiveSession } from "@/components/LiveSession";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const LiveSessionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const planificationData = location.state;

  const handleNavigate = (view: string) => {
    navigate(`/${view}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-akili-grey-50">
      <LiveSession 
        onNavigate={handleNavigate} 
        planificationData={planificationData}
      />
    </div>
  );
};

export default LiveSessionPage;
