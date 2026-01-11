"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/session";

const CheckoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(5, "ZIP code must be at least 5 characters"),
  cartItems: z.string(),
  total: z.string(),
});

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type CheckoutFormState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    address?: string[];
    city?: string[];
    zip?: string[];
  };
  formErrors?: string[];
  success?: boolean;
  orderId?: string;
};

export async function checkout(
  state: CheckoutFormState,
  formData: FormData
): Promise<CheckoutFormState> {
  // Validate fields
  const validatedFields = CheckoutSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
    zip: formData.get("zip"),
    cartItems: formData.get("cartItems"),
    total: formData.get("total"),
  });

  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);
    return {
      errors: flattened.fieldErrors,
      formErrors: flattened.formErrors,
    };
  }

  const { cartItems, total } = validatedFields.data;

  // Parse cart items
  let items: CartItem[];
  try {
    items = JSON.parse(cartItems);
  } catch {
    return {
      formErrors: ["Invalid cart data"],
      errors: {},
    };
  }

  if (items.length === 0) {
    return {
      formErrors: ["Your cart is empty"],
      errors: {},
    };
  }

  // Get current user session
  const userId = await getUserId();
  if (!userId) {
    return {
      formErrors: ["You must be logged in to checkout"],
      errors: {},
    };
  }

  try {
    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId,
        total: Number.parseFloat(total),
        status: "PENDING",
        items: {
          create: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return {
      success: true,
      orderId: order.id,
    };
  } catch (error) {
    console.error("Checkout error:", error);
    return {
      formErrors: ["Failed to process order. Please try again."],
      errors: {},
    };
  }
}
