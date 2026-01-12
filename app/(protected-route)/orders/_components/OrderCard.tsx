"use client";

import Image from "next/image";
import { Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react";

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

type OrderCardProps = {
  order: Order;
};

const statusConfig = {
  PENDING: {
    label: "Pending",
    icon: Clock,
    color: "text-yellow-600 bg-yellow-50 border-yellow-200",
  },
  PROCESSING: {
    label: "Processing",
    icon: Package,
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  SHIPPED: {
    label: "Shipped",
    icon: Truck,
    color: "text-purple-600 bg-purple-50 border-purple-200",
  },
  DELIVERED: {
    label: "Delivered",
    icon: CheckCircle,
    color: "text-green-600 bg-green-50 border-green-200",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-600 bg-red-50 border-red-200",
  },
};

export function OrderCard({ order }: Readonly<OrderCardProps>) {
  const status =
    statusConfig[order.status as keyof typeof statusConfig] ||
    statusConfig.PENDING;
  const StatusIcon = status.icon;

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      {/* Order Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Order #{order.id.slice(0, 8)}</h3>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.color}`}
            >
              <StatusIcon className="h-3 w-3" />
              {status.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-xl font-bold">${order.total.toFixed(2)}</p>
        </div>
      </div>

      {/* Order Items */}
      <div className="space-y-4 border-t pt-4">
        <h4 className="font-medium text-sm">Items ({order.items.length})</h4>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              {item.product.image && (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-1 items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-medium text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
