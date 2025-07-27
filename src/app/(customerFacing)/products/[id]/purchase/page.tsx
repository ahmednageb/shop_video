// import db from "@/db/db";
// import { notFound } from "next/navigation";
// import Stripe from "stripe";
// import { CheckoutForm } from "./_components/CheckoutForm";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// export default async function PurchasePage({
//   params: { id },
// }: {
//   params: { id: string };
// }) {
//   const product = await db.product.findUnique({ where: { id } });
//   if (product == null) return notFound();

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: product.priceInCents,
//     currency: "USD",
//     metadata: { productId: product.id },
//   });

//   if (paymentIntent.client_secret == null) {
//     throw Error("Stripe failed to create payment intent");
//   }

//   return (
//     <CheckoutForm
//       product={product}
//       clientSecret={paymentIntent.client_secret}
//     />
//   );
// }

// @ts-nocheck
// src/app/products/[id]/purchase/page.tsx

import db from "@/db/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { CheckoutForm } from "./_components/CheckoutForm";

// Stripe setup
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

interface PurchasePageProps {
  params: {
    id: string;
  };
}

export default async function PurchasePage({ params }: PurchasePageProps) {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });

  if (!product) return notFound();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "usd",
    metadata: { productId: product.id },
  });

  if (!paymentIntent.client_secret) {
    throw new Error("Stripe failed to create payment intent");
  }

  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  );
}
