
import { Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PreviewStepProps {
  quizData: any;
  questions: any[];
}

export function PreviewStep({ quizData, questions }: PreviewStepProps) {
  const questionTypes = [
    { value: "VRAI_FAUX", label: "Vrai ou Faux" },
    { value: "REPONSE_COURTE", label: "Réponse courte" },
    { value: "CHOIX_UNIQUE", label: "Question à choix unique" },
    { value: "CHOIX_MULTIPLE", label: "Question à choix multiple" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-orange-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
          <CardTitle className="flex items-center text-orange-800">
            <Eye className="w-5 h-5 mr-2 text-orange-600" />
            Aperçu du Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
            <h2 className="text-2xl font-bold text-orange-900 mb-2">{quizData.title}</h2>
            <p className="text-orange-700 mb-4">{quizData.description}</p>
            
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-orange-100 text-orange-800 border-orange-200">{quizData.subject}</Badge>
              <Badge className="bg-amber-100 text-amber-800 border-amber-200">{quizData.difficulty}</Badge>
              <Badge className="bg-green-100 text-green-800 border-green-200">{questions.length} questions</Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">{quizData.estimatedDuration}</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Questions</h3>
            {questions.map((question, index) => (
              <Card key={question.id} className="bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-800">
                          {index + 1}. {question.question}
                        </h4>
                        <Badge variant="secondary" className="text-xs bg-orange-200 text-orange-800">
                          {questionTypes.find(t => t.value === question.type)?.label}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant="outline" className="border-orange-300 text-orange-700">{question.timeLimit}s</Badge>
                      <Badge variant="outline" className="border-orange-300 text-orange-700">{question.points} pts</Badge>
                    </div>
                  </div>
                  
                  {question.type === "VRAI_FAUX" && (
                    <div className="flex space-x-4">
                      <div className={`p-2 rounded border ${
                        question.correctAnswer === "true"
                          ? "bg-green-100 border-green-300 text-green-800"
                          : "bg-gray-100 border-gray-300"
                      }`}>
                        ✓ Vrai
                      </div>
                      <div className={`p-2 rounded border ${
                        question.correctAnswer === "false"
                          ? "bg-green-100 border-green-300 text-green-800"
                          : "bg-gray-100 border-gray-300"
                      }`}>
                        ✓ Faux
                      </div>
                    </div>
                  )}

                  {(question.type === "CHOIX_UNIQUE" || question.type === "CHOIX_MULTIPLE") && (
                    <div className="grid grid-cols-2 gap-2">
                      {question.options?.map((option: string, optionIndex: number) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded border ${
                            question.correctAnswers?.includes(optionIndex)
                              ? "bg-green-100 border-green-300 text-green-800"
                              : "bg-white border-orange-200"
                          }`}
                        >
                          {question.type === "CHOIX_UNIQUE" ? 
                            `${String.fromCharCode(65 + optionIndex)}. ${option}` :
                            `${question.correctAnswers?.includes(optionIndex) ? '✓' : '○'} ${option}`
                          }
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "REPONSE_COURTE" && (
                    <div className="bg-green-100 border border-green-300 text-green-800 p-2 rounded">
                      <strong>Réponse attendue:</strong> {question.correctAnswer}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
