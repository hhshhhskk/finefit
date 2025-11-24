import { getSurveyListApi } from "@/api/admin/surveyApi";
import { useQuery } from "@tanstack/react-query";

export interface SurveyList {
  contact: string;
  counselId: number;
  counselStatus: string;
  createAt: string;
  name: string;
}

export const useSurveyList = (counselStatus: string | null) => {
  return useQuery<SurveyList[]>({
    queryKey: ["surveyList", counselStatus],
    queryFn: ({ queryKey }) => {
      const [_key, status] = queryKey;
      return getSurveyListApi(status as string);
    },
    staleTime: 1000 * 60 * 5, 
  });
};
