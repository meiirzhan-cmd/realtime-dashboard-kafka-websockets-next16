import { getUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { OrdersClient } from "./_components/OrdersClient";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export default async function OrdersPage() {
  await connection();

  const userId = await getUserId();

  if (!userId) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
        <p className="text-muted-foreground">
          View your past orders and track their status in real-time
        </p>
      </div>

      <OrdersClient initialOrders={orders} userId={userId} />
    </div>
  );
}
