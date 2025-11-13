import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { updateVariant } from "@/services/variantService";
import type { Variant, CreateVariantDto } from "@/lib/interfaces";

interface UpdateVariantVariables {
  id: string;
  data: Partial<CreateVariantDto>;
}

export const useUpdateVariant = (
  options?: Omit<
    UseMutationOptions<Variant, Error, UpdateVariantVariables>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateVariantVariables) =>
      updateVariant(id, data),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["variants", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["variants"] });
      queryClient.invalidateQueries({
        queryKey: ["variants", "product", data.productId],
      });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
    ...options,
  });
};
