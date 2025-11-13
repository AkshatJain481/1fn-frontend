import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getProductsByCategory } from "@/services/productsService";
import type { Product } from "@/lib/interfaces";

export const useProductsByCategory = (
  category: string,
  options?: Omit<UseQueryOptions<Product[], Error>, "queryKey" | "queryFn">
) =>
  useQuery({
    queryKey: ["products", "category", category],
    queryFn: () => getProductsByCategory(category),
    enabled: !!category,
    ...options,
  });
