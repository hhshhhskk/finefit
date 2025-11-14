export type ExerciseType =
  | "GYM"
  | "CARDIO"
  | "HOME_TRAINING"
  | "PILATES_YOGA"
  | "MARTIAL_ARTS_CROSSFIT"
  | "ETC";

export type YesNoBoolean = boolean;

export const PT_EXPERIENCE_OPTIONS: { label: string; value: YesNoBoolean }[] = [
  { label: "예", value: true },
  { label: "아니오", value: false },
];

// 운동 종류 라벨 매핑
export const exerciseTypeLabelMap: Record<ExerciseType, string> = {
  GYM: "헬스장 운동",
  CARDIO: "유산소 운동",
  HOME_TRAINING: "홈트레이닝",
  PILATES_YOGA: "필라테스 / 요가",
  MARTIAL_ARTS_CROSSFIT: "격투기 / 크로스핏 등",
  ETC: "기타",
};

export const exerciseTypeList: ExerciseType[] = Object.keys(
  exerciseTypeLabelMap
) as ExerciseType[];
