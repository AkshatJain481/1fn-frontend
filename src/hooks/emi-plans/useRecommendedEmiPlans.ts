import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getRecommendedEmiPlans } from "@/services/emiPlanService";
import type { EmiPlan } from "@/lib/interfaces";

export const useRecommendedEmiPlans = (
  productId: string,
  options?: Omit<UseQueryOptions<EmiPlan[], Error>, "queryKey" | "queryFn">
) =>
  useQuery({
    queryKey: ["emi-plans", "product", productId, "recommended"],
    queryFn: () => getRecommendedEmiPlans(productId),
    enabled: !!productId,
    ...options,
  });
