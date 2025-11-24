import api from "./api";

// 설문지 리스트 조회
export const getSurveyListApi = async (counselStatus: string | null) => {
  if (counselStatus) {
    // 필터링(대기중 / 완료)
    const res = await api.get(
      `/operator/counsel?counselStatus=${counselStatus}`
    );
    return res.data.data;
  }

  // 전체 조회 (파라미터 없음)
  const res = await api.get(`/operator/counsel`);
  return res.data.data;
};

// 설문지 상세 조회
export const getSurveyDetailApi = async (counselId: string) => {
  const res = await api.get(`/operator/counsel/${counselId}`);
  return res.data.data;
};
