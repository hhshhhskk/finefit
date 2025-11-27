export type CounselStatus = "WAITING" | "COMPLETED";

export interface SurveyDetail {
  name: string;
  contact: string;
  birthDateOrAge: string;
  gender: string;
  heightAndWeight: string;
  targetWeightOrBody: string;
  exerciseGoal: Record<string, boolean>;
  exerciseGoalEtc: string;
  targetPeriod: string;
  hasPtExperience: boolean;
  exerciseFrequency: string;
  exercise: Record<string, boolean>;
  exerciseEtc: string | null;
  preferredStyle: string;
  mealsPerDay: string;
  mealTimeRegularity: string;
  favoriteFoods: string;
  dietExperience: string;
  dietGoal: string;
  medicalHistory: string;
  medicationOrPrecautions: string;
  occupationAndActivity: string;
  sleepInfo: string;
  smoking: boolean;
  drinkingFrequency: string;
  stressLevel: number;
  exerciseObstacles: string;
  counselStatus: CounselStatus;
}

export const counselStatusLabelMap: Record<CounselStatus, string> = {
  WAITING: "대기중",
  COMPLETED: "상담 완료",
};
