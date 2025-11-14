import { useState } from "react";
import SurveyList from "../surveys/SurveyList";
import TrainerSales from "../sales/TrainerSales";

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"surveys" | "sales" | "settings">(
    "surveys"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                파인핏 관리자
              </h1>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 탭 네비게이션 */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("surveys")}
              className={`py-2 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                activeTab === "surveys"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              설문지 관리
            </button>
            <button
              onClick={() => setActiveTab("sales")}
              className={`py-2 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                activeTab === "sales"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              트레이너 매출 순위
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`py-2 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                activeTab === "settings"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              설정
            </button>
          </nav>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === "surveys" && <SurveyList />}
          {activeTab === "sales" && <TrainerSales />}
          {activeTab === "settings" && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                시스템 설정
              </h2>
              <p className="text-gray-600">
                시스템 설정 기능은 추후 구현 예정입니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
