import { useNavigate, useParams } from "react-router-dom";
import { mbtiResults } from "../data/mbtiResults";
import { useEffect } from "react";

export const MBTIResult = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!type || !mbtiResults[type.toUpperCase()]) {
      // type이 없거나 유효하지 않으면 /mbti로 리다이렉트
      navigate("/mbti");
    }
  }, [type, navigate]);

  if (!type || !mbtiResults[type.toUpperCase()]) {
    return null; // 리다이렉트될 동안 아무것도 렌더링하지 않음
  }

  const result = mbtiResults[type.toUpperCase()];

  return (
    <section
      id="mbti"
      className="py-20 bg-gradient-to-br from-blue-50 to-blue-100"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 당신의 몸BTI 결과
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-xl font-bold mb-4">
              {result.type}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {result.title}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {result.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <i className="ri-user-heart-line mr-2"></i>
                주요 특징
              </h4>
              <ul className="space-y-2">
                {result.characteristics.map((char, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <i className="ri-check-line text-blue-600 mr-2"></i>
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <i className="ri-lightbulb-line mr-2"></i>
                추천 방법
              </h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <i className="ri-star-line text-green-600 mr-2"></i>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/mbti")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors mr-4 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-refresh-line mr-2"></i>
              다시 테스트하기
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors whitespace-nowrap cursor-pointer"
              onClick={() => {
                const shareUrl = `${
                  window.location.origin
                }/mbti/${result.type.toLowerCase()}`;
                navigator.clipboard.writeText(shareUrl);
                alert("결과 페이지 링크가 복사되었습니다!");
              }}
            >
              <i className="ri-share-line mr-2"></i>
              결과 공유하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MBTIResult;
