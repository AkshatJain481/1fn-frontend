import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { checkVariantStock } from "@/services/variantService";

export const useCheckVariantStock = (
  id: string,
  options?: Omit<
    UseQueryOptions<{ inStock: boolean }, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["variants", id, "stock"],
    queryFn: () => checkVariantStock(id),
    enabled: !!id,
    staleTime: 1000 * 60,
    ...options,
  });
};
