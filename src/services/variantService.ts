import { fetchAPI } from "@/lib/utils";
import type { CreateVariantDto, Variant } from "@/lib/interfaces";

/**
 * Get all variants
 */
export const getAllVariants = async (): Promise<Variant[]> => {
  return fetchAPI<Variant[]>("variants");
};

/**
 * Get a single variant by ID
 */
export const getVariantById = async (id: string): Promise<Variant> => {
  return fetchAPI<Variant>(`variants/${id}`);
};

/**
 * Update variant by ID
 */
export const updateVariant = async (
  id: string,
  updateData: Partial<CreateVariantDto>
): Promise<Variant> => {
  return fetchAPI<Variant>(`variants/${id}`, {
    method: "PUT",
    body: JSON.stringify(updateData),
  });
};

/**
 * Get all variants for a specific product
 */
export const getVariantsByProductId = async (
  productId: string
): Promise<Variant[]> => {
  return fetchAPI<Variant[]>(`variants/product/${productId}`);
};

/**
 * Get variants by color
 */
export const getVariantsByColor = async (color: string): Promise<Variant[]> => {
  return fetchAPI<Variant[]>(`variants/color/${color}`);
};

/**
 * Get variants by storage
 */
export const getVariantsByStorage = async (
  storage: string
): Promise<Variant[]> => {
  return fetchAPI<Variant[]>(`variants/storage/${storage}`);
};

/**
 * Check if a variant is in stock
 */
export const checkVariantStock = async (
  id: string
): Promise<{ inStock: boolean }> => {
  return fetchAPI<{ inStock: boolean }>(`variants/${id}/stock`);
};

/**
 * create a variant
 */
export const createVariant = async (
  variantData: CreateVariantDto
): Promise<Variant> => {
  return fetchAPI<Variant>("variants", {
    method: "POST",
    body: JSON.stringify(variantData),
  });
};