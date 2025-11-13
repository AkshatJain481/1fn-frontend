import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getProductBySlug } from "@/services/productsService";
import type { Product } from "@/lib/interfaces";

export const useProductBySlug = (
  slug: string,
  options?: Omit<UseQueryOptions<Product, Error>, "queryKey" | "queryFn">
) =>
  useQuery({
    queryKey: ["products", "slug", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
    ...options,
  });
