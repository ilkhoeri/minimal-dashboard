import { redirect } from "next/navigation";
import { currentUser } from "@/lib/account";
import { ProductForm } from "../../../../components/product-form";

import type { Metadata } from "next";

type Params = {
  params: Promise<{ dashboard: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const url = process.env.NEXTAUTH_URL;
  const namePage = "Add new product";

  return {
    title: namePage,
    description: namePage,
    openGraph: {
      title: namePage,
      siteName: namePage,
      description: namePage,
      url: url + "/products/add",
      locale: "en_US",
      type: "website"
    }
  };
}

export default async function Page({ params }: Params) {
  const dashboardId = (await params).dashboard;
  const session = await currentUser();

  if (dashboardId !== session?.id) {
    redirect("/dashboard");
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ProductForm session={session} data={null} />
    </div>
  );
}
