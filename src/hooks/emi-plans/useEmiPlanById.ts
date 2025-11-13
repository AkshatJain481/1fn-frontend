import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getEmiPlanById } from "@/services/emiPlanService";
import type { EmiPlan } from "@/lib/interfaces";

export const useEmiPlanById = (
  id: string,
  options?: Omit<UseQueryOptions<EmiPlan, Error>, "queryKey" | "queryFn">
) =>
  useQuery({
    queryKey: ["emi-plans", id],
    queryFn: () => getEmiPlanById(id),
    enabled: !!id,
    ...options,
  });
