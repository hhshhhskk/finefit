
import { useState } from 'react';

interface Question {
  id: number;
  category: string;
  question: string;
  optionA: string;
  optionB: string;
  scoreA: string;
  scoreB: string;
}

interface MBTIResult {
  type: string;
  title: string;
  description: string;
  characteristics: string[];
  recommendations: string[];
}

const questions: Question[] = [
  // E/I (외향 ↔ 내향)
  { id: 1, category: "외향성", question: "헬스장에 갔는데 러닝머신이 꽉 차있다.", optionA: "옆 사람에게 \"금방 끝나세요?\" 하고 자연스럽게 묻는다", optionB: "조용히 기다리거나 다른 기구로 간다", scoreA: "E", scoreB: "I" },
  { id: 2, category: "외향성", question: "모르는 사람이 \"운동 잘하시네요\" 칭찬한다면?", optionA: "웃으면서 대화 이어가고 기분 업!", optionB: "민망해서 그냥 \"아 네…\" 하고 끝낸다", scoreA: "E", scoreB: "I" },
  { id: 3, category: "외향성", question: "친구가 갑자기 \"오늘 밤에 산책하자!\"고 하면?", optionA: "바로 가자! 같이 하면 더 즐겁잖아", optionB: "갑작스러운 약속은 피곤하다", scoreA: "E", scoreB: "I" },
  { id: 4, category: "외향성", question: "회사 사람들이 단체로 걷기 챌린지를 한다.", optionA: "좋다! 같이 하면 의욕 생기지", optionB: "굳이… 난 혼자 할래", scoreA: "E", scoreB: "I" },
  { id: 5, category: "외향성", question: "데이트 중 \"우리 공원에서 스트레칭하자\"라고 하면?", optionA: "커플 운동도 재밌지! 사진도 찍자", optionB: "사람 많은 데서 그런 건 좀…", scoreA: "E", scoreB: "I" },
  
  // S/N (현실 ↔ 직관)
  { id: 6, category: "인식", question: "남자친구가 데이트 중 갑자기 닭가슴살 도시락을 꺼냈다.", optionA: "그래, 같이 먹자. 살 빼려면 어쩔 수 없지", optionB: "지금은 데이트니까 괜찮아, 우리 내일 건강식당 가자", scoreA: "S", scoreB: "N" },
  { id: 7, category: "인식", question: "거울 속 내 몸을 볼 때?", optionA: "뱃살·팔뚝 같은 부분부터 먼저 보인다", optionB: "몇 달 뒤 달라질 내 모습이 떠오른다", scoreA: "S", scoreB: "N" },
  { id: 8, category: "인식", question: "체중계 숫자가 늘었을 때 나는?", optionA: "충격! 오늘 당장 식단 줄여야겠다", optionB: "단기보단 장기 습관이 더 중요하지", scoreA: "S", scoreB: "N" },
  { id: 9, category: "인식", question: "쇼핑 중에 바지를 입어봤더니 딱 맞는다.", optionA: "살 좀만 빼면 완전 예쁠 텐데", optionB: "꾸준히 하면 이 바지가 헐렁해지겠지", scoreA: "S", scoreB: "N" },
  { id: 10, category: "인식", question: "다이어트 목표를 세운다면?", optionA: "2주 안에 2kg 빼야지", optionB: "올해 여름까지 건강한 체형 만들기", scoreA: "S", scoreB: "N" },
  
  // F/T (감정 ↔ 논리)
  { id: 11, category: "판단", question: "치킨을 혼자 다 먹어버렸다.", optionA: "괜찮아, 오늘 하루 즐겼다고 생각하자", optionB: "내일은 탄수화물 줄이고 30분 더 걷자", scoreA: "F", scoreB: "T" },
  { id: 12, category: "판단", question: "운동하다가 힘들어서 멈췄다.", optionA: "난 역시 의지가 부족한가 봐… 자책한다", optionB: "체력 한계가 여기까지네, 방법을 바꿔야지", scoreA: "F", scoreB: "T" },
  { id: 13, category: "판단", question: "친구가 \"살 빼고 싶다\"면서 힘들어한다.", optionA: "괜찮아, 네가 예뻐 하고 위로해준다", optionB: "그럼 간식 줄여보는 건 어때?", scoreA: "F", scoreB: "T" },
  { id: 14, category: "판단", question: "목표 달성했을 때 듣고 싶은 말은?", optionA: "너 진짜 대단하다, 수고했어", optionB: "체지방률이 5% 줄었네, 효과 좋네", scoreA: "F", scoreB: "T" },
  { id: 15, category: "판단", question: "주말 약속 때문에 식단을 못 지켰다.", optionA: "그래도 재밌었으니 괜찮아", optionB: "칼로리 오버했네, 조절해야지", scoreA: "F", scoreB: "T" },
  
  // J/P (계획 ↔ 유연)
  { id: 16, category: "생활양식", question: "다이어트 시작을 결심했다.", optionA: "월·화·수 식단표부터 만든다", optionB: "내일부터 일단 밥 덜 먹어야지", scoreA: "J", scoreB: "P" },
  { id: 17, category: "생활양식", question: "친구가 갑자기 치맥 먹자고 한다.", optionA: "오늘은 운동·식단 지켜야 돼, 다음에 먹자", optionB: "오늘은 먹고 내일 줄이면 되지", scoreA: "J", scoreB: "P" },
  { id: 18, category: "생활양식", question: "여행 가기 전 나는?", optionA: "가서도 아침 산책, 가벼운 스트레칭 계획 세운다", optionB: "여행 가면 그냥 즉흥적으로 움직인다", scoreA: "J", scoreB: "P" },
  { id: 19, category: "생활양식", question: "새로 나온 건강 식품을 봤을 때?", optionA: "성분표 확인하고 계획에 맞으면 산다", optionB: "재밌어 보이면 일단 사서 먹어본다", scoreA: "J", scoreB: "P" },
  { id: 20, category: "생활양식", question: "집에 갑자기 과자가 생겼다.", optionA: "오늘은 먹지 않고 내일 먹기로 미룬다", optionB: "와 맛있겠다! 바로 뜯는다", scoreA: "J", scoreB: "P" }
];

