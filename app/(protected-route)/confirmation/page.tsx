import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ConfirmationPageProps = {
  searchParams: Promise<{ orderId?: string }>;
};

export default async function ConfirmationPage({
  searchParams,
}: Readonly<ConfirmationPageProps>) {
  const { orderId } = await searchParams;

  return (
    <div className="flex items-center justify-center py-16">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          <CardDescription>
            Thank you for your purchase. Your order has been received and is
            being processed.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {orderId && (
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono font-semibold">{orderId}</p>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>Estimated delivery: 3-5 business days</span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full gap-2">
            <Link href="/dashboard">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/order">View Orders</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
