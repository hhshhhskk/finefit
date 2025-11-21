import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerApi } from "@/api/admin/registerApi";
import { ROLE_MAP, type RegisterData } from "../types/register";

export default function RegisterForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    // confirmPassword 제거
    const { confirmPassword, ...requestBody } = registerData;

    try {
      const res = await registerApi(requestBody); // confirmPassword 빠진 데이터 전송

      if (res.code === 200) {
        setIsSubmitted(true);
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const formData = watch();

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
        <label className="block text-sm mb-1">아이디</label>
        <input
          {...register("trainerId", {
            required: "아이디는 필수 입력값입니다.",
          })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="아이디 입력"
        />
        {errors.trainerId && (
          <p className="text-red-500 text-xs">{errors.trainerId.message}</p>
        )}
      </div>

      {/* password */}
      <div>
        <label className="block text-sm mb-1">비밀번호</label>
        <input
          type="password"
          {...register("password", {
            required: "비밀번호는 필수 입력값입니다.",
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상이어야 합니다.",
            },
          })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="비밀번호 (8자 이상)"
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
      </div>

      {/* confirm password */}
      <div>
        <label className="block text-sm mb-1">비밀번호 확인</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "비밀번호 확인이 필요합니다.",
          })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="비밀번호 다시 입력"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* trainerName */}
      <div>
        <label className="block text-sm mb-1">이름</label>
        <input
          {...register("trainerName", {
            required: "이름은 필수 입력값입니다.",
          })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="이름 입력"
        />
        {errors.trainerName && (
          <p className="text-red-500 text-xs">{errors.trainerName.message}</p>
        )}
      </div>

      {/* connect */}
      <div>
        <label className="block text-sm mb-1">연락처</label>
        <input
          {...register("connect", {
            required: "연락처는 필수 입력값입니다.",
          })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="010-1234-5678"
        />
        {errors.connect && (
          <p className="text-red-500 text-xs">{errors.connect.message}</p>
        )}
      </div>

      {/* storeNumber */}
      <div>
        <label className="block text-sm mb-1">지점 번호</label>
        <select
          {...register("storeNumber", {
            required: "지점 선택은 필수입니다.",
          })}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">지점을 선택하세요</option>
          <option value="1호점">1호점</option>
          <option value="2호점">2호점</option>
          <option value="3호점">3호점</option>
          <option value="4호점">4호점</option>
          <option value="5호점">5호점</option>
        </select>
        {errors.storeNumber && (
          <p className="text-red-500 text-xs">{errors.storeNumber.message}</p>
        )}
      </div>

      {/* role */}
      <div>
        <label className="block text-sm mb-1">역할(role)</label>
        <select
          {...register("role", {
            required: "역할 선택은 필수입니다.",
          })}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">역할을 선택하세요</option>
          {Object.entries(ROLE_MAP).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        {errors.role && (
          <p className="text-red-500 text-xs">{errors.role.message}</p>
        )}
      </div>

      {/* team */}
      <div>
        <label className="block text-sm mb-1">소속 팀(team)</label>
        <input
          {...register("team", { required: "소속 팀은 필수 입력값입니다." })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="예: 운영팀 / 상담팀"
        />
        {errors.team && (
          <p className="text-red-500 text-xs">{errors.team.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        회원가입 신청
      </button>
    </form>
  );
}
