export const rolePriority: Record<string, number> = {
  CEO: 6,
  DIRECTOR: 5,
  EXECUTIVE: 4,
  MANAGER: 3,
  TEAM_LEADER: 2,
  TRAINER: 1,
};

export function getRoleValue(role: string): number {
  return rolePriority[role] ?? 1;
}
