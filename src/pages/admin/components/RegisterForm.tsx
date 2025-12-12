import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerApi } from "@/api/admin/registerApi";
import { ROLE_MAP, type RegisterData } from "../types/register";
import { motion } from "framer-motion";

interface RegisterApiResponse {
  code: number;
  message?: string;
}

export default function RegisterForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterData>({
    defaultValues: {
      trainerId: "",
      password: "",
      confirmPassword: "",
      trainerName: "",
      connect: "",
      storeNumber: "",
      role: "TRAINER",
      team: "",
    },
  });

  const onSubmit = async (registerData: RegisterData) => {
    if (registerData.password !== registerData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (isLoading) return;

    // confirmPassword 제거
    const { confirmPassword, ...requestBody } = registerData;

    setIsLoading(true);
    try {
      const res: RegisterApiResponse = await registerApi(requestBody);

      if (res.code === 200) {
        setIsSubmitted(true);
      } else {
        alert(res.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const formData = watch();
  const password = watch("password");

  // 흔들림 애니메이션
  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
    },
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold mb-2">승인 대기 중</h3>
        <p className="text-gray-600 text-sm mb-4">
          관리자 승인 후 로그인이 가능합니다.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm font-medium">신청 정보</p>
          <p className="text-xs text-gray-700">아이디: {formData.trainerId}</p>
          <p className="text-xs text-gray-700">이름: {formData.trainerName}</p>
          <p className="text-xs text-gray-700">지점: {formData.storeNumber}</p>
          <p className="text-xs text-gray-700">
            역할: {ROLE_MAP[formData.role]?.label}
          </p>
        </div>

        <button
          onClick={() => {
            setIsSubmitted(false);
            reset();
          }}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          다시 신청하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* trainerId */}
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
            required: "아이디는 필수 입력값입니다.",
            minLength: {
              value: 6,
              message: "아이디는 최소 6자 이상이어야 합니다.",
            },
          })}
          autoComplete="username"
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
            errors.trainerId
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="아이디 입력"
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

      {/* password */}
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
            required: "비밀번호는 필수 입력값입니다.",
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상이어야 합니다.",
            },
          })}
          autoComplete="new-password"
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
            errors.password
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="비밀번호 (8자 이상)"
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

      {/* confirm password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          비밀번호 확인
        </label>
        <motion.input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "비밀번호 확인이 필요합니다.",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          })}
          autoComplete="new-password"
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
            errors.confirmPassword
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="비밀번호 다시 입력"
          aria-invalid={errors.confirmPassword ? "true" : "false"}
          aria-describedby={
            errors.confirmPassword ? "confirmPassword-error" : undefined
          }
          animate={errors.confirmPassword ? shakeAnimation : {}}
        />
        {errors.confirmPassword && (
          <span
            id="confirmPassword-error"
            role="alert"
            className="text-red-500 text-sm mt-1 block"
          >
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {/* trainerName */}
      <div>
        <label
          htmlFor="trainerName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          이름
        </label>
        <motion.input
          id="trainerName"
          type="text"
          {...register("trainerName", {
            required: "이름은 필수 입력값입니다.",
          })}
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
            errors.trainerName
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="이름 입력"
          aria-invalid={errors.trainerName ? "true" : "false"}
          aria-describedby={
            errors.trainerName ? "trainerName-error" : undefined
          }
          animate={errors.trainerName ? shakeAnimation : {}}
        />
        {errors.trainerName && (
          <span
            id="trainerName-error"
            role="alert"
            className="text-red-500 text-sm mt-1 block"
          >
            {errors.trainerName.message}
          </span>
        )}
      </div>

      {/* connect */}
      <div>
        <label
          htmlFor="connect"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          연락처
        </label>
        <motion.input
          id="connect"
          type="text"
          {...register("connect", {
            required: "연락처는 필수 입력값입니다.",
            pattern: {
              value: /^010-\d{4}-\d{4}$/,
              message: "010-0000-0000 형식으로 입력해주세요.",
            },
          })}
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
            errors.connect
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="010-1234-5678"
          aria-invalid={errors.connect ? "true" : "false"}
          aria-describedby={errors.connect ? "connect-error" : undefined}
          animate={errors.connect ? shakeAnimation : {}}
        />
        {errors.connect && (
          <span
            id="connect-error"
            role="alert"
            className="text-red-500 text-sm mt-1 block"
          >
            {errors.connect.message}
          </span>
        )}
      </div>

      {/* storeNumber */}
      <div>
        <label
          htmlFor="storeNumber"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          지점 번호
        </label>
        <motion.select
          id="storeNumber"
          {...register("storeNumber", {
            required: "지점 선택은 필수입니다.",
          })}
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
            errors.storeNumber
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          aria-invalid={errors.storeNumber ? "true" : "false"}
          aria-describedby={
            errors.storeNumber ? "storeNumber-error" : undefined
          }
          animate={errors.storeNumber ? shakeAnimation : {}}
        >
          <option value="">지점을 선택하세요</option>
          <option value="1호점">1호점</option>
          <option value="2호점">2호점</option>
          <option value="3호점">3호점</option>
          <option value="4호점">4호점</option>
          <option value="5호점">5호점</option>
        </motion.select>
        {errors.storeNumber && (
          <span
            id="storeNumber-error"
            role="alert"
            className="text-red-500 text-sm mt-1 block"
          >
            {errors.storeNumber.message}
          </span>
        )}
      </div>

      {/* role */}
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          역할(role)
        </label>
        <motion.select
          id="role"
          {...register("role", {
            required: "역할 선택은 필수입니다.",
          })}
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
            errors.role
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          aria-invalid={errors.role ? "true" : "false"}
          aria-describedby={errors.role ? "role-error" : undefined}
          animate={errors.role ? shakeAnimation : {}}
        >
          <option value="">역할을 선택하세요</option>
          {Object.entries(ROLE_MAP).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </motion.select>
        {errors.role && (
          <span
            id="role-error"
            role="alert"
            className="text-red-500 text-sm mt-1 block"
          >
            {errors.role.message}
          </span>
        )}
      </div>

      {/* team */}
      <div>
        <label
          htmlFor="team"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          소속 팀(team)
        </label>
        <motion.input
          id="team"
          type="text"
          {...register("team", {
            required: "소속 팀은 필수 입력값입니다.",
          })}
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
            errors.team
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="예: 운영팀 / 상담팀"
          aria-invalid={errors.team ? "true" : "false"}
          aria-describedby={errors.team ? "team-error" : undefined}
          animate={errors.team ? shakeAnimation : {}}
        />
        {errors.team && (
          <span
            id="team-error"
            role="alert"
            className="text-red-500 text-sm mt-1 block"
          >
            {errors.team.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? "신청 중..." : "회원가입 신청"}
      </button>
    </form>
  );
}
