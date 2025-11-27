import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SurveyStatusUpdateApi } from "@/api/admin/surveyApi";

export const useSurveyStatusUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      counselId,
      counselStatus,
    }: {
      counselId: string;
      counselStatus: string;
    }) => SurveyStatusUpdateApi(counselId, counselStatus),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["surveyDetail"] });
      queryClient.invalidateQueries({ queryKey: ["surveyList"] });
    },
  });
};
