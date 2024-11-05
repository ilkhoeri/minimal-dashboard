import { currentUser } from "@/lib/account";
import { ProductForm } from "../../../../components/product-form";
import { getProduct, getProductById } from "@/lib/get-product";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).productId;
  const product = await getProductById(id);
  const previousImages = (await parent).openGraph?.images || [];

  const url = process.env.NEXTAUTH_URL;
  const slug = product?.id || "";
  const namePage = product?.name || "NotFound!";

  return {
    title: product?.name,
    description: namePage,
    openGraph: {
      title: namePage,
      siteName: namePage,
      description: namePage,
      images: [
        {
          url: product?.images?.[0].url || "",
          width: 800,
          height: 800
        },
        ...previousImages
      ],
      url: url + "/products/" + slug,
      locale: "en_US",
      type: "website"
    }
  };
}

export default async function Page({ params }: Props) {
  const session = await currentUser();
  const id = (await params).productId;
  const sanitizedData = await getProduct(id);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ProductForm
        session={session}
        data={id === "add" ? null : sanitizedData}
      />
    </div>
  );
}
