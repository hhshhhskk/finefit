import type { FieldErrors, UseFormRegister, Control } from "react-hook-form";
import type { GenderType } from "./gender";
import type { ExerciseGoalType } from "./exerciseGoal";
import type { ExerciseFrequencyType } from "./exerciseFrequency";
import type { ExerciseType } from "./exercise";
import type { ExerciseStyleType } from "./exerciseStyle";
import type { DrinkingFrequencyType } from "./drinkingFrequency";

export interface FormSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  control?: Control<FormData>;
}

export type FormData = {
  // 기본 정보
  name: string; // 회원 이름
  contact: string; // 연락처
  birthDateOrAge: string; // 생년월일 또는 나이
  gender: GenderType; // 성별
  heightAndWeight: string; // 키와 현재 체중(예: "175cm/70kg")
  targetWeightOrBody: string; // 희망 체중 또는 희망 체형, 운동 목표

  // 운동 목표
  exerciseGoal: Record<ExerciseGoalType, boolean>; // 운동 목적(복수선택가능)
  exerciseGoalEtc: string; // 운동 목적이 '기타'인 경우 상세내용
  targetPeriod: string; // 목표 달성을 원하는 기간

  // 운동 경험
  hasPtExperience: boolean; // 이전 퍼스널 트레이닝 경험여부
  exerciseFrequency: ExerciseFrequencyType; // 평소 운동 빈도
  exercise: Record<ExerciseType, boolean>; // 해본 운동 종류 (복수선택가능)
  exerciseTypeEtc: string; // 운동 종류가 '기타'인 경우 상세 내용
  preferredStyle: Record<ExerciseStyleType, boolean>; // 운동 시 선호하는 스타일 (복수선택가능)

  // 식습관
  mealsPerDay: string; // 하루 평균 식사 횟수
  mealTimeRegularity: string; // 식사 시간 규칙성 여부
  favoriteFoods: string; // 평소 즐겨 먹는 음식 / 자주 먹는 간식
  dietExperience: string; // 식단 조절 또는 다이어트 경험
  dietGoal: string; // 현재 식단에 대한 고민이나 목표

  // 건강 상태
  medicalHistory: string; // 현재 또는 과거 질환이나 통증
  medicationOrPrecautions: string; // 복용 중인 약이나 주의해야 할 사항

  // 생활 습관
  occupationAndActivity: string; // 직업 및 평소 활동량
  sleepInfo: string; // 하루 평균 수면 시간과 수면 질
  smoking: boolean; // 흡연 여부
  drinkingFrequency: DrinkingFrequencyType; // 음주 빈도
  stressLevel: number; // 하루 평균 스트레스 수준 (1~5점)
  exerciseObstacles: string; // 운동을 방해할 수 있는 요인
};
