"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/useCartStore";

export function CartSummary() {
  const { items, getTotalPrice } = useCartStore();
  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <Card className="border-2">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? (
                <span className="text-green-600 font-semibold">Free</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Tax (10%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
        </div>

        {subtotal > 0 && subtotal < 100 && (
          <div className="rounded-lg bg-primary/10 p-3 border border-primary/20">
            <p className="text-sm font-medium text-primary">
              Add ${(100 - subtotal).toFixed(2)} more for free shipping! 🎉
            </p>
            <div className="mt-2 h-2 bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all"
                style={{ width: `${(subtotal / 100) * 100}%` }}
              />
            </div>
          </div>
        )}

        {shipping === 0 && subtotal > 0 && (
          <div className="rounded-lg bg-green-500/10 p-3 border border-green-500/20">
            <p className="text-sm font-medium text-green-600">
              You qualify for free shipping! 🎉
            </p>
          </div>
        )}

        <Separator className="my-4" />

        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total</span>
          <span className="bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
            ${total.toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          asChild
          className="w-full gap-2 h-12 text-base font-semibold"
          disabled={items.length === 0}
          size="lg"
        >
          <Link href="/checkout">
            Proceed to Checkout
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
