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
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {product.stock < 10 && (
          <span className="absolute top-2 right-2 rounded-full bg-destructive px-2 py-1 text-xs text-destructive-foreground">
            Low Stock
          </span>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2">
        <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">
          {product.stock} in stock
        </p>
      </CardContent>

      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
