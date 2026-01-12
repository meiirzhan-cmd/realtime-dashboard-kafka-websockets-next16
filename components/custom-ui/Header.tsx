"use client";

import Link from "next/link";
import { ShoppingCart, Store, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useMounted } from "@/store/useMounted";

export function Header() {
  const mounted = useMounted();
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Store className="h-6 w-6" />
          <span className="text-xl font-bold">TechStore</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Products
          </Link>
          <Link
            href="/order"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Orders
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/order">
              <ShoppingCart className="h-5 w-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Link>
          </Button>

          <Button className="cursor-pointer" variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>

          <form action="/api/auth/signout" method="POST">
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              type="submit"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
