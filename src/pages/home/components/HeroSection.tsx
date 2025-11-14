export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-16">
      {/* 화이트 배경 */}
      <div className="absolute inset-0 bg-white"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-full">
          {/* 로고 이미지 - 크기 더 증가 */}
          <div className="mb-6 flex justify-center">
            <img
              src="https://static.readdy.ai/image/16827adac254808bf5e02e26f6d6d949/0125ecfad1fc4d43e7a9cc8e07eecdb3.jfif"
              alt="FineFit Logo"
              className="h-48 md:h-60 lg:h-[600px] w-auto object-contain"
            />
          </div>

          {/* Recharge your life 문구 - 행간 더 줄임 */}
          <p className="text-2xl md:text-3xl text-blue-600 mb-8 font-light tracking-wide leading-tight">
            Recharge your life
          </p>
        </div>
      </div>
    </section>
  );
}
