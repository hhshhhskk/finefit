import { Controller } from "react-hook-form";
import type { FormSectionProps } from "../types/form";
import {
  exerciseFrequencyLabelMap,
  exerciseFrequencyList,
} from "../types/exerciseFrequency";
import {
  exerciseTypeLabelMap,
  exerciseTypeList,
  PT_EXPERIENCE_OPTIONS,
} from "../types/exercise";
import {
  exerciseStyleLabelMap,
  exerciseStyleList,
} from "../types/exerciseStyle";

const ExperienceSection = ({ register, errors, control }: FormSectionProps) => {
  return (
    <div>
      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        🏋️‍♀️ 운동 경험
      </h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            이전 PT 경험
          </label>

          <div className="flex gap-4">
            {PT_EXPERIENCE_OPTIONS.map(({ label, value }) => (
              <label key={label} className="flex items-center">
                <input
                  type="radio"
                  value={String(value)}
                  {...register("hasPtExperience", {
                    required: "선택해주세요",
                    setValueAs: (v) => v === "true",
                  })}
                  className="mr-2"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>

          {errors.hasPtExperience && (
            <span className="text-red-500 text-sm">
              {errors.hasPtExperience.message as string}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            운동 빈도
          </label>
          <div className="flex gap-4">
            {exerciseFrequencyList.map((freq) => (
              <label key={freq} className="flex items-center">
                <input
                  type="radio"
                  value={freq}
                  {...register("exerciseFrequency", {
                    required: "선택해주세요",
                  })}
                  className="mr-2"
                />
                <span className="text-sm">
                  {exerciseFrequencyLabelMap[freq]}
                </span>
              </label>
            ))}
          </div>
          {errors.exerciseFrequency && (
            <span className="text-red-500 text-sm">
              {errors.exerciseFrequency.message as string}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            운동 종류 (복수 선택)
          </label>
          <Controller
            name="exercise"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-2">
                {exerciseTypeList.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={field.value[type] || false}
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          [type]: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    <span className="text-sm">
                      {exerciseTypeLabelMap[type]}
                    </span>
                  </label>
                ))}
              </div>
            )}
          />

          {errors.exercise && (
            <span className="text-red-500 text-sm">
              {errors.exercise.message as string}
            </span>
          )}
        </div>
        <div className="mt-3">
          <input
            {...register("exerciseTypeEtc")}
            placeholder="기타 체크시 입력 해주세요."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-707 mb-2">
            운동 스타일 선호
          </label>
          <div className="flex gap-4">
            {exerciseStyleList.map((style) => (
              <label key={style} className="flex items-center">
                <input
                  type="radio"
                  value={style}
                  {...register("preferredStyle", { required: "선택해주세요" })}
                  className="mr-2"
                />
                <span className="text-sm">{exerciseStyleLabelMap[style]}</span>
              </label>
            ))}
          </div>
          {errors.preferredStyle && (
            <span className="text-red-500 text-sm">
              {errors.preferredStyle.message as string}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
