import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getVariantById } from "@/services/variantService";
import type { Variant } from "@/lib/interfaces";

export const useVariantById = (
  id: string,
  options?: Omit<UseQueryOptions<Variant, Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["variants", id],
    queryFn: () => getVariantById(id),
    enabled: !!id,
    ...options,
  });
};
