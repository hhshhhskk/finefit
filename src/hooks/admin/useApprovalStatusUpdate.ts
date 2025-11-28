// useUpdateApprovalStatus.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApprovalStatusApi } from "@/api/admin/approvalApi";

export const useUpdateApprovalStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      approvalStatus,
    }: {
      userId: string;
      approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
    }) => updateApprovalStatusApi(userId, approvalStatus),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvalList"] });
    },
  });
};
