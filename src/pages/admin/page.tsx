import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SurveyList from "./surveys/SurveyList";
import TrainerSales from "./sales/TrainerSales";
import MemberManagement from "./members/MemberManagement";
import ApprovalManagement from "./approvals/ApprovalManagement";
import Category from "./components/Category";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [dashboardTab, setDashboardTab] = useState<
    "surveys" | "sales" | "members" | "approvals"
  >("surveys");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDashboardTab("surveys");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              관리자 페이지
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              파인핏 관리자 시스템에 로그인하세요
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-2 px-4 text-center font-medium text-sm ${
                  activeTab === "login"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                로그인
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-2 px-4 text-center font-medium text-sm ${
                  activeTab === "register"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                회원가입
              </button>
            </div>

            {activeTab === "login" ? (
              <LoginForm onLogin={handleLogin} />
            ) : (
              <RegisterForm onRegister={() => setActiveTab("login")} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                파인핏 관리자
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <Category
            dashboardTab={dashboardTab}
            setDashboardTab={setDashboardTab}
          />

          <div className="p-6">
            {dashboardTab === "surveys" && <SurveyList />}
            {dashboardTab === "sales" && <TrainerSales />}
            {dashboardTab === "members" && <MemberManagement />}
            {dashboardTab === "approvals" && <ApprovalManagement />}
          </div>
        </div>
      </div>
    </div>
  );
}
