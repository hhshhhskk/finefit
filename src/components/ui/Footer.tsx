
export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* 로고 및 소개 */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-black text-blue-400 mb-4" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
              FINEFIT FITNESS
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              개인 맞춤형 헬스 솔루션으로 당신의 건강한 라이프스타일을 만들어갑니다. 
              16가지 몸BTI 분석을 통해 가장 효과적인 운동과 식단을 추천해드립니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <i className="ri-youtube-line"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <i className="ri-kakao-talk-fill"></i>
              </a>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h4 className="text-lg font-bold mb-4">빠른 링크</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  홈
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('mbti')}
                  className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  몸BTI 테스트
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  서비스 소개
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  문의하기
                </button>
              </li>
            </ul>
          </div>

          {/* 연락처 정보 */}
          <div>
            <h4 className="text-lg font-bold mb-4">연락처</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <i className="ri-phone-line mr-2 text-blue-400"></i>
                <span>02-1234-5678</span>
              </div>
              <div className="flex items-center">
                <i className="ri-mail-line mr-2 text-blue-400"></i>
                <span>info@finefit.co.kr</span>
              </div>
              <div className="flex items-center">
                <i className="ri-map-pin-line mr-2 text-blue-400"></i>
                <span>서울시 강남구 테헤란로 123</span>
              </div>
              <div className="flex items-center">
                <i className="ri-time-line mr-2 text-blue-400"></i>
                <span>평일 09:00-22:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 구분선 및 저작권 */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>© 2024 FINEFIT FITNESS. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors cursor-pointer">개인정보처리방침</a>
              <span>|</span>
              <a href="#" className="hover:text-blue-400 transition-colors cursor-pointer">이용약관</a>
              <span>|</span>
              <a href="https://readdy.ai/?origin=logo" className="hover:text-blue-400 transition-colors cursor-pointer">Website Builder</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
