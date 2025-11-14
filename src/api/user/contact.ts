import type { FormData } from "@/pages/contact/types/form";
import axios from "axios";

const url = `${import.meta.env.VITE_API_BASE_URL}/counsel/write`;

export const submitSurveyApi = async (answers: FormData) => {
  try {
    const res = await axios.post(url, answers);
    console.log(res.data);

    alert("설문이 제출되었습니다!");
  } catch (error) {
    console.error(error);
    alert("설문 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
  }
};
