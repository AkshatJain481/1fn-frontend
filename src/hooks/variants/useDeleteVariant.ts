import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { deleteVariant } from "@/services/variantService";

export const useDeleteVariant = (
  options?: Omit<UseMutationOptions<void, Error, string>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVariant,
    onSuccess: (data, variables, onMutateResult, context) => {
      // Remove variant from cache
      queryClient.removeQueries({ queryKey: ["variants", variables] });
      // Invalidate all variants list
      queryClient.invalidateQueries({ queryKey: ["variants"] });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
    ...options,
  });
};
