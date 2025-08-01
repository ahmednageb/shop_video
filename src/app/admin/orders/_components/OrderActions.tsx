// "use client"

// import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
// import { useTransition } from "react"
// import { deleteOrder } from "../../_actions/orders"
// import { useRouter } from "next/navigation"

// export function DeleteDropDownItem({ id }: { id: string }) {
//   const [isPending, startTransition] = useTransition()
//   const router = useRouter()

//   return (
//     <DropdownMenuItem
//       variant="destructive"
//       disabled={isPending}
//       onClick={() =>
//         startTransition(async () => {
//           await deleteOrder(id)
//           router.refresh()
//         })
//       }
//     >
//       Delete
//     </DropdownMenuItem>
//   )
// }
"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteOrder } from "../../_actions/orders";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // اختياري

export function DeleteDropDownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          try {
            await deleteOrder(id);
            router.refresh();
            toast.success("Order deleted"); // ✅ Optional feedback
          } catch (e) {
            toast.error("Failed to delete order");
          }
        })
      }
    >
      {isPending ? "Deleting..." : "Delete"}
    </DropdownMenuItem>
  );
}
