import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { Product } from "@/generated/prisma";
import { cache } from "@/lib/cashe";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const getMostPopularProducts = cache(
  () => {
    return db.product.findMany({
      where: {
        isAvailableForPurchase: true,
      },
      orderBy: {
        orders: { _count: "desc" },
      },
      take: 6,
    });
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
);

const getNewestProducts = cache(
  () => {
    return db.product.findMany({
      where: {
        isAvailableForPurchase: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });
  },
  ["/", "getNewestProducts"],
  { revalidate: 60 * 60 * 24 }
);

export default function HomePage() {
  return (
    <div className="space-y-12">
      <ProductGridSection
        productFetcher={getMostPopularProducts}
        title="Most Popular Products"
      />
      <ProductGridSection
        productFetcher={getNewestProducts}
        title="Newest Products"
      />
    </div>
  );
}

type ProductGridSectionProps = {
  title: string;
  productFetcher: () => Promise<Product[]>;
};

function ProductGridSection({
  title,
  productFetcher,
}: ProductGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 ">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant={"outline"} asChild>
          <Link href="/products" className=" space-x-2">
            <span>View All</span>
            <ArrowRight />
          </Link>
        </Button>
      </div>
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
          <ProductSuspense productFetcher={productFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductSuspense({
  productFetcher,
}: {
  productFetcher: () => Promise<Product[]>;
}) {
  return (await productFetcher()).map((product) => (
    <ProductCard {...product} key={product.id} />
  ));
}
