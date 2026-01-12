"use server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { FormStateLogin, LoginFormSchema } from "@/lib/zod/definitions-login";
import bcrypt from "bcrypt";
import z from "zod";

export default async function login(
  state: FormStateLogin,
  formData: FormData
): Promise<FormStateLogin> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    return {
      errors: flattened.fieldErrors,
      formErrors: flattened.formErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  // To prevent email enumeration
  if (!user) {
    return {
      formErrors: ["Invalid email or password"],
      errors: {},
    };
  }

  // Compare password with hash
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return {
      formErrors: ["Invalid email or password"],
      errors: {},
    };
  }
  try {
    await createSession(user);
  } catch {
    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
