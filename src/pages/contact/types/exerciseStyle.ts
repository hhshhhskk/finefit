export type ExerciseStyleType =
  | "DETAILED_POSTURE"
  | "HIGH_INTENSITY"
  | "FUN_AND_LIGHT"
  | "CUSTOMIZED";

// 운동 스타일 라벨 매핑
export const exerciseStyleLabelMap: Record<ExerciseStyleType, string> = {
  DETAILED_POSTURE: "꼼꼼한 자세 교정",
  HIGH_INTENSITY: "땀나는 고강도 운동",
  FUN_AND_LIGHT: "재밌고 가벼운 운동",
  CUSTOMIZED: "맞춤 조절",
};

// 반복용 배열
export const exerciseStyleList: ExerciseStyleType[] = Object.keys(
  exerciseStyleLabelMap
) as ExerciseStyleType[];
