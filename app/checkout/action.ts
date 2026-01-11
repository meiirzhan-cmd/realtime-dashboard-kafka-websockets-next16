"use server";

import { produceOrder } from "@/lib/kafka";
import { getUserId } from "@/lib/session";
import { redirect } from "next/navigation";

export async function completeCheckout() {
  const userId = await getUserId();

  if (!userId) {
    redirect("/login");
  }

  const orderId = crypto.randomUUID();
  await produceOrder(orderId, userId);

  redirect("/confirmation");
}
