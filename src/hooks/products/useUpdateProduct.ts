import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { updateProduct } from "@/services/productsService";
import type { Product, CreateProductDto } from "@/lib/interfaces";

interface UpdateProductVariables {
  id: string;
  data: Partial<CreateProductDto>;
}

export const useUpdateProduct = (
  options?: Omit<
    UseMutationOptions<Product, Error, UpdateProductVariables>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: UpdateProductVariables) =>
      updateProduct(id, data),
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: ["products", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};
