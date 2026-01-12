import { Header } from "@/components/custom-ui/Header";
import { Suspense } from "react";
import LoadingScreen from "./_components/LoadingScreen";
import { AuthGate } from "./_components/AuthGate";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AuthGate>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto py-8">{children}</main>
        </div>
      </AuthGate>
    </Suspense>
  );
}
