"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useMounted } from "@/store/useMounted";
import { CartItem } from "./_components/CartItem";
import { CartSummary } from "./_components/CartSummary";

export default function OrderPage() {
  const mounted = useMounted();
  const items = useCartStore((state) => state.items);
  const itemCount = mounted ? items.length : 0;

  if (!mounted) {
    return (
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
          </div>
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (itemCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-20">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <ShoppingBag className="relative h-24 w-24 text-muted-foreground" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground text-lg max-w-md">
            Start shopping and add some amazing products to your cart
          </p>
        </div>
        <Button asChild size="lg" className="gap-2">
          <Link href="/dashboard">
            <ShoppingBag className="h-4 w-4" />
            Browse Products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:sticky lg:top-20 h-fit">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
