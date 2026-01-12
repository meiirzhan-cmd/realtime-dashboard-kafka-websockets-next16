"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/lib/generated/prisma/client";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: Readonly<ProductCardProps>) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image ?? "",
    });
    toast.success(`${product.name} added to cart`, {
      description: "Item successfully added to your cart",
    });
  };

  const isLowStock = product.stock < 10;
  const isOutOfStock = product.stock === 0;

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/5 border-muted hover:border-primary/20">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <span className="text-lg font-bold text-destructive">Out of Stock</span>
          </div>
        )}
        {isLowStock && !isOutOfStock && (
          <span className="absolute top-3 right-3 rounded-full bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground shadow-lg animate-pulse">
            Only {product.stock} left
          </span>
        )}
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">
          {product.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {product.stock} units available
        </p>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleAddToCart}
          className="w-full gap-2 transition-all"
          disabled={isOutOfStock}
          variant={isOutOfStock ? "outline" : "default"}
        >
          <Plus className="h-4 w-4" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
