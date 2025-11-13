import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getVariantsByProductId } from "@/services/variantService";
import type { Variant } from "@/lib/interfaces";

export const useVariantsByProductId = (
  productId: string,
  options?: Omit<UseQueryOptions<Variant[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["variants", "product", productId],
    queryFn: () => getVariantsByProductId(productId),
    enabled: !!productId,
    ...options,
  });
};
