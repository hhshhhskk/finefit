import { Controller } from "react-hook-form";
import type { FormSectionProps } from "../types/form";
import { exerciseGoalLabelMap, exerciseGoalList } from "../types/exerciseGoal";

const GoalSection = ({ register, errors, control }: FormSectionProps) => {
  return (
    <div>
      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        🎯 운동 목표
      </h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            운동 목표 (복수 선택 가능)
          </label>
          <Controller
            name="exerciseGoal"
            control={control}
            rules={{
              validate: (value) =>
                Object.values(value || {}).some((v) => v) ||
                "운동 목표를 선택해주세요",
            }}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-2">
                {exerciseGoalList.map((goal) => (
                  <label key={goal} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={field.value[goal] || false} // 객체 boolean 접근
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          [goal]: e.target.checked, // 객체 업데이트
                        })
                      }
                      className="mr-2"
                    />
                    <span className="text-sm">
                      {exerciseGoalLabelMap[goal]}
                    </span>
                  </label>
                ))}
              </div>
            )}
          />

          {errors.exerciseGoal && (
            <span className="text-red-500 text-sm">
              {errors.exerciseGoal.message as string}
            </span>
          )}
        </div>
        <div className="mt-3">
          <input
            {...register("exerciseGoalEtc")}
            placeholder="기타 체크시 입력 해주세요."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            목표 달성 기간
          </label>
          <textarea
            {...register("targetPeriod", {
              required: "목표 달성 기간을 입력해주세요",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none text-sm"
            placeholder="예: 3개월 안에 5kg 감량"
            rows={2}
          />
          {errors.targetPeriod && (
            <span className="text-red-500 text-sm">
              {errors.targetPeriod.message as string}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalSection;
