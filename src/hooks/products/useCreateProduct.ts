import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { createProduct } from "@/services/productsService";
import type { Product, CreateProductDto } from "@/lib/interfaces";

export const useCreateProduct = (
  options?: Omit<
    UseMutationOptions<Product, Error, CreateProductDto>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};
