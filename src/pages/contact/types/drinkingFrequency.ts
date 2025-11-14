export type DrinkingFrequencyType = "RARELY" | "SOMETIMES" | "OFTEN";

export type YesNoBoolean = boolean;

export const SMOKING_OPTIONS: { label: string; value: YesNoBoolean }[] = [
  { label: "예", value: true },
  { label: "아니오", value: false },
];

export const drinkingFrequencyLabelMap: Record<DrinkingFrequencyType, string> =
  {
    RARELY: "거의 안 함",
    SOMETIMES: "가끔 (주 1회 이하)",
    OFTEN: "자주 (주 2회 이상)",
  };

export const drinkingFrequencyList: DrinkingFrequencyType[] = [
  "RARELY",
  "SOMETIMES",
  "OFTEN",
];
