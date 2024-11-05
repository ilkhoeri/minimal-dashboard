import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = await params;

    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await db.products.findUnique({
      where: { id: productId },
      include: { images: true }
    });
    const sanitizedData = {
      ...product!,
      price: String(product?.price),
      stock: String(product?.stock),
      availableAt: String(product?.availableAt),
      createdAt: String(product?.availableAt)
    };

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
