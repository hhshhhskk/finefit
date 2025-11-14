import { Controller } from "react-hook-form";
import type { FormSectionProps } from "../types/form";
import {
  drinkingFrequencyLabelMap,
  drinkingFrequencyList,
  SMOKING_OPTIONS,
} from "../types/drinkingFrequency";

const LifeStyleSection = ({ register, errors, control }: FormSectionProps) => {
  return (
    <div>
      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        🛌 생활 습관
      </h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            직업
          </label>
          <input
            {...register("occupationAndActivity", {
              required: "직업을 입력해주세요",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors.occupationAndActivity && (
            <span className="text-red-500 text-sm">
              {errors.occupationAndActivity.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            평균 수면 시간
          </label>
          <input
            {...register("sleepInfo", {
              required: "평균 수면 시간을 입력해주세요",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="예: 7시간"
          />
          {errors.sleepInfo && (
            <span className="text-red-500 text-sm">
              {errors.sleepInfo.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            흡연 여부
          </label>

          <div className="flex gap-4">
            {SMOKING_OPTIONS.map(({ label, value }) => (
              <label key={label} className="flex items-center">
                <input
                  type="radio"
                  value={String(value)} // "true" / "false"
                  {...register("smoking", {
                    required: "흡연 여부를 선택해주세요",
                    setValueAs: (v) => v === "true", // string → boolean 변환
                  })}
                  className="mr-2"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>

          {errors.smoking && (
            <span className="text-red-500 text-sm">
              {errors.smoking.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            음주 여부
          </label>
          <Controller
            name="drinkingFrequency"
            control={control}
            rules={{ required: "음주 여부를 선택해주세요" }}
            render={({ field }) => (
              <div className="flex gap-4">
                {drinkingFrequencyList.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      value={option}
                      checked={field.value === option}
                      onChange={() => field.onChange(option)}
                      className="mr-2"
                    />
                    <span className="text-sm">
                      {drinkingFrequencyLabelMap[option]}
                    </span>
                  </label>
                ))}
              </div>
            )}
          />
          {errors.drinkingFrequency && (
            <span className="text-red-500 text-sm">
              {errors.drinkingFrequency.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            스트레스 정도
          </label>
          <input
            {...register("stressLevel", {
              required: "스트레스 정도를 입력해주세요",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="예: 낮음 / 보통 / 높음"
          />
          {errors.stressLevel && (
            <span className="text-red-500 text-sm">
              {errors.stressLevel.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            운동/식단 실천에 방해되는 요인
          </label>
          <textarea
            {...register("exerciseObstacles", {
              required: "방해 요인을 입력해주세요",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none text-sm"
            rows={2}
          />
          {errors.exerciseObstacles && (
            <span className="text-red-500 text-sm">
              {errors.exerciseObstacles.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LifeStyleSection;
