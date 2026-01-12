"use client";

import { useEffect, useState } from "react";
import { OrderCard } from "./OrderCard";
import { toast } from "sonner";
import { useOrderEvents } from "@/hooks/useOrderEvents";

type Product = {
  id: string;
  name: string;
  image: string | null;
  price: number;
};

type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
};

type Order = {
  id: string;
  userId: string;
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
};

type OrdersClientProps = {
  initialOrders: Order[];
  userId: string;
};

export function OrdersClient({
  initialOrders,
  userId,
}: Readonly<OrdersClientProps>) {
  const [orders] = useState<Order[]>(initialOrders);
  const { orderEvents, isConnected } = useOrderEvents(userId);

  useEffect(() => {
    if (orderEvents.length > 0) {
      const latestEvent = orderEvents[orderEvents.length - 1];

      // Show toast notification
      toast.success(`New order created! Order ID: ${latestEvent.orderId}`);

      // Refresh the orders list by fetching from the server
      globalThis.location.reload();
    }
  }, [orderEvents]);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-muted p-8 mb-4">
          <svg
            className="h-16 w-16 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
        <p className="text-muted-foreground text-center max-w-md">
          When you place your first order, it will appear here. Start shopping
          to see your order history!
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <div
            className={`h-2 w-2 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-muted-foreground">
            {isConnected ? "Real-time updates active" : "Connecting..."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {orders.length} {orders.length === 1 ? "order" : "orders"} found
        </p>
        <div className="flex items-center gap-2 text-sm">
          <div
            className={`h-2 w-2 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-muted-foreground">
            {isConnected ? "Real-time updates active" : "Connecting..."}
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
