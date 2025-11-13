import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getVariantsByStorage } from "@/services/variantService";
import type { Variant } from "@/lib/interfaces";

export const useVariantsByStorage = (
  storage: string,
  options?: Omit<UseQueryOptions<Variant[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["variants", "storage", storage],
    queryFn: () => getVariantsByStorage(storage),
    enabled: !!storage,
    ...options,
  });
};
