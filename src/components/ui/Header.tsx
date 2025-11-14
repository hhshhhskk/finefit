import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(`/`);
  };

  const handleMBTIClick = () => {
    navigate(`mbti`);
  };

  const handleConsultationClick = () => {
    navigate("contact");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="text-2xl font-black text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
              style={{ fontFamily: "Noto Sans KR, sans-serif" }}
            >
              FINEFIT FITNESS
            </button>
          </div>

          {/* CTA 버튼들 */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleMBTIClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors whitespace-nowrap cursor-pointer"
            >
              몸BTI 테스트
            </button>
            <button
              onClick={handleConsultationClick}
              className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-2 px-6 rounded-full border-2 border-blue-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              상담 신청하기
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
