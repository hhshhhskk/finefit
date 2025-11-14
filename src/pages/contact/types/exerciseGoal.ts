export type ExerciseGoalType =
  | "WEIGHT_LOSS"
  | "WEIGHT_GAIN"
  | "POSTURE_CORRECTION"
  | "STRENGTH_INCREASE"
  | "HEALTH_MANAGEMENT"
  | "PAIN_RELIEF"
  | "POSTURE_ADJUSTMENT"
  | "ETC";

// 운동 목표 라벨 매핑
export const exerciseGoalLabelMap: Record<ExerciseGoalType, string> = {
  WEIGHT_LOSS: "체중 감량 / 다이어트",
  WEIGHT_GAIN: "체중 증가 / 벌크업",
  POSTURE_CORRECTION: "체형 교정",
  STRENGTH_INCREASE: "근력 향상",
  HEALTH_MANAGEMENT: "건강 관리 / 체력 증가",
  PAIN_RELIEF: "통증 개선",
  POSTURE_ADJUSTMENT: "자세 교정",
  ETC: "기타",
};

export const exerciseGoalList: ExerciseGoalType[] = Object.keys(
  exerciseGoalLabelMap
) as ExerciseGoalType[];
