
import { QuizLibrary } from "@/components/QuizLibrary";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MesJeuxPage = () => {
  const navigate = useNavigate();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleNavigate = (view: string) => {
    navigate(`/${view}`);
  };

  const handleEditQuiz = (quiz: any) => {
    setSelectedQuiz(quiz);
    navigate(`/modifier-jeu/${quiz._id}`);
  };

  return (
    <div className="font-sans">
      <QuizLibrary onNavigate={handleNavigate} onEditQuiz={handleEditQuiz} />
    </div>
  );
};

export default MesJeuxPage;
