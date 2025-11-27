import { useQuery } from "@tanstack/react-query";
import { getApprovalListApi } from "@/api/admin/approvalApi";
import type { ApprovedData } from "@/pages/admin/types/approval";

export const useApprovalList = (approvalStatus: string | null) => {
  return useQuery<ApprovedData[]>({
    queryKey: ["approvalList", approvalStatus], // 필터별 캐싱
    queryFn: () => getApprovalListApi(approvalStatus),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
