import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getProductById } from "@/services/productsService";
import type { Product } from "@/lib/interfaces";

export const useProductById = (
  id: string,
  options?: Omit<UseQueryOptions<Product, Error>, "queryKey" | "queryFn">
) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    ...options,
  });
