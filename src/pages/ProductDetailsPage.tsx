import { useParams, Link } from "react-router";
import { useProductBySlug } from "@/hooks/products";
import { useVariantsByProductId } from "@/hooks/variants";
import { useEmiPlansByProductId } from "@/hooks/emi-plans";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  CheckCircle2,
  XCircle,
  Package,
  Calendar,
  Tag,
  Info,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Variant } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

const ProductDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductBySlug(slug!, {
    enabled: !!slug,
    staleTime: 60_000,
  });

  const { data: variants } = useVariantsByProductId(product?._id || "", {
    enabled: !!product?._id,
  });

  const { data: emiPlans } = useEmiPlansByProductId(product?._id || "", {
    enabled: !!product?._id,
  });

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(0);
    }
    if (variants && variants.length > 0) {
      setSelectedVariant(variants[0]);
    }
  }, [product, variants]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError || !product || !variants) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Product not found</AlertTitle>
          <AlertDescription>
            {(error as Error)?.message || "Unable to load product details."}
          </AlertDescription>
        </Alert>
        <Link to="/products" className="mt-4 inline-block">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      {/* Breadcrumb / Back Button */}
      <div className="mb-6">
        <Link to="/products">
          <Button variant="ghost" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column: Images */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={product.images[selectedImage] ?? "/placeholder.png"}
                alt={`${product.name} - Image ${selectedImage + 1}`}
                className="h-[400px] w-full object-contain bg-muted/10 dark:bg-muted/5"
              />
            </CardContent>
          </Card>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`shrink-0 rounded-md border-2 transition ${
                    selectedImage === idx
                      ? "border-primary"
                      : "border-muted hover:border-muted-foreground/50"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="h-20 w-20 object-cover rounded"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Tag className="h-3 w-3" />
                {product.category}
              </Badge>
              {selectedVariant?.inStock ? (
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <XCircle className="h-3 w-3" />
                  Out of Stock
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight dark:text-white">
              {product.name}
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">
              {product.brand}
            </p>
          </div>

          <Separator />

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold dark:text-white">
              ₹
              {selectedVariant
                ? selectedVariant.price.toLocaleString()
                : product.basePrice.toLocaleString()}
            </span>
            <span className="text-xl text-muted-foreground line-through">
              ₹
              {selectedVariant
                ? selectedVariant.mrp.toLocaleString()
                : product.mrp.toLocaleString()}
            </span>
            <Badge variant="default" className="ml-2">
              {selectedVariant
                ? Math.round(
                    ((selectedVariant.mrp - selectedVariant.price) /
                      selectedVariant.mrp) *
                      100
                  )
                : Math.round(
                    ((product.mrp - product.basePrice) / product.mrp) * 100
                  )}
              % OFF
            </Badge>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Description
            </h3>
            <p className="text-base leading-relaxed dark:text-gray-300">
              {product.description}
            </p>
          </div>

          {/* Variants */}
          {variants && variants.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Variants
              </h3>
              <div className="flex flex-wrap gap-2">
                {variants.map((variant, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className={cn(
                      "px-3 py-1 cursor-pointer",
                      selectedVariant?._id === variant._id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "hover:bg-muted hover:border-muted-foreground"
                    )}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.color} / {variant.storage} - ₹{variant.price}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="flex-1 gap-2">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Heart className="h-5 w-5" />
              Wishlist
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Share2 className="h-5 w-5" />
              Share
            </Button>
          </div>

          {/* Additional Info */}
          <Card className="bg-muted/20 dark:bg-muted/10">
            <CardContent className="grid gap-3 p-4 text-sm">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span>Free shipping on orders above ₹5,000</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Estimated delivery: 3-5 business days</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span>7-day return policy</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs Section: Specifications & EMI Plans */}
      <div className="mt-12">
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="emi-plans">EMI Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
                <CardDescription>
                  Detailed product specifications and features
                </CardDescription>
              </CardHeader>
              <CardContent>
                {product.specifications &&
                Object.keys(product.specifications).length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/3">Feature</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <TableRow key={key}>
                            <TableCell className="font-medium capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </TableCell>
                            <TableCell>
                              {typeof value === "object"
                                ? JSON.stringify(value)
                                : String(value)}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">
                    No specifications available.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emi-plans" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>EMI Plans</CardTitle>
                <CardDescription>
                  Flexible financing options for this product
                </CardDescription>
              </CardHeader>
              <CardContent>
                {emiPlans && emiPlans.length > 0 ? (
                  <div className="space-y-3">
                    {emiPlans.map((plan, idx) => (
                      <Card key={idx} className="border-muted">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                              {plan.description}
                            </CardTitle>
                            <Badge>{plan.tenure || "N/A"} months</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          <div className="grid gap-2">
                            <div className="flex justify-between">
                              <span>Monthly Payment:</span>
                              <span className="font-semibold text-foreground">
                                ₹
                                {plan.monthlyPayment?.toLocaleString() || "N/A"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Interest Rate:</span>
                              <span className="font-semibold text-foreground">
                                {plan.interestRate || 0}%
                              </span>
                            </div>
                            {plan.cashback && (
                              <div className="flex justify-between">
                                <span>Cashback:</span>
                                <span className="font-semibold text-green-600 dark:text-green-400">
                                  ₹{plan.cashback.toLocaleString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            Select Plan
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No EMI plans available for this product.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Meta Info Footer */}
      <div className="mt-8 rounded-md bg-muted/20 p-4 text-xs text-muted-foreground dark:bg-muted/10">
        <div className="flex flex-wrap gap-4">
          <span>Product ID: {product._id}</span>
          <span>Added: {new Date(product.createdAt).toLocaleDateString()}</span>
          <span>
            Updated: {new Date(product.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

/* Loading Skeleton */
const ProductDetailsSkeleton = () => (
  <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
    <Skeleton className="mb-6 h-10 w-40" />
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <Skeleton className="h-[400px] w-full rounded-md" />
        <div className="flex gap-2">
          <Skeleton className="h-20 w-20 rounded-md" />
          <Skeleton className="h-20 w-20 rounded-md" />
          <Skeleton className="h-20 w-20 rounded-md" />
        </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
        <div className="flex gap-3">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-24" />
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetailsPage;
