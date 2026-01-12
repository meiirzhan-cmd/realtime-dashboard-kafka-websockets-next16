"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useCartStore,
  type CartItem as CartItemType,
} from "../../../../store/useCartStore";

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: Readonly<CartItemProps>) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="group flex gap-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:border-primary/20">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform group-hover:scale-110"
            sizes="96px"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              ${item.price.toFixed(2)} each
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-muted-foreground">
                {item.quantity} × ${item.price.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 rounded-lg border p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-3.5 w-3.5" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="w-10 text-center font-semibold tabular-nums">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 hover:bg-primary/10 hover:text-primary"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Remove</span>
            <span className="sr-only">Remove item from cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
