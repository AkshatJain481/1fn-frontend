import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { createEmiPlan } from "@/services/emiPlanService";
import type { EmiPlan, CreateEmiPlanDto } from "@/lib/interfaces";

export const useCreateEmiPlan = (
  options?: Omit<
    UseMutationOptions<EmiPlan, Error, CreateEmiPlanDto>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmiPlan,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["emi-plans"] });
      // Also invalidate product's EMI plans
      queryClient.invalidateQueries({
        queryKey: ["emi-plans", "product", variables.productId],
      });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
    ...options,
  });
};
