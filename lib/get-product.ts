import db from "@/lib/db";
import { SelectProduct } from "@/types/client";
import { price, formatTime } from "@/lib/utils";
import { Image, Products } from "@prisma/client";

export async function getNameProductById(): Promise<
  { id: string; name: string }[] | null
> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/seed/products`, {
    cache: "no-store"
  });
  return await res.json();
}

export async function getProductById(
  productId: string
): Promise<(Products & { images?: Image[] }) | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/seed/products/${productId}`,
    { cache: "no-store" }
  );
  return await res.json();
}

export async function getProducts(
  search: string,
  tab: number,
  {
    productsPerPage = 5,
    userId
  }: { productsPerPage?: number; userId?: string } = {}
) {
  const moreProducts = await db.products.findMany({
    where: {
      name: { contains: search, mode: "insensitive" },
      userId
    },
    include: { images: true },
    orderBy: { createdAt: "desc" },
    take: productsPerPage,
    skip: tab
  });

  const products: SelectProduct[] = moreProducts.map((item) => ({
    ...item,
    image: item.images.length > 0 ? item.images[0].url : "",
    price: price.format(item.price.toNumber()),
    stock: String(item.stock),
    availableAt: formatTime(item.createdAt),
    createdAt: formatTime(item.createdAt)
  }));

  const totalProducts = await db.products.count({
    where: {
      name: { contains: search, mode: "insensitive" }
    }
  });

  let tabValue =
    products.length >= productsPerPage ? tab + productsPerPage : null;

  return { products, tabValue, totalProducts };
}
