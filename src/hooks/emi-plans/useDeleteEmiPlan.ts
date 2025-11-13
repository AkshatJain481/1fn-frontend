import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { deleteEmiPlan } from "@/services/emiPlanService";

export const useDeleteEmiPlan = (
  options?: Omit<UseMutationOptions<void, Error, string>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmiPlan,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.removeQueries({ queryKey: ["emi-plans", variables] });
      queryClient.invalidateQueries({ queryKey: ["emi-plans"] });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
    ...options,
  });
};
