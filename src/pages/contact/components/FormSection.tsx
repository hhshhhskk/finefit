import { useForm } from "react-hook-form";
import BasicInfoSection from "./BasicInfoSection";
import GoalSection from "./GoalSection";
import ExperienceSection from "./ExperienceSection";
import DietHabitSection from "./DietHabitSection";
import LifeStyleSection from "./LifeStyleSection";
import ConditionSection from "./ConditionSection";
import type { FormData } from "../types/form";
import type { GenderType } from "../types/gender";
import { exerciseGoalList, type ExerciseGoalType } from "../types/exerciseGoal";
import {
  exerciseFrequencyList,
  type ExerciseFrequencyType,
} from "../types/exerciseFrequency";
import { exerciseTypeList, type ExerciseType } from "../types/exercise";
import {
  exerciseStyleList,
  type ExerciseStyleType,
} from "../types/exerciseStyle";
import type { DrinkingFrequencyType } from "../types/drinkingFrequency";
import { submitSurveyApi } from "@/api/user/contact";

export default function FormSection() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: {
      // 기본 정보
      name: "",
      contact: "",
      birthDateOrAge: "",
      gender: "" as unknown as GenderType,
      heightAndWeight: "",
      targetWeightOrBody: "",

      // 운동 목표
      exerciseGoal: exerciseGoalList.reduce((acc, goal) => {
        acc[goal] = false;
        return acc;
      }, {} as Record<ExerciseGoalType, boolean>),
      exerciseGoalEtc: "",
      targetPeriod: "",

      // 운동 경험
      hasPtExperience: false,
      exerciseFrequency: "" as unknown as ExerciseFrequencyType,
      exercise: exerciseTypeList.reduce((acc, ex) => {
        acc[ex] = false;
        return acc;
      }, {} as Record<ExerciseType, boolean>),
      exerciseTypeEtc: "",
      preferredStyle: exerciseStyleList.reduce((acc, style) => {
        acc[style] = false;
        return acc;
      }, {} as Record<ExerciseStyleType, boolean>),

      // 식습관
      mealsPerDay: "",
      mealTimeRegularity: "",
      favoriteFoods: "",
      dietExperience: "",
      dietGoal: "",

      // 건강 상태
      medicalHistory: "",
      medicationOrPrecautions: "",

      // 생활 습관
      occupationAndActivity: "",
      sleepInfo: "",
      smoking: false,
      drinkingFrequency: "" as unknown as DrinkingFrequencyType,
      stressLevel: 1,
      exerciseObstacles: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      submitSurveyApi(data);
    } catch (err) {
      alert("신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* 기본 정보 */}
      <BasicInfoSection register={register} errors={errors} />

      {/* 운동 목표 */}
      <GoalSection register={register} errors={errors} control={control} />

      {/* 운동 경험 */}
      <ExperienceSection
        register={register}
        errors={errors}
        control={control}
      />

      {/* 식습관 */}
      <DietHabitSection register={register} errors={errors} />

      {/* 건강 상태 */}
      <ConditionSection register={register} errors={errors} />

      {/* 생활 습관 */}
      <LifeStyleSection register={register} errors={errors} control={control} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-6 rounded-lg transition-colors"
      >
        {isSubmitting ? "처리 중..." : "상담 신청하기"}
      </button>
    </form>
  );
}
