import api from "./api";

export const getApprovalListApi = async (counselStatus: string | null) => {
  if (counselStatus) {
    // 필터링(승인 대기 / 승인 완료 / 승인 거부)
    const res = await api.get(`/operator/approval?approvalStatus=PENDING`);
    return res.data.data;
  }
  // 전체 조회 (파라미터 없음)
  const res = await api.get(`/operator/approval`);
  return res.data.data;
};
