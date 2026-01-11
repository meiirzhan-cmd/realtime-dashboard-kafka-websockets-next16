import { Header } from "@/components/custom-ui/Header";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const payload = await decrypt(session);

  if (!payload?.userId) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">{children}</main>
    </div>
  );
}
