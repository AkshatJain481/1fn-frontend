import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getEmiPlansByTenure } from "@/services/emiPlanService";
import type { EmiPlan } from "@/lib/interfaces";

export const useEmiPlansByTenure = (
  tenure: number,
  options?: Omit<UseQueryOptions<EmiPlan[], Error>, "queryKey" | "queryFn">
) =>
  useQuery({
    queryKey: ["emi-plans", "tenure", tenure],
    queryFn: () => getEmiPlansByTenure(tenure),
    enabled: !!tenure,
    ...options,
  });
