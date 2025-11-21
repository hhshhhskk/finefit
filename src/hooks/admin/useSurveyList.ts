import { getSurveyListApi } from "@/api/admin/surveyApi";
import { useQuery } from "@tanstack/react-query";

export interface Survey {
  id: number;
  name: string;
  phone: string;
  email: string;
  age: string;
  experience: string;
  goals: string[];
  availableTime: string;
  healthIssues: string;
  submittedAt: string;
  status: "pending" | "contacted" | "completed";
}

export const useSurveyList = () => {
  return useQuery<Survey[]>({
    queryKey: ["surveyList"],
    queryFn: getSurveyListApi,
    staleTime: 1000 * 60, // 1분 캐싱
  });
};
