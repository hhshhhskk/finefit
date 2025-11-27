import { useSurveyList } from "@/hooks/admin/useSurveyList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStatusBadge } from "./components/StatusBadge";

export default function SurveyList() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const {
    data: surveys = [],
    isLoading,
    isError,
  } = useSurveyList(statusFilter);

  console.log(surveys);

  if (isLoading) return <div className="p-6">로딩 중...</div>;
  if (isError) return <div className="p-6 text-red-500">데이터 로딩 실패</div>;

  const surveyClicked = (counselId: number) => {
    navigate(`/admin/survey/${counselId}`);

    console.log(counselId);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">상담 신청 설문지</h2>

        <div className="flex items-center space-x-4">
          <select
            value={`${statusFilter}`}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">전체</option>
            <option value="WAITING">대기중</option>
            <option value="COMPLETED">상담완료</option>
          </select>
        </div>
      </div>

      {/* 설문지 목록 전체 영역 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {surveys.map((survey) => (
          <div
            key={survey.counselId}
            onClick={() => surveyClicked(survey.counselId)}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{survey.name}</h3>
              {getStatusBadge(survey.counselStatus)}
            </div>

            <p className="text-sm text-gray-600 mb-1">{survey.contact}</p>
            <p className="text-xs text-gray-500">{survey.createAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
