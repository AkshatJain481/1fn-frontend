export interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  basePrice: number;
  mrp: number;
  images: string[];
  variants: string[];
  emiPlans: string[];
  inStock: boolean;
  specifications: Record<string, any>;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Variant {
  _id: string;
  productId: string;
  storage: string;
  color: string;
  price: number;
  mrp: number;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmiPlan {
  _id: string;
  productId: string;
  tenure: number;
  monthlyPayment: number;
  interestRate: number;
  processingFee: number;
  downPayment: number;
  cashback: number;
  description: string;
  isActive: boolean;
  isRecommended: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  brand: string;
  category: string;
  description: string;
  basePrice: number;
  mrp: number;
  images: string[];
  slug: string;
  inStock?: boolean;
  specifications?: Record<string, any>;
}

export interface CreateVariantDto {
  productId: string;
  storage: string;
  color: string;
  price: number;
  mrp: number;
  inStock?: boolean;
  stockQuantity?: number;
  sku?: string;
}

export interface CreateEmiPlanDto {
  productId: string;
  tenure: number;
  monthlyPayment: number;
  interestRate: number;
  processingFee?: number;
  downPayment?: number;
  cashback?: number;
  description?: string;
  isActive?: boolean;
  isRecommended?: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
