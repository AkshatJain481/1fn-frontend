import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getCheapestEmiPlan } from "@/services/emiPlanService";
import type { EmiPlan } from "@/lib/interfaces";

export const useCheapestEmiPlan = (
  productId: string,
  options?: Omit<UseQueryOptions<EmiPlan, Error>, "queryKey" | "queryFn">
) =>
  useQuery({
    queryKey: ["emi-plans", "product", productId, "cheapest"],
    queryFn: () => getCheapestEmiPlan(productId),
    enabled: !!productId,
    ...options,
  });
