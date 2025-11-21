import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  type: "login" | "register";
  children: ReactNode;
}

const AuthLayout = ({ children, type }: AuthLayoutProps) => {
  const navigate = useNavigate();

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
              onClick={() => navigate("/admin/login")}
              className={`flex-1 py-2 px-4 text-center font-medium text-sm ${
                type === "login"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/admin/register")}
              className={`flex-1 py-2 px-4 text-center font-medium text-sm ${
                type === "register"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              회원가입
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
