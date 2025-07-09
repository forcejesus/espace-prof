
import { LiveSession } from "@/components/LiveSession";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const LiveSessionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const planificationData = location.state;

  useEffect(() => {
    // Mettre l'application en plein écran si possible
    const enterFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } catch (error) {
        console.log("Fullscreen not supported or already in fullscreen");
      }
    };

    enterFullscreen();

    // Cleanup function pour sortir du plein écran lors du démontage
    return () => {
      if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen().catch(console.log);
      }
    };
  }, []);

  const handleNavigate = (view: string) => {
    // Sortir du plein écran avant de naviguer
    if (document.exitFullscreen && document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        navigate(`/${view}`);
      }).catch(() => {
        navigate(`/${view}`);
      });
    } else {
      navigate(`/${view}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LiveSession 
        onNavigate={handleNavigate} 
        planificationData={planificationData}
      />
    </div>
  );
};

export default LiveSessionPage;
