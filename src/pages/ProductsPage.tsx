import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/products";
import type { Product } from "@/lib/interfaces";
import ProductCard from "@/components/product/ProductCard";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3X3, LayoutGrid, Sparkles, Tag, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "compact";

const ProductsPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<
    "relevance" | "price-asc" | "price-desc" | "newest"
  >("relevance");
  const [view, setView] = useState<ViewMode>("grid");

  const { data, isLoading, isError, error } = useProducts({
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const filtered = useMemo(() => {
    let items = (data ?? []).slice();

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sort === "price-asc") {
      items.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sort === "price-desc") {
      items.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sort === "newest") {
      items.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return items;
  }, [data, query, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      {/* Hero / Featured */}
      <Card className="mb-6 overflow-hidden border-muted-foreground/20 dark:border-muted/30">
        <div className="relative grid gap-4 p-6 lg:grid-cols-[1.2fr_1fr] lg:gap-6">
          <div>
            <CardHeader className="p-0">
              <CardTitle className="text-2xl font-semibold tracking-tight md:text-3xl dark:text-white">
                Explore the latest devices and unbeatable EMI plans
              </CardTitle>
              <CardDescription className="mt-2 text-base">
                Browse curated smartphones with flexible financing and
                transparent pricing tailored for you.
              </CardDescription>
            </CardHeader>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-4 w-4" /> Featured
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Tag className="h-4 w-4" /> Best Deals
              </Badge>
            </div>
            <div className="mt-5 flex gap-3">
              <Link to="/offers">
                <Button size="sm" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  View Offers
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-md bg-muted/40 p-4 dark:bg-muted/20">
            <div className="grid grid-cols-2 gap-3">
              <Stat
                title="Total Products"
                value={(data?.length ?? 0).toString()}
              />
              <Stat
                title="In Stock"
                value={(data?.filter((p) => p.inStock).length ?? 0).toString()}
              />
              <Stat
                title="Avg. Price"
                value={
                  data && data.length
                    ? `₹${Math.round(
                        data.reduce((sum, p) => sum + p.basePrice, 0) /
                          data.length
                      ).toLocaleString()}`
                    : "₹0"
                }
              />
              <Stat title="Satisfied Customers" value={"10K+"} />
            </div>
          </div>
        </div>
      </Card>

      {/* Controls */}
      <Card className="mb-6">
        <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
            <div className="relative w-full md:max-w-md">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, brand, or specs..."
                className="pl-3 dark:bg-gray-900"
                aria-label="Search products"
              />
            </div>

            <div className="flex gap-3">
              <Select
                value={sort}
                onValueChange={(v: typeof sort) => setSort(v)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs
            value={view}
            onValueChange={(v) => setView(v as ViewMode)}
            className="w-full md:w-auto"
          >
            <TabsList>
              <TabsTrigger value="grid" className="gap-2">
                <LayoutGrid className="h-4 w-4" /> Grid
              </TabsTrigger>
              <TabsTrigger value="compact" className="gap-2">
                <Grid3X3 className="h-4 w-4" /> Compact
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Content */}
      {isError ? (
        <Alert variant="destructive" className="mb-6">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Failed to load products</AlertTitle>
          <AlertDescription>
            {(error as Error)?.message || "An unexpected error occurred."}
          </AlertDescription>
        </Alert>
      ) : null}

      {isLoading ? (
        <ProductsSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState
          onClear={() => {
            setQuery("");
            setSort("relevance");
          }}
        />
      ) : (
        <div
          className={cn(
            "grid gap-4",
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
          )}
        >
          {filtered.map((p: Product) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
      <Separator className="my-8" />
    </div>
  );
};

/* Helpers */

const Stat = ({ title, value }: { title: string; value: string }) => (
  <div className="rounded-md border bg-background p-3 text-center dark:border-muted/30">
    <p className="text-xs text-muted-foreground">{title}</p>
    <p className="mt-1 text-xl font-semibold">{value}</p>
  </div>
);

const ProductsSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <Card key={i} className="overflow-hidden">
        <CardHeader className="pb-0">
          <Skeleton className="h-40 w-full rounded-md" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-3 w-2/5" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-8 w-24" />
        </CardContent>
      </Card>
    ))}
  </div>
);

const EmptyState = ({ onClear }: { onClear: () => void }) => (
  <Card className="py-16 text-center">
    <CardHeader>
      <CardTitle>No products found</CardTitle>
      <CardDescription>
        Try adjusting filters or clear your search to see more items.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Button variant="outline" onClick={onClear}>
        Clear filters
      </Button>
    </CardContent>
  </Card>
);

export default ProductsPage;
