// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import db from "@/db/db"
// import { formatCurrency } from "@/lib/formatters"
// import { PageHeader } from "../_components/PageHeader"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { MoreVertical } from "lucide-react"
// import { DeleteDropDownItem } from "./_components/OrderActions"

// function getOrders() {
//   return db.order.findMany({
//     select: {
//       id: true,
//       pricePaidInCents: true,
//       product: { select: { name: true } },
//       user: { select: { email: true } },
//     },
//     orderBy: { createdAt: "desc" },
//   })
// }

// export default function OrdersPage() {
//   return (
//     <>
//       <PageHeader>Sales</PageHeader>
//       <OrdersTable />
//     </>
//   )
// }

// async function OrdersTable() {
//   const orders = await getOrders()

//   if (orders.length === 0) return <p>No sales found</p>

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Product</TableHead>
//           <TableHead>Customer</TableHead>
//           <TableHead>Price Paid</TableHead>
//           <TableHead className="w-0">
//             <span className="sr-only">Actions</span>
//           </TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {orders.map(order => (
//           <TableRow key={order.id}>
//             <TableCell>{order.product.name}</TableCell>
//             <TableCell>{order.user.email}</TableCell>
//             <TableCell>
//               {formatCurrency(order.pricePaidInCents / 100)}
//             </TableCell>
//             <TableCell className="text-center">
//               <DropdownMenu>
//                 <DropdownMenuTrigger>
//                   <MoreVertical />
//                   <span className="sr-only">Actions</span>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                   <DeleteDropDownItem id={order.id} />
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   )
// }
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { formatCurrency } from "@/lib/formatters";
import { PageHeader } from "../_components/PageHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DeleteDropDownItem } from "./_components/OrderActions";

// ✅ الدالة التي تجلب البيانات من قاعدة البيانات
async function getOrders() {
  return db.order.findMany({
    select: {
      id: true,
      pricePaidInCents: true,
      product: { select: { name: true } },
      user: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

// ✅ صفحة السيرفر الرئيسية
export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <>
      <PageHeader>Sales</PageHeader>
      <OrdersTable orders={orders} />
    </>
  );
}

// ✅ مكون الجدول الذي يعرض البيانات
type OrdersTableProps = {
  orders: Awaited<ReturnType<typeof getOrders>>;
};

function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) return <p>No sales found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Price Paid</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.product.name}</TableCell>
            <TableCell>{order.user.email}</TableCell>
            <TableCell>
              {formatCurrency(order.pricePaidInCents / 100)}
            </TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropDownItem id={order.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
