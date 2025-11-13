import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getEmiPlansByProductId } from "@/services/emiPlanService";
import type { EmiPlan } from "@/lib/interfaces";

export const useEmiPlansByProductId = (
  productId: string,
  options?: Omit<UseQueryOptions<EmiPlan[], Error>, "queryKey" | "queryFn">
) =>
  useQuery({
    queryKey: ["emi-plans", "product", productId],
    queryFn: () => getEmiPlansByProductId(productId),
    enabled: !!productId,
    ...options,
  });
