import { NextResponse } from "next/server";
import { currentUser } from "@/lib/account";
import db from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const productId = (await params).productId;

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

    return NextResponse.json(sanitizedData);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ userId: string; productId: string }> }
) {
  try {
    const { userId, productId } = await params;
    const session = await currentUser();

    const { name, description, images, status, price, stock, availableAt } =
      await req.json();

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!productId) {
      return new NextResponse("product id is required", { status: 403 });
    }
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    const productByUser = await db.user.findFirst({
      where: { id: userId }
    });

    if (!productByUser) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    const updatedProduct = await db.products.update({
      where: { id: productId },
      data: {
        userId,
        name,
        description,
        status,
        price,
        stock,
        availableAt: new Date(availableAt),
        images: {
          deleteMany: {},
          createMany: {
            data: [...images.map((image: { url: string }) => image)]
          }
        }
      }
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log("[PRODUCT_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ userId: string; productId: string }> }
) {
  try {
    const { userId, productId } = await params;
    const session = await currentUser();

    if (!session) {
      return new NextResponse("session is required", { status: 403 });
    }
    if (!productId) {
      return new NextResponse("Product Id is required", { status: 400 });
    }

    const productByUser = await db.user.findFirst({
      where: { id: userId }
    });

    if (!productByUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const product = await db.products.delete({
      where: { id: productId }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
