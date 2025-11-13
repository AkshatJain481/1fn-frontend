import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getAllEmiPlans } from "@/services/emiPlanService";
import type { EmiPlan } from "@/lib/interfaces";

export const useEmiPlans = (
  options?: Omit<UseQueryOptions<EmiPlan[], Error>, "queryKey" | "queryFn">
) =>
  useQuery({
    queryKey: ["emi-plans"],
    queryFn: getAllEmiPlans,
    ...options,
  });
