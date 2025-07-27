// import {
//   Body,
//   Container,
//   Head,
//   Heading,
//   Html,
//   Preview,
//   Tailwind,
// } from "@react-email/components";
// import { OrderInformation } from "./components/OrderInformation";

// type PurchaseReceiptEmailProps = {
//   product: {
//     name: string;
//     imagePath: string;
//     description: string;
//   };
//   order: { id: string; createdAt: Date; pricePaidInCents: number };
//   downloadVerificationId: string;
// };

// PurchaseReceiptEmail.PreviewProps = {
//   product: {
//     name: "ahmed name",
//     description: "Some description",
//     imagePath:
//       "public/products/9b7c10df-a22c-40e1-a32e-fd5e37fcd584-WhatsApp Image 2023-07-19 at 8.22.58 PM.jpeg",
//   },
//   order: {
//     id: crypto.randomUUID(),
//     createdAt: new Date(),
//     pricePaidInCents: 10000,
//   },
//   downloadVerificationId: crypto.randomUUID(),
// } satisfies PurchaseReceiptEmailProps;

// export default function PurchaseReceiptEmail({
//   product,
//   order,
//   downloadVerificationId,
// }: PurchaseReceiptEmailProps) {
//   return (
//     <Html>
//       <Preview>Download {product.name} and view receipt</Preview>
//       <Tailwind>
//         <Head />
//         <Body className="font-sans bg-white">
//           <Container className="max-w-xl">
//             <Heading>Purchase Receipt</Heading>
//             <OrderInformation
//               order={order}
//               product={product}
//               downloadVerificationId={downloadVerificationId}
//             />
//           </Container>
//         </Body>
//       </Tailwind>
//     </Html>
//   );
// }
// app/emails/PurchaseReceiptEmail.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";

type PurchaseReceiptEmailProps = {
  product: {
    name: string;
    imagePath: string;
    description: string;
  };
  order: {
    id: string;
    createdAt: Date;
    pricePaidInCents: number;
  };
  downloadVerificationId: string;
};

export default function PurchaseReceiptEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl mx-auto px-4 py-6">
            <Heading className="text-xl font-bold mb-4">
              Purchase Receipt
            </Heading>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

// 👇 يجب وضعها بعد التصدير حتى لا يحدث خطأ في TypeScript
PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: "ahmed name",
    description: "Some description",
    imagePath: "https://your-domain.com/products/sample-image.jpeg", // تأكد أنه رابط URL حقيقي
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 10000,
  },
  downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps;
