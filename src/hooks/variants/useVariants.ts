import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getAllVariants } from "@/services/variantService";
import type { Variant } from "@/lib/interfaces";

export const useVariants = (
  options?: Omit<UseQueryOptions<Variant[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["variants"],
    queryFn: getAllVariants,
    ...options,
  });
};
