import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import db from "@/db/db";
import { cache } from "@/lib/cashe";
import { Suspense } from "react";

const getProducts = cache(() => {
  return db.product.findMany({
    where: {
      isAvailableForPurchase: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}, ["/products", "getProducts"]);

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense />
      </Suspense>
    </div>
  );
}

async function ProductsSuspense() {
  const products = await getProducts();
  return products.map((product) => (
    <ProductCard {...product} key={product.id} />
  ));
}
