import type { CreateEmiPlanDto, EmiPlan } from "@/lib/interfaces";
import { fetchAPI } from "@/lib/utils";

/**
 * Create a new EMI plan
 */
export const createEmiPlan = async (
  emiPlanData: CreateEmiPlanDto
): Promise<EmiPlan> => {
  return fetchAPI<EmiPlan>("emi-plans", {
    method: "POST",
    body: JSON.stringify(emiPlanData),
  });
};

/**
 * Update an existing EMI plan by ID
 */
export const updateEmiPlan = async (
  id: string,
  updateData: Partial<CreateEmiPlanDto>
): Promise<EmiPlan> => {
  return fetchAPI<EmiPlan>(`emi-plans/${id}`, {
    method: "PUT",
    body: JSON.stringify(updateData),
  });
};

/**
 * Delete an EMI plan by ID
 */
export const deleteEmiPlan = async (id: string): Promise<void> => {
  return fetchAPI<void>(`emi-plans/${id}`, {
    method: "DELETE",
  });
};

/**
 * Get all active EMI plans
 */
export const getAllEmiPlans = async (): Promise<EmiPlan[]> => {
  return fetchAPI<EmiPlan[]>("emi-plans");
};

/**
 * Get a single EMI plan by ID
 */
export const getEmiPlanById = async (id: string): Promise<EmiPlan> => {
  return fetchAPI<EmiPlan>(`emi-plans/${id}`);
};

/**
 * Get all EMI plans for a specific product
 */
export const getEmiPlansByProductId = async (
  productId: string
): Promise<EmiPlan[]> => {
  return fetchAPI<EmiPlan[]>(`emi-plans/product/${productId}`);
};

/**
 * Get recommended EMI plans for a product
 */
export const getRecommendedEmiPlans = async (
  productId: string
): Promise<EmiPlan[]> => {
  return fetchAPI<EmiPlan[]>(`emi-plans/product/${productId}/recommended`);
};

/**
 * Get the cheapest EMI plan for a product
 */
export const getCheapestEmiPlan = async (
  productId: string
): Promise<EmiPlan> => {
  return fetchAPI<EmiPlan>(`emi-plans/product/${productId}/cheapest`);
};

/**
 * Get EMI plans by tenure (duration in months)
 */
export const getEmiPlansByTenure = async (
  tenure: number
): Promise<EmiPlan[]> => {
  return fetchAPI<EmiPlan[]>(`emi-plans/tenure/${tenure}`);
};

/**
 * Get all zero-interest EMI plans
 */
export const getZeroInterestEmiPlans = async (): Promise<EmiPlan[]> => {
  return fetchAPI<EmiPlan[]>("emi-plans/zero-interest");
};

/**
 * Get EMI plans sorted by monthly payment
 */
export const getSortedEmiPlans = async (
  productId: string,
  order: "asc" | "desc" = "asc"
): Promise<EmiPlan[]> => {
  return fetchAPI<EmiPlan[]>(
    `emi-plans/product/${productId}/sorted?order=${order}`
  );
};


