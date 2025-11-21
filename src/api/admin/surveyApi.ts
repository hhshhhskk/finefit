import api from "./api";

// 설문지 리스트 조회
export const getSurveyListApi = async () => {
  const res = await api.get(`/operator/counsel`);

  return res.data;
};
