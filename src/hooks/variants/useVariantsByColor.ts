import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getVariantsByColor } from "@/services/variantService";
import type { Variant } from "@/lib/interfaces";

export const useVariantsByColor = (
  color: string,
  options?: Omit<UseQueryOptions<Variant[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["variants", "color", color],
    queryFn: () => getVariantsByColor(color),
    enabled: !!color,
    ...options,
  });
};
