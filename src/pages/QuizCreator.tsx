
import { QuizCreator } from "@/components/QuizCreator";
import { useNavigate, useLocation } from "react-router-dom";

const QuizCreatorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quiz = location.state?.quiz || null;

  const handleNavigate = (view: string) => {
    navigate(`/${view}`);
  };

  return <QuizCreator quiz={quiz} onNavigate={handleNavigate} />;
};

export default QuizCreatorPage;
