
import { useState } from 'react';

// 임시 데이터 (나중에 Supabase에서 가져올 예정)
const mockSurveys = [
  {
    id: 1,
    name: '김민지',
    phone: '010-1234-5678',
    email: 'minji@example.com',
    age: '25-30',
    experience: '초급자',
    goals: ['체중감량', '근력증가'],
    availableTime: '평일 저녁',
    healthIssues: '무릎 통증',
    submittedAt: '2024-01-15 14:30',
    status: 'pending'
  },
  {
    id: 2,
    name: '이서연',
    phone: '010-9876-5432',
    email: 'seoyeon@example.com',
    age: '30-35',
    experience: '중급자',
    goals: ['체력향상', '스트레스해소'],
    availableTime: '주말',
    healthIssues: '없음',
    submittedAt: '2024-01-14 16:45',
    status: 'contacted'
  },
  {
    id: 3,
    name: '박지은',
    phone: '010-5555-7777',
    email: 'jieun@example.com',
    age: '20-25',
    experience: '초급자',
    goals: ['체중감량'],
    availableTime: '평일 오전',
    healthIssues: '허리 디스크',
    submittedAt: '2024-01-13 10:20',
    status: 'completed'
  }
];

export default function SurveyList() {
  const [surveys] = useState(mockSurveys);
  const [selectedSurvey, setSelectedSurvey] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredSurveys = surveys.filter(survey => 
    statusFilter === 'all' || survey.status === statusFilter
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: '대기중', color: 'bg-yellow-100 text-yellow-800' },
      contacted: { label: '연락완료', color: 'bg-blue-100 text-blue-800' },
      completed: { label: '상담완료', color: 'bg-green-100 text-green-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">상담 신청 설문지</h2>
        <div className="flex items-center space-x-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">전체</option>
            <option value="pending">대기중</option>
            <option value="contacted">연락완료</option>
            <option value="completed">상담완료</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 설문지 목록 */}
        <div className="space-y-4">
          {filteredSurveys.map((survey) => (
            <div
              key={survey.id}
              onClick={() => setSelectedSurvey(survey)}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{survey.name}</h3>
                {getStatusBadge(survey.status)}
              </div>
              <p className="text-sm text-gray-600 mb-1">{survey.phone}</p>
              <p className="text-sm text-gray-600 mb-2">{survey.email}</p>
              <p className="text-xs text-gray-500">{survey.submittedAt}</p>
            </div>
          ))}
        </div>

        {/* 설문지 상세 */}
        <div className="border border-gray-200 rounded-lg p-6">
          {selectedSurvey ? (
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-medium text-gray-900">설문지 상세</h3>
                {getStatusBadge(selectedSurvey.status)}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <p className="text-gray-900">{selectedSurvey.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                  <p className="text-gray-900">{selectedSurvey.phone}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <p className="text-gray-900">{selectedSurvey.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연령대</label>
                  <p className="text-gray-900">{selectedSurvey.age}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">운동 경험</label>
                  <p className="text-gray-900">{selectedSurvey.experience}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">운동 목표</label>
                  <p className="text-gray-900">{selectedSurvey.goals.join(', ')}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">가능한 시간</label>
                  <p className="text-gray-900">{selectedSurvey.availableTime}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">건강상 문제</label>
                  <p className="text-gray-900">{selectedSurvey.healthIssues}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">신청일시</label>
                  <p className="text-gray-900">{selectedSurvey.submittedAt}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">상태 변경</h4>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors cursor-pointer whitespace-nowrap">
                    대기중
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                    연락완료
                  </button>
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
                    상담완료
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <i className="ri-file-list-3-line text-4xl mb-4"></i>
              <p>설문지를 선택하여 상세 내용을 확인하세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
