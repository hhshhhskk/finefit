import { useState } from "react";
import { questions } from "../data/questions";
import { useNavigate } from "react-router-dom";

export default function MBTITest() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (questionId: number, score: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const scores = { E: 0, I: 0, S: 0, N: 0, F: 0, T: 0, J: 0, P: 0 };

    Object.values(answers).forEach((score) => {
      scores[score as keyof typeof scores]++;
    });

    const extroversion = scores.E >= scores.I ? "E" : "I";
    const sensing = scores.S >= scores.N ? "S" : "N";
    const feeling = scores.F >= scores.T ? "F" : "T";
    const judging = scores.J >= scores.P ? "J" : "P";

    const mbtiType = extroversion + sensing + feeling + judging;
    navigate(`/mbti/${mbtiType}`);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <section
      id="mbti"
      className="py-20 bg-gradient-to-br from-blue-50 to-blue-100"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            📝 몸BTI 테스트
          </h2>
          <p className="text-xl text-gray-600">
            20개 질문으로 알아보는 나만의 헬스 타입
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-600">진행률</span>
              <span className="text-sm font-medium text-blue-600">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {questions[currentQuestion].question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <button
              onClick={() =>
                handleAnswer(
                  questions[currentQuestion].id,
                  questions[currentQuestion].scoreA
                )
              }
              className="w-full p-6 text-left bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-400 rounded-xl transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-900 group-hover:text-blue-800">
                  {questions[currentQuestion].optionA}
                </span>
                <i className="ri-arrow-right-line text-blue-600 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </button>

            <button
              onClick={() =>
                handleAnswer(
                  questions[currentQuestion].id,
                  questions[currentQuestion].scoreB
                )
              }
              className="w-full p-6 text-left bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-gray-400 rounded-xl transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-900 group-hover:text-gray-800">
                  {questions[currentQuestion].optionB}
                </span>
                <i className="ri-arrow-right-line text-gray-600 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </button>
          </div>

          {/* Back Button */}
          {currentQuestion > 0 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setCurrentQuestion((prev) => prev - 1)}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                이전 질문으로
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
