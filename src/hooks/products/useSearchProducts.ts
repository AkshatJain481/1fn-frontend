import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { searchProducts } from "@/services/productsService";
import type { Product } from "@/lib/interfaces";

export const useSearchProducts = (
  query: string,
  options?: Omit<UseQueryOptions<Product[], Error>, "queryKey" | "queryFn">
) =>
  useQuery({
    queryKey: ["products", "search", query],
    queryFn: () => searchProducts(query),
    enabled: query.length > 0,
    ...options,
  });
