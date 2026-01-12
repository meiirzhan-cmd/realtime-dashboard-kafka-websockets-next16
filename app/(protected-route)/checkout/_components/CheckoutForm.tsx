"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkout } from "@/app/(protected-route)/checkout/action";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import FormInputs from "./FormInputs";
import OrderSummary from "./OrderSummary";

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
        <FormInputs state={state} />

        {/* Order Summary */}
        <OrderSummary
          isPending={isPending}
          items={items}
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
        />
      </div>
    </form>
  );
}
