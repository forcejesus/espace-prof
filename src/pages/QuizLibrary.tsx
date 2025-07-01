
import { QuizLibrary } from "@/components/QuizLibrary";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const QuizLibraryPage = () => {
  const navigate = useNavigate();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleNavigate = (view: string) => {
    navigate(`/${view}`);
  };

  const handleEditQuiz = (quiz: any) => {
    setSelectedQuiz(quiz);
    navigate("/creator", { state: { quiz } });
  };

  return <QuizLibrary onNavigate={handleNavigate} onEditQuiz={handleEditQuiz} />;
};

export default QuizLibraryPage;
