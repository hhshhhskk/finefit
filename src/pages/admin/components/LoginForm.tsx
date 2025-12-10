import { loginApi } from "@/api/admin/loginApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface LoginFormValues {
  trainerId: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
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
      navigate("/admin");
    }
  }, []);

  const onSubmit = async (loginData: LoginFormValues) => {
    try {
      const res = await loginApi(loginData);

      if (res.code === 200) {
        navigate("/admin");
      } else {
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
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
        <input
          id="trainerId"
          type="text"
          {...register("trainerId", {
            required: "아이디를 입력해주세요",
          })}
          autoComplete="username"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="아이디를 입력하세요."
        />
        {errors.trainerId && (
          <span className="text-red-500 text-sm">
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
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
          })}
          autoComplete="current-password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="비밀번호를 입력하세요"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* 로그인 버튼 */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
      >
        로그인
      </button>
    </form>
  );
}
