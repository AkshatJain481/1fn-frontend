import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getZeroInterestEmiPlans } from "@/services/emiPlanService";
import type { EmiPlan } from "@/lib/interfaces";

export const useZeroInterestEmiPlans = (
  options?: Omit<UseQueryOptions<EmiPlan[], Error>, "queryKey" | "queryFn">
) =>
  useQuery({
    queryKey: ["emi-plans", "zero-interest"],
    queryFn: getZeroInterestEmiPlans,
    ...options,
  });
