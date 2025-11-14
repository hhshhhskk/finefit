import FormSection from "./components/FormSection";

const page = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 text-center">
            💪 파인핏 개인 PT 상담 신청 전 설문지
          </h2>

          <FormSection />
        </div>
      </div>
    </section>
  );
};

export default page;
