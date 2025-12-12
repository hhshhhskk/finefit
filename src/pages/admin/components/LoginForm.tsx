import { loginApi } from "@/api/admin/loginApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export interface LoginFormValues {
  trainerId: string;
  password: string;
}

interface LoginApiResponse {
  code: number;
  message?: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      trainerId: "",
      password: "",
    },
  });

  useEffect(() => {
    const isLoggedIn = !!sessionStorage.getItem("role");
    if (isLoggedIn) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const onSubmit = async (loginData: LoginFormValues) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const res: LoginApiResponse = await loginApi(loginData);

      if (res.code === 200) {
        navigate("/admin", { replace: true });
      } else {
        alert(res.message || "아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 흔들림 애니메이션
  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 아이디 */}
      <div>
        <label
          htmlFor="trainerId"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          아이디
        </label>
        <motion.input
          id="trainerId"
          type="text"
          {...register("trainerId", {
            required: "아이디를 입력해주세요",
          })}
          autoComplete="username"
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
            errors.trainerId
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="아이디를 입력하세요"
          aria-invalid={errors.trainerId ? "true" : "false"}
          aria-describedby={errors.trainerId ? "trainerId-error" : undefined}
          animate={errors.trainerId ? shakeAnimation : {}}
        />
        {errors.trainerId && (
          <span
            id="trainerId-error"
            role="alert"
            className="text-red-500 text-sm mt-1 block"
          >
            {errors.trainerId.message}
          </span>
        )}
      </div>

      {/* 비밀번호 */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          비밀번호
        </label>
        <motion.input
          id="password"
          type="password"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
          })}
          autoComplete="current-password"
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
            errors.password
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="비밀번호를 입력하세요"
          aria-invalid={errors.password ? "true" : "false"}
          aria-describedby={errors.password ? "password-error" : undefined}
          animate={errors.password ? shakeAnimation : {}}
        />
        {errors.password && (
          <span
            id="password-error"
            role="alert"
            className="text-red-500 text-sm mt-1 block"
          >
            {errors.password.message}
          </span>
        )}
      </div>

      {/* 로그인 버튼 */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
