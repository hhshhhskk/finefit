import type { FormSectionProps } from "@/pages/contact/types/form";
import { GENDER_OPTIONS } from "../types/basicInfo";

const BasicInfoSection = ({ register, errors }: FormSectionProps) => {
  return (
    <div>
      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        👤 기본 정보
      </h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            이름 *
          </label>
          <input
            {...register("name", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="이름을 입력하세요"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">이름을 입력해주세요</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            연락처 *
          </label>
          <input
            {...register("contact", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="연락처 또는 카카오톡 ID를 입력하세요"
          />
          {errors.contact && (
            <span className="text-red-500 text-sm">연락처를 입력해주세요</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            생년월일 / 나이 *
          </label>
          <input
            {...register("birthDateOrAge", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="예: 1990.01.01 / 34세"
          />
          {errors.birthDateOrAge && (
            <span className="text-red-500 text-sm">
              생년월일을 입력해주세요
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            성별 *
          </label>

          <div className="flex gap-4">
            {GENDER_OPTIONS.map(({ label, value }) => (
              <label key={value} className="flex items-center">
                <input
                  type="radio"
                  value={value}
                  {...register("gender", { required: true })}
                  className="mr-2"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>

          {errors.gender && (
            <span className="text-red-500 text-sm">성별을 선택해주세요</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-707 mb-2">
              키 / 체중 *
            </label>
            <input
              {...register("heightAndWeight", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="예: 170cm / 86kg"
            />
            {errors.heightAndWeight && (
              <span className="text-red-500 text-sm">
                키와 체중 입력해주세요
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            희망 체중 / 목표 체형 *
          </label>
          <input
            {...register("targetWeightOrBody", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="예: 60kg, 탄탄한 몸매, 근력 향상 등"
          />
          {errors.targetWeightOrBody && (
            <span className="text-red-500 text-sm">
              희망 체중을 입력해주세요
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
