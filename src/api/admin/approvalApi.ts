import api from "./api";

// 관리자 회원가입 승인 리스트
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

// 관리자 승인 및 거부

export const updateApprovalStatusApi = async (
  userId: string,
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED"
) => {
  const res = await api.put(
    `/operator/approval?userId=${userId}&approvalStatus=${approvalStatus}`
  );

  return res.data.data;
};
