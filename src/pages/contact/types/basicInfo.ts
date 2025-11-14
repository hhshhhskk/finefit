export type Gender = "MALE" | "FEMALE" | "OTHER";

export const GENDER_OPTIONS: { label: string; value: Gender }[] = [
  { label: "남성", value: "MALE" },
  { label: "여성", value: "FEMALE" },
  { label: "기타", value: "OTHER" },
];
