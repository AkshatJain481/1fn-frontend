import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { deleteProduct } from "@/services/productsService";

export const useDeleteProduct = (
  options?: Omit<UseMutationOptions<void, Error, string>, "mutationFn">
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["products", variables] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
    ...options,
  });
};
