import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getSortedEmiPlans } from "@/services/emiPlanService";
import type { EmiPlan } from "@/lib/interfaces";

export const useSortedEmiPlans = (
  productId: string,
  order: "asc" | "desc" = "asc",
  options?: Omit<UseQueryOptions<EmiPlan[], Error>, "queryKey" | "queryFn">
) =>
  useQuery({
    queryKey: ["emi-plans", "product", productId, "sorted", order],
    queryFn: () => getSortedEmiPlans(productId, order),
    enabled: !!productId,
    ...options,
  });
