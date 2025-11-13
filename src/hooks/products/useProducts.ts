import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getAllProducts } from "@/services/productsService";
import type { Product } from "@/lib/interfaces";

export const useProducts = (
  options?: Omit<UseQueryOptions<Product[], Error>, "queryKey" | "queryFn">
) =>
  useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    ...options,
  });
