
import { useState, useEffect } from 'react';

export default function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentEducationSlide, setCurrentEducationSlide] = useState(0);
  
  const images = [
    'https://static.readdy.ai/image/16827adac254808bf5e02e26f6d6d949/098bc1d053e8b569066c3b52e7c96cad.jfif',
    'https://static.readdy.ai/image/16827adac254808bf5e02e26f6d6d949/a8581a2020558c2e63c5c4e9c4c2e107.jfif',
    'https://static.readdy.ai/image/16827adac254808bf5e02e26f6d6d949/ac27a0a75d731a6a6d763c72cae6659d.jfif'
  ];

  const educationImages = [
    'https://static.readdy.ai/image/16827adac254808bf5e02e26f6d6d949/4433ae59e6349b62d88e56ca1fe8b6b2.jfif',
    'https://static.readdy.ai/image/16827adac254808bf5e02e26f6d6d949/fa5929f867d67baeb82561ec3cf9a5a5.jfif',
    'https://static.readdy.ai/image/16827adac254808bf5e02e26f6d6d949/1f2d6361a8e93cb4316565ff82b713f5.jfif'
  ];

  // 자동 슬라이드 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // 교육 슬라이드 자동 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEducationSlide((prev) => (prev + 1) % educationImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [educationImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToEducationSlide = (index: number) => {
    setCurrentEducationSlide(index);
  };

  return (
    <section id="about" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 메인 타이틀 - 행간 더 줄임 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            함께하는 <span className="text-blue-600">여성전용</span> 파인핏 1호점
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            FineFit은 개인 맞춤형 헬스 솔루션으로 당신의 운동 라이프를 완전히 바꿔드립니다
          </p>
        </div>

        {/* 슬라이드 이미지 - 더 크게 변경 */}
        <div className="mb-20">
          <div className="relative overflow-hidden rounded-2xl shadow-lg h-[500px] md:h-[600px] lg:h-[700px]">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url('${image}')`
                }}
              ></div>
            ))}
            
            {/* 슬라이드 인디케이터 */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                ></button>
              ))}
            </div>

            {/* 이전/다음 버튼 */}
            <button
              onClick={() => goToSlide((currentSlide - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <i className="ri-arrow-left-line text-white text-xl"></i>
            </button>
            
            <button
              onClick={() => goToSlide((currentSlide + 1) % images.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <i className="ri-arrow-right-line text-white text-xl"></i>
            </button>
          </div>
        </div>

        {/* 파인핏 정기교육 섹션 */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              <span className="text-blue-600">파인핏</span> 정기교육
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              전문적인 교육 프로그램으로 더 나은 트레이너가 되어보세요
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg h-[500px] md:h-[600px] lg:h-[700px]">
            {educationImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                  index === currentEducationSlide ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url('${image}')`
                }}
              ></div>
            ))}
            
            {/* 슬라이드 인디케이터 */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {educationImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToEducationSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentEducationSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                ></button>
              ))}
            </div>

            {/* 이전/다음 버튼 */}
            <button
              onClick={() => goToEducationSlide((currentEducationSlide - 1 + educationImages.length) % educationImages.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <i className="ri-arrow-left-line text-white text-xl"></i>
            </button>
            
            <button
              onClick={() => goToEducationSlide((currentEducationSlide + 1) % educationImages.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <i className="ri-arrow-right-line text-white text-xl"></i>
            </button>
          </div>
        </div>

        {/* 솔루션 섹션 */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              FineFit이 <span className="text-blue-600">해결</span>해드립니다
            </h3>
            <p className="text-lg text-gray-600">
              과학적 분석과 개인 맞춤형 솔루션으로 당신의 헬스 여정을 성공으로 이끕니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i className="ri-user-heart-line text-2xl text-blue-600"></i>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                개인 맞춤 분석
              </h4>
              <p className="text-gray-600 text-center">
                16가지 몸BTI 유형으로 당신의 체질, 성향, 목표를 정확히 분석합니다
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i className="ri-calendar-check-line text-2xl text-blue-600"></i>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                맞춤형 프로그램
              </h4>
              <p className="text-gray-600 text-center">
                분석 결과를 바탕으로 운동 계획과 식단을 개인별로 추천해드립니다
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i className="ri-trophy-line text-2xl text-blue-600"></i>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                지속적 동기부여
              </h4>
              <p className="text-gray-600 text-center">
                진행 상황 추적과 성취감을 통해 꾸준한 운동 습관을 만들어갑니다
              </p>
            </div>
          </div>
        </div>

        {/* 통계 섹션 */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-black text-gray-900 mb-12">
            이미 많은 분들이 <span className="text-blue-600">성공</span>하고 있습니다
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">98%</div>
              <p className="text-gray-600 font-medium">만족도</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">15,000+</div>
              <p className="text-gray-600 font-medium">테스트 완료</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">87%</div>
              <p className="text-gray-600 font-medium">목표 달성률</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">6개월</div>
              <p className="text-gray-600 font-medium">평균 지속 기간</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
