import type { Product } from "@/lib/interfaces";
import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/products/${product.slug}`}
      aria-label={`View details for ${product.name}`}
    >
      <Card className="cursor-pointer hover:shadow-lg dark:bg-gray-900 dark:border-gray-700 transition-shadow duration-300">
        <CardHeader>
          <img
            src={product.images[0] ?? "/placeholder.png"}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4"
            loading="lazy"
          />
          <CardTitle className="text-lg font-semibold dark:text-white">
            {product.name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground dark:text-gray-400">
            {product.brand}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p
            className="text-sm text-muted-foreground dark:text-gray-400 truncate"
            title={product.description}
          >
            {product.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="outline" className="dark:text-gray-200">
              <Tag size={16} className="inline mr-1" /> {product.category}
            </Badge>
            {product.inStock ? (
              <Badge variant="secondary" className="dark:text-gray-200">
                In Stock
              </Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div>
            <span className="font-semibold text-lg dark:text-white">
              ₹{product.basePrice.toLocaleString()}
            </span>
            <span className="line-through text-sm ml-2 text-muted-foreground dark:text-gray-500">
              ₹{product.mrp.toLocaleString()}
            </span>
          </div>
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-1"
          >
            <ShoppingCart size={16} />
            Buy
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
