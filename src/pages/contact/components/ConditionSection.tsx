import type { FormSectionProps } from "../types/form";

const ConditionSection = ({ register, errors }: FormSectionProps) => {
  return (
    <div>
      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        🏥 건강 상태
      </h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            질병, 통증, 부상 등
          </label>
          <textarea
            {...register("medicalHistory", {
              required: "질병/통증/부상을 입력해주세요",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none text-sm"
            rows={2}
          />
          {errors.medicalHistory && (
            <span className="text-red-500 text-sm">
              {errors.medicalHistory.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            복용 중인 약물
          </label>
          <input
            {...register("medicationOrPrecautions", {
              required: "복용 중인 약물을 입력해주세요",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors.medicationOrPrecautions && (
            <span className="text-red-500 text-sm">
              {errors.medicationOrPrecautions.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConditionSection;
