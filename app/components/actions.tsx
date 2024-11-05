"use client";

import axios from "axios";
import { useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/ui/alert-modal";

import type { SelectProduct } from "@/types/client";
import type { Session } from "@/types/auth";

export function DeleteProduct({
  session,
  product,
  open,
  setOpen,
  disabled,
  setDisabled,
  children
}: Session & {
  children: React.ReactNode;
  product: SelectProduct;
  open?: boolean;
  setOpen?: (v: boolean) => void;
  disabled?: boolean;
  setDisabled?: (v: boolean) => void;
}) {
  const router = useRouter();
  const [initialDisabled, setInitialDisabled] = useState(false);
  const [initialOpen, setInitialOpen] = useState(false);

  const onOpen = open !== undefined ? open : initialOpen;
  const setOnOpen = setOpen !== undefined ? setOpen : setInitialOpen;

  const onDisabled = disabled !== undefined ? disabled : initialDisabled;
  const setOnDisabled =
    setDisabled !== undefined ? setDisabled : setInitialDisabled;

  if (!session) {
    return null;
  }

  const onDelete = async () => {
    try {
      setOnDisabled(true);
      console.log("load:", "deleting product");
      await axios.delete(`/api/seed/${session.id}/products/${product.id}`);
      router.refresh();
      router.push(`/${session.id}/products`);
    } catch (error) {
      console.log("Uh oh!. error:", error);
      alert("Something went wrong.");
    } finally {
      setOnDisabled(false);
      setOnOpen(false);
      console.log("success:", `item deleted.`);
    }
  };

  return (
    <>
      <Slot onClick={() => setOnOpen(true)}>{children}</Slot>

      <AlertModal
        isOpen={onOpen}
        onClose={() => setOnOpen(false)}
        onConfirm={onDelete}
        disabled={onDisabled}
      >
        <div className="flex flex-col justify-start gap-2">
          <p className="text-gray-800 text-[0.875rem] leading-[1.25rem] font-medium">
            Product:
          </p>
          <p className="text-gray-800 bg-background/20 border m-0 rounded px-4 py-3">
            {product.name}
          </p>
        </div>
      </AlertModal>
    </>
  );
}
