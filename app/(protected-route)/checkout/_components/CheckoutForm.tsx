"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { checkout } from "@/app/(protected-route)/checkout/action";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";

export function CheckoutForm() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const [state, formAction, isPending] = useActionState(checkout, {
    errors: {},
    formErrors: [],
  });

  useEffect(() => {
    if (state.success && state.orderId) {
      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/confirmation?orderId=${state.orderId}`);
    }
  }, [state.success, state.orderId, clearCart, router]);

  return (
    <form action={formAction}>
      {/* Hidden fields for cart data */}
      <input type="hidden" name="cartItems" value={JSON.stringify(items)} />
      <input type="hidden" name="total" value={total.toFixed(2)} />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Billing Information */}
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>Enter your billing details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.formErrors && state.formErrors.length > 0 && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {state.formErrors.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  required
                />
                {state.errors?.firstName && (
                  <p className="text-sm text-destructive">
                    {state.errors.firstName[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  required
                />
                {state.errors?.lastName && (
                  <p className="text-sm text-destructive">
                    {state.errors.lastName[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
              />
              {state.errors?.email && (
                <p className="text-sm text-destructive">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St"
                required
              />
              {state.errors?.address && (
                <p className="text-sm text-destructive">
                  {state.errors.address[0]}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" placeholder="New York" required />
                {state.errors?.city && (
                  <p className="text-sm text-destructive">
                    {state.errors.city[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" placeholder="NY" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" name="zip" placeholder="10001" required />
                {state.errors?.zip && (
                  <p className="text-sm text-destructive">
                    {state.errors.zip[0]}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isPending || items.length === 0}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Place Order
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </form>
  );
}
