import { redirect } from "next/navigation";
import { currentUser } from "@/lib/account";
import { ProductForm } from "../../../../components/product-form";
import { getProduct } from "@/lib/get-product";

import type { Metadata, ResolvingMetadata } from "next";

type Params = {
  params: Promise<{ dashboard: string; editId: string }>;
};

export async function generateMetadata(
  { params }: Params,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).editId;
  const product = await getProduct(id);
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

export default async function Page({ params }: Params) {
  const dashboardId = (await params).dashboard;
  const editId = (await params).editId;
  const session = await currentUser();
  const sanitizedData = await getProduct(editId);

  if (dashboardId !== session?.id || editId !== sanitizedData.id) {
    redirect("/dashboard");
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ProductForm session={session} data={sanitizedData} />
    </div>
  );
}
