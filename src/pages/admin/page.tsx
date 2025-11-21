import { useState } from "react";
import SurveyList from "./surveys/SurveyList";
import TrainerSales from "./sales/TrainerSales";
import MemberManagement from "./members/MemberManagement";
import ApprovalManagement from "./approvals/ApprovalManagement";
import Category from "./components/Category";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  const [dashboardTab, setDashboardTab] = useState<
    "surveys" | "sales" | "members" | "approvals"
  >("surveys");

  const handleLogout = () => {
    sessionStorage.removeItem("role");
    navigate("/admin/login");
  };

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
