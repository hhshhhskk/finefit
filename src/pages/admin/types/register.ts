export type Role =
  | "CEO"
  | "DIRECTOR"
  | "EXECUTIVE"
  | "MANAGER"
  | "TEAM_LEADER"
  | "TRAINER";

export const ROLE_MAP: Record<Role, { label: string; level: number }> = {
  CEO: { label: "대표", level: 6 },
  DIRECTOR: { label: "이사", level: 5 },
  EXECUTIVE: { label: "실장", level: 4 },
  MANAGER: { label: "매니저", level: 3 },
  TEAM_LEADER: { label: "팀장", level: 2 },
  TRAINER: { label: "트레이너", level: 1 },
};

export interface RegisterData {
  trainerId: string;
  password: string;
  confirmPassword: string;
  trainerName: string;
  connect: string;
  storeNumber: string;
  role: Role;
  team: string;
}
