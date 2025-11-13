import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { updateEmiPlan } from "@/services/emiPlanService";
import type { EmiPlan, CreateEmiPlanDto } from "@/lib/interfaces";

interface UpdateEmiPlanVariables {
  id: string;
  data: Partial<CreateEmiPlanDto>;
}

export const useUpdateEmiPlan = (
  options?: Omit<
    UseMutationOptions<EmiPlan, Error, UpdateEmiPlanVariables>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateEmiPlanVariables) =>
      updateEmiPlan(id, data),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["emi-plans", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["emi-plans"] });
      queryClient.invalidateQueries({
        queryKey: ["emi-plans", "product", data.productId],
      });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
    ...options,
  });
};
