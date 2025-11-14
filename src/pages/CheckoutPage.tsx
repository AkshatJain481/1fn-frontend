import { useParams, useSearchParams, Link, Navigate } from "react-router";
import { useProductBySlug } from "@/hooks/products";
import { useVariantById } from "@/hooks/variants";
import { useEmiPlanById } from "@/hooks/emi-plans";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CheckCircle2,
  Package,
  CreditCard,
  MapPin,
  Calendar,
  ArrowRight,
  Home,
  XCircle,
  Sparkles,
} from "lucide-react";

const CheckoutPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  const variantId = searchParams.get("variantId");
  const emiPlanId = searchParams.get("emiPlanId");

  // Fetch product by slug
  const {
    data: product,
    isLoading: productLoading,
    isError: productError,
  } = useProductBySlug(slug!, {
    enabled: !!slug,
  });

  // Fetch variant by ID
  const {
    data: variant,
    isLoading: variantLoading,
    isError: variantError,
  } = useVariantById(variantId!, {
    enabled: !!variantId,
  });

  // Fetch EMI plan by ID (optional)
  const { data: emiPlan, isLoading: emiPlanLoading } = useEmiPlanById(
    emiPlanId!,
    {
      enabled: !!emiPlanId,
    }
  );

  // Redirect to error if no variant ID
  if (!variantId) {
    return <Navigate to="/error" replace />;
  }

  // Loading state
  if (productLoading || variantLoading || (emiPlanId && emiPlanLoading)) {
    return <CheckoutSkeleton />;
  }

  // Error state
  if (productError || variantError || !product || !variant) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Unable to process order</AlertTitle>
          <AlertDescription>
            The product or variant details could not be loaded. Please try
            again.
          </AlertDescription>
        </Alert>
        <Link to="/products" className="mt-6 inline-block">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const finalPrice = emiPlan
    ? emiPlan.monthlyPayment * emiPlan.tenure
    : variant.price;
  const savings = variant.mrp - variant.price;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-6">
      {/* Success Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight dark:text-white">
          Order Confirmed!
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      {/* Order Summary Card */}
      <Card className="mb-6 overflow-hidden border-2">
        <CardHeader className="bg-muted/30 dark:bg-muted/10">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">Order Summary</CardTitle>
              <CardDescription className="mt-1">
                Order #{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              Confirmed
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Product Details */}
          <div className="grid gap-6 md:grid-cols-[200px_1fr]">
            <div className="overflow-hidden rounded-lg border bg-muted/20">
              <img
                src={product.images[0] ?? "/placeholder.png"}
                alt={product.name}
                className="h-48 w-full object-contain p-4"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold dark:text-white">
                  {product.name}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {product.brand} • {product.category}
                </p>
              </div>

              {/* Variant Details */}
              <div className="rounded-lg border bg-muted/20 p-4 dark:bg-muted/10">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Selected Variant
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Color:</span>
                    <span className="font-medium">{variant.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage:</span>
                    <span className="font-medium">{variant.storage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stock:</span>
                    {variant.inStock ? (
                      <Badge variant="secondary" className="h-5 text-xs">
                        In Stock
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="h-5 text-xs">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* EMI Plan Details (if selected) */}
              {emiPlan && (
                <div className="rounded-lg border border-primary/50 bg-primary/5 p-4">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    EMI Plan Selected
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{emiPlan.description}</p>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Monthly Payment:
                      </span>
                      <span className="font-semibold text-primary">
                        ₹{emiPlan.monthlyPayment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tenure:</span>
                      <span className="font-medium">
                        {emiPlan.tenure} months
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Interest Rate:
                      </span>
                      <span className="font-medium">
                        {emiPlan.interestRate}%
                      </span>
                    </div>
                    {emiPlan.cashback && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cashback:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          ₹{emiPlan.cashback.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Price Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Price Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">MRP:</span>
                <span className="line-through">
                  ₹{variant.mrp.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount:</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  - ₹{savings.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product Price:</span>
                <span className="font-medium">
                  ₹{variant.price.toLocaleString()}
                </span>
              </div>
              {emiPlan && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total EMI Amount:
                    </span>
                    <span className="font-medium">
                      ₹{finalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      ({emiPlan.monthlyPayment.toLocaleString()} ×{" "}
                      {emiPlan.tenure} months)
                    </span>
                  </div>
                </>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-primary">
                  ₹{finalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery & Payment Info */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="h-5 w-5 text-primary" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Shipping Address</p>
                <p className="text-muted-foreground">
                  123 Main Street, City, State - 123456
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Estimated Delivery</p>
                <p className="text-muted-foreground">3-5 business days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="h-5 w-5 text-primary" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">
                  {emiPlan ? "EMI Payment" : "Full Payment"}
                </p>
                <p className="text-muted-foreground">
                  {emiPlan
                    ? `${emiPlan.tenure} monthly installments`
                    : "One-time payment"}
                </p>
              </div>
            </div>
            {emiPlan && (
              <Alert className="mt-3">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Your first EMI of ₹{emiPlan.monthlyPayment.toLocaleString()}{" "}
                  will be charged on delivery.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/products" className="flex-1">
          <Button variant="outline" className="w-full gap-2" size="lg">
            <Home className="h-5 w-5" />
            Continue Shopping
          </Button>
        </Link>
        <Link to="/orders" className="flex-1">
          <Button className="w-full gap-2" size="lg">
            View Order Details
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Additional Info */}
      <Card className="mt-6 bg-muted/20 dark:bg-muted/10">
        <CardContent className="p-4 text-center text-sm text-muted-foreground">
          <p>
            A confirmation email has been sent to your registered email address.
          </p>
          <p className="mt-1">
            Order ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

/* Loading Skeleton */
const CheckoutSkeleton = () => (
  <div className="mx-auto max-w-4xl px-4 py-8">
    <div className="mb-8 text-center">
      <Skeleton className="mx-auto mb-4 h-20 w-20 rounded-full" />
      <Skeleton className="mx-auto h-8 w-64" />
      <Skeleton className="mx-auto mt-2 h-6 w-96" />
    </div>
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="mt-2 h-4 w-32" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-[200px_1fr]">
          <Skeleton className="h-48 w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default CheckoutPage;
