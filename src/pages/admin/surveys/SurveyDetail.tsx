import { useState } from "react";

// 임시 데이터 (나중에 Supabase에서 가져올 예정)
const mockSurveys = [
  {
    id: 1,
    name: "김민지",
    phone: "010-1234-5678",
    email: "minji@example.com",
    age: "25-30",
    experience: "초급자",
    goals: ["체중감량", "근력증가"],
    availableTime: "평일 저녁",
    healthIssues: "무릎 통증",
    submittedAt: "2024-01-15 14:30",
    status: "pending",
  },
  {
    id: 2,
    name: "이서연",
    phone: "010-9876-5432",
    email: "seoyeon@example.com",
    age: "30-35",
    experience: "중급자",
    goals: ["체력향상", "스트레스해소"],
    availableTime: "주말",
    healthIssues: "없음",
    submittedAt: "2024-01-14 16:45",
    status: "contacted",
  },
  {
    id: 3,
    name: "박지은",
    phone: "010-5555-7777",
    email: "jieun@example.com",
    age: "20-25",
    experience: "초급자",
    goals: ["체중감량"],
    availableTime: "평일 오전",
    healthIssues: "허리 디스크",
    submittedAt: "2024-01-13 10:20",
    status: "completed",
  },
];

export default function SurveyList() {
  const [surveys] = useState(mockSurveys);
  const [selectedSurvey, setSelectedSurvey] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredSurveys = surveys.filter(
    (survey) => statusFilter === "all" || survey.status === statusFilter
  );

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
      </div>
    </div>
  );
}
