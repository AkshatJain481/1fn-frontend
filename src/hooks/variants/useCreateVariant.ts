import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { createVariant } from "@/services/variantService";
import type { Variant, CreateVariantDto } from "@/lib/interfaces";

export const useCreateVariant = (
  options?: Omit<
    UseMutationOptions<Variant, Error, CreateVariantDto>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVariant,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["variants"] });
      queryClient.invalidateQueries({
        queryKey: ["variants", "product", variables.productId],
      });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
    ...options,
  });
};
