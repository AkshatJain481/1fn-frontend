import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ApiError, EmiPlan, Variant } from "./interfaces";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`${backendUrl}/api/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: response.statusText,
        statusCode: response.status,
      }));

      throw {
        message: errorData.message || "An error occurred",
        statusCode: response.status,
        error: errorData.error,
      } as ApiError;
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw {
        message: "Network error. Please check your connection.",
        statusCode: 0,
      } as ApiError;
    }

    // Re-throw API errors
    throw error;
  }
}

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (mrp: number, price: number): number => {
  return Math.round(((mrp - price) / mrp) * 100);
};

/**
 * Format price to Indian currency
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Get product price range from variants
 */
export const getPriceRange = (
  variants: Variant[]
): { min: number; max: number } => {
  if (variants.length === 0) return { min: 0, max: 0 };

  const prices = variants.map((v) => v.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

/**
 * Get lowest EMI from plans
 */
export const getLowestEmi = (emiPlans: EmiPlan[]): number => {
  if (emiPlans.length === 0) return 0;

  const payments = emiPlans
    .filter((plan) => plan.isActive)
    .map((plan) => plan.monthlyPayment);

  return Math.min(...payments);
};
