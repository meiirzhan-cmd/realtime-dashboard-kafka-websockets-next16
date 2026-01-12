import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { ProductGrid } from "./_components/ProductGrid";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

export default async function DashboardPage() {
  const products = await prisma.product.findMany();

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Our Products
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Discover our curated collection of premium tech products
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            {products.length} Products Available
          </span>
        </div>
      </div>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid products={products} />
      </Suspense>
    </div>
  );
}
