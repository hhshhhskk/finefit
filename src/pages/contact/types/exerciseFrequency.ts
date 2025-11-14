export type ExerciseFrequencyType = "NEVER" | "SOMETIMES" | "REGULARLY";

// 운동 빈도 라벨 매핑
export const exerciseFrequencyLabelMap: Record<ExerciseFrequencyType, string> =
  {
    NEVER: "전혀 하지 않음",
    SOMETIMES: "가끔 (주 1~2회)",
    REGULARLY: "규칙적으로 (주 3회 이상)",
  };

export const exerciseFrequencyList: ExerciseFrequencyType[] = Object.keys(
  exerciseFrequencyLabelMap
).map((key) => key as ExerciseFrequencyType);
