import type { FormSectionProps } from "../types/form";

const DietHabitSection = ({ register, errors }: FormSectionProps) => {
  return (
    <div>
      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        🥗 식습관
      </h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            하루 식사 횟수
          </label>
          <input
            {...register("mealsPerDay", {
              required: "하루 식사 횟수를 입력해주세요",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="예: 3회"
          />
          {errors.mealsPerDay && (
            <span className="text-red-500 text-sm">
              {errors.mealsPerDay.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            규칙적인 식사 여부
          </label>
          <input
            {...register("mealTimeRegularity", {
              required: "식사 규칙성을 입력해주세요",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="예: 규칙적 / 불규칙적"
          />
          {errors.mealTimeRegularity && (
            <span className="text-red-500 text-sm">
              {errors.mealTimeRegularity.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            선호 음식 / 좋아하는 음식
          </label>
          <input
            {...register("favoriteFoods", {
              required: "선호 음식을 입력해주세요",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="예: 치킨, 샐러드 등"
          />
          {errors.favoriteFoods && (
            <span className="text-red-500 text-sm">
              {errors.favoriteFoods.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            다이어트 경험
          </label>
          <textarea
            {...register("dietExperience", {
              required: "다이어트 경험을 입력해주세요",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none text-sm"
            rows={2}
          />
          {errors.dietExperience && (
            <span className="text-red-500 text-sm">
              {errors.dietExperience.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            목표 식습관 / 식단 목표
          </label>
          <textarea
            {...register("dietGoal", { required: "식단 목표를 입력해주세요" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none text-sm"
            rows={2}
          />
          {errors.dietGoal && (
            <span className="text-red-500 text-sm">
              {errors.dietGoal.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietHabitSection;
