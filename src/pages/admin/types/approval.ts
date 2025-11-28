export interface ApprovedData {
  userId: string;
  trainerId: string;
  trainerName: string;
  connect: string;
  createAt: string;
  storeNumber: string;
  role: string;
  team: string;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
}
