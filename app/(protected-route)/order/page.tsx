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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (itemCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-16">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground">
          Add some products to get started
        </p>
        <Button asChild>
          <Link href="/dashboard">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
        <p className="text-muted-foreground">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