const mbtiResults: Record<string, MBTIResult> = {
  "ESFJ": {
    type: "ESFJ",
    title: "성실한 다이어터",
    description: "늘 식단 지키고 계획대로 하는 착실파. 주변 사람들과 함께 건강한 습관을 만들어가는 타입입니다.",
    characteristics: ["계획적인 식단 관리", "꾸준한 운동 습관", "주변과 함께하는 운동", "감정적 동기부여"],
    recommendations: ["그룹 운동 클래스", "식단 일기 작성", "운동 파트너 찾기", "단계별 목표 설정"]
  },
  "ESFP": {
    type: "ESFP",
    title: "행복한 돼지",
    description: "맛있게 먹고, 즐겁게 살고, 운동은 가끔 생각나는 자유로운 타입입니다.",
    characteristics: ["즐거운 식사 문화", "즉흥적인 운동", "스트레스 없는 다이어트", "긍정적인 마인드"],
    recommendations: ["재미있는 스포츠", "댄스 운동", "친구와 함께하는 활동", "유연한 식단 관리"]
  },
  "ESTJ": {
    type: "ESTJ",
    title: "근육 군인",
    description: "딱딱한 계획과 철저한 생활, 스스로에게도 엄격한 타입입니다.",
    characteristics: ["엄격한 자기관리", "체계적인 운동 계획", "목표 지향적", "강한 의지력"],
    recommendations: ["웨이트 트레이닝", "정확한 식단 계획", "운동 기록 관리", "단기 목표 설정"]
  },
  "ESTP": {
    type: "ESTP",
    title: "근육 뚱땡이",
    description: "힘은 좋은데 먹는 것도 포기 못하는 즉흥형입니다.",
    characteristics: ["강한 체력", "즉흥적인 식습관", "활동적인 성격", "현실적인 접근"],
    recommendations: ["고강도 운동", "간헐적 단식", "액티브한 스포츠", "칼로리 소모 중심 운동"]
  },
  "ISFJ": {
    type: "ISFJ",
    title: "도시락 요정",
    description: "어디서든 닭가슴살 꺼내는 성실 식단러입니다.",
    characteristics: ["완벽한 식단 준비", "조용한 운동 선호", "꾸준한 습관", "세심한 관리"],
    recommendations: ["홈트레이닝", "식단 준비", "요가나 필라테스", "개인 운동 프로그램"]
  },
  "ISFP": {
    type: "ISFP",
    title: "간헐적 도전러",
    description: "내일부터 진짜 시작!을 반복하는 귀여운 타입입니다.",
    characteristics: ["감성적인 동기", "유연한 접근", "자신만의 페이스", "스트레스 민감"],
    recommendations: ["부담 없는 운동", "자연 속 활동", "감정 관리", "작은 목표부터 시작"]
  },
  "ISTJ": {
    type: "ISTJ",
    title: "체중계 집착러",
    description: "숫자(kg, %)가 모든 기준. 매일 올라가 확인하는 타입입니다.",
    characteristics: ["정확한 수치 관리", "규칙적인 생활", "데이터 중심 접근", "꾸준한 실행"],
    recommendations: ["체성분 분석", "운동 기록 앱", "정확한 칼로리 계산", "수치 목표 설정"]
  },
  "ISTP": {
    type: "ISTP",
    title: "혼자만의 운동가",
    description: "조용히 자기 방식대로 즉흥적으로 하는 타입입니다.",
    characteristics: ["독립적인 운동", "실용적인 접근", "유연한 방법", "효율성 추구"],
    recommendations: ["개인 운동", "기능성 운동", "실용적인 식단", "자유로운 스케줄"]
  },
  "ENFJ": {
    type: "ENFJ",
    title: "동기부여 캡틴",
    description: "주변까지 끌고 다니며 열정 뿜뿜하는 리더입니다.",
    characteristics: ["강한 리더십", "타인 동기부여", "장기적 비전", "감정적 연결"],
    recommendations: ["그룹 운동 리더", "운동 커뮤니티", "동기부여 프로그램", "멘토링 활동"]
  },
  "ENFP": {
    type: "ENFP",
    title: "운동 불꽃놀이",
    description: "새로운 거 시도하다가 금방 질리지만 에너지는 최고입니다.",
    characteristics: ["높은 에너지", "다양한 시도", "창의적 접근", "변화 추구"],
    recommendations: ["다양한 운동 체험", "새로운 스포츠", "크로스핏", "운동 챌린지"]
  },
  "ENTJ": {
    type: "ENTJ",
    title: "몸 만들기 CEO",
    description: "목표 정으면 끝까지 해내는 추진력을 가진 타입입니다.",
    characteristics: ["강한 목표 의식", "체계적 계획", "효율성 추구", "결과 중심"],
    recommendations: ["전문 트레이너", "체계적 프로그램", "명확한 목표 설정", "성과 측정"]
  },
  "ENTP": {
    type: "ENTP",
    title: "헬스 발명가",
    description: "신박한 방법만 찾아다니는 아이디어형입니다.",
    characteristics: ["창의적 방법", "실험 정신", "다양한 접근", "혁신 추구"],
    recommendations: ["새로운 운동법", "실험적 식단", "최신 트렌드", "창의적 루틴"]
  },
  "INFJ": {
    type: "INFJ",
    title: "조용한 철학 다이어터",
    description: "운동을 인생 수양처럼 하는 묵묵한 타입입니다.",
    characteristics: ["깊은 동기", "철학적 접근", "장기적 관점", "내적 동기"],
    recommendations: ["명상과 운동", "요가", "자연 속 운동", "마음챙김 식사"]
  },
  "INFP": {
    type: "INFP",
    title: "몽상 다이어터",
    description: "내 이상적인 몸은…을 상상하며 늘 꿈꾸는 타입입니다.",
    characteristics: ["이상적 목표", "감성적 동기", "개인적 의미", "유연한 접근"],
    recommendations: ["개인 맞춤 운동", "감성적 동기부여", "예술적 운동", "자유로운 식단"]
  },
  "INTJ": {
    type: "INTJ",
    title: "칼로리 전략가",
    description: "식단·운동을 분석하고 설계하는 과학자 스타일입니다.",
    characteristics: ["과학적 접근", "전략적 계획", "효율성 추구", "장기적 비전"],
    recommendations: ["데이터 기반 운동", "과학적 식단", "체계적 분석", "최적화된 루틴"]
  },
  "INTP": {
    type: "INTP",
    title: "다이어트 실험러",
    description: "유행하는 운동·식단 다 해보는 호기심 덩어리입니다.",
    characteristics: ["실험 정신", "이론적 관심", "다양한 시도", "분석적 사고"],
    recommendations: ["실험적 접근", "이론 학습", "다양한 방법론", "개인 연구"]
  }
};

