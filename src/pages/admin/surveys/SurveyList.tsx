import { useSurveyList } from "@/hooks/admin/useSurveyList";
import { useState } from "react";

export default function SurveyList() {
  const { data: surveys = [], isLoading, isError } = useSurveyList();
  const [selectedSurvey, setSelectedSurvey] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  if (isLoading) return <div className="p-6">로딩 중...</div>;
  if (isError) return <div className="p-6 text-red-500">데이터 로딩 실패</div>;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "대기중", color: "bg-yellow-100 text-yellow-800" },
      contacted: { label: "연락완료", color: "bg-blue-100 text-blue-800" },
      completed: { label: "상담완료", color: "bg-green-100 text-green-800" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
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

      {/* 설문지 목록 전체 영역 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {surveys.map((survey) => (
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
    </div>
  );
}
