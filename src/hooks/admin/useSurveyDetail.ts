import { getSurveyDetailApi } from "@/api/admin/surveyApi";
import { useQuery } from "@tanstack/react-query";

export const useSurveyDetail = (counselId: string) => {
  return useQuery({
    queryKey: ["surveyDetail", counselId],
    queryFn: () => getSurveyDetailApi(counselId),
    enabled: !!counselId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