export default function MBTITest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<MBTIResult | null>(null);

  const handleAnswer = (questionId: number, score: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const scores = { E: 0, I: 0, S: 0, N: 0, F: 0, T: 0, J: 0, P: 0 };
    
    Object.values(answers).forEach(score => {
      scores[score as keyof typeof scores]++;
    });

    const extroversion = scores.E >= scores.I ? 'E' : 'I';
    const sensing = scores.S >= scores.N ? 'S' : 'N';
    const feeling = scores.F >= scores.T ? 'F' : 'T';
    const judging = scores.J >= scores.P ? 'J' : 'P';

    const mbtiType = extroversion + sensing + feeling + judging;
    
    // 결과가 없는 경우 기본값 제공
    const finalResult = mbtiResults[mbtiType] || {
      type: mbtiType,
      title: "나만의 헬스 타입",
      description: "당신만의 독특한 헬스 스타일을 가지고 있습니다.",
      characteristics: ["개성 있는 운동 스타일", "독특한 목표 설정", "나만의 방식", "창의적 접근"],
      recommendations: ["개인 맞춤 운동", "다양한 시도", "전문가 상담", "꾸준한 기록"]
    };

    setResult(finalResult);
    setShowResult(true);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult && result) {
    return (
      <section id="mbti" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
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
                onClick={resetTest}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors mr-4 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-refresh-line mr-2"></i>
                다시 테스트하기
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-share-line mr-2"></i>
                결과 공유하기
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="mbti" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
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
              <span className="text-sm font-medium text-blue-600">
                진행률
              </span>
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
              onClick={() => handleAnswer(questions[currentQuestion].id, questions[currentQuestion].scoreA)}
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
              onClick={() => handleAnswer(questions[currentQuestion].id, questions[currentQuestion].scoreB)}
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
                onClick={() => setCurrentQuestion(prev => prev - 1)}
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
