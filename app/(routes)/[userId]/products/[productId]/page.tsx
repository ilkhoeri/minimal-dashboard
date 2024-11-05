import db from "@/lib/db";
import axios from "axios";
import { ProductForm } from "../../../ui/product-form";
import { formatDateToInput } from "@/lib/utils";
import { currentUser } from "@/lib/account";

export default async function AddProductPage({
  params
}: {
  params: { productId: string };
}) {
  const { productId } = await params;
  const session = await currentUser();
  const product = await db.products.findUnique({
    where: {
      id: productId
    },
    include: {
      images: true
    }
  });
  const sanitizedData = {
    ...product!,
    price: String(product?.price),
    stock: String(product?.stock),
    availableAt: String(product?.availableAt),
    createdAt: String(product?.availableAt)
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ProductForm
        session={session}
        data={productId === "add" ? null : sanitizedData}
      />
    </div>
  );
}
