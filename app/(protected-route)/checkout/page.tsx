import { CheckoutForm } from "./_components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        <p className="text-muted-foreground">
          Complete your order by filling in your details
        </p>
      </div>

      <CheckoutForm />
    </div>
  );
}
