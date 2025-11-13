import type {
    Product,
    CreateProductDto,
} from "@/lib/interfaces";
import { fetchAPI } from "@/lib/utils";

/**
 * Get all products with variants and EMI plans populated
 */
export const getAllProducts = async (): Promise<Product[]> => {
  return fetchAPI<Product[]>("products");
};

/**
 * Get a single product by ID
 */
export const getProductById = async (id: string): Promise<Product> => {
  return fetchAPI<Product>(`products/${id}`);
};

/**
 * Get a product by slug (SEO-friendly URL)
 */
export const getProductBySlug = async (slug: string): Promise<Product> => {
  return fetchAPI<Product>(`products/slug/${slug}`);
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  return fetchAPI<Product[]>(`products/category/${category}`);
};

/**
 * Search products by query string
 */
export const searchProducts = async (query: string): Promise<Product[]> => {
  return fetchAPI<Product[]>(`products/search?q=${encodeURIComponent(query)}`);
};

/**
 * Create a new product
 */
export const createProduct = async (
  productData: CreateProductDto
): Promise<Product> => {
  return fetchAPI<Product>("products", {
    method: "POST",
    body: JSON.stringify(productData),
  });
};

/**
 * Update an existing product
 */
export const updateProduct = async (
  id: string,
  productData: Partial<CreateProductDto>
): Promise<Product> => {
  return fetchAPI<Product>(`products/${id}`, {
    method: "PUT",
    body: JSON.stringify(productData),
  });
};

/**
 * Delete a product (also deletes associated variants and EMI plans)
 */
export const deleteProduct = async (id: string): Promise<void> => {
  return fetchAPI<void>(`products/${id}`, {
    method: "DELETE",
  });
};

