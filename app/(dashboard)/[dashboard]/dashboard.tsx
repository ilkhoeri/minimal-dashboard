import { redirect } from "next/navigation";
import { getProducts } from "@/lib/get-product";
import { ProductsSection } from "./components";
import { ChartSection } from "./chart";

import type { Metadata } from "next";
import type { Session } from "@/types/auth";

export async function dashboardMetadata(): Promise<Metadata> {
  const url = process.env.NEXTAUTH_URL;
  const namePage = "Dashboard";
  return {
    title: namePage ? namePage.slice(0, 30) : "NotFound!",
    description: namePage,
    openGraph: {
      title: namePage || "NotFound!",
      description: namePage || "NotFound!",
      url: url + "/dashboard/",
      locale: "en_US",
      type: "website"
    }
  };
}

export async function DashboardPage(
  props: Session & {
    searchParams: Promise<{ q: string; tab: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? "";
  const tab = searchParams.tab ?? 0;
  const session = props.session;
  const productsPerPage = 20;

  if (!session) {
    redirect("/auth/sign-in");
  }

  const { products, tabValue, totalProducts } = await getProducts(
    search,
    Number(tab),
    { productsPerPage, userId: session.id }
  );

  return (
    <>
      <div id="history" className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video bg-muted rounded-lg border text-card-foreground shadow-sm p-6 lg:p-8"></div>
        <div className="aspect-video bg-muted rounded-lg border text-card-foreground shadow-sm p-6 lg:p-8"></div>
        <div className="aspect-video bg-muted rounded-lg border text-card-foreground shadow-sm p-6 lg:p-8"></div>
      </div>

      <div id="analytics" className="relative w-full flex-1 rounded-xl">
        <ChartSection />
      </div>

      <div
        id="products"
        className="relative w-full min-h-screen flex-1 rounded-xl md:min-h-max"
      >
        <ProductsSection {...{ session, products, tabValue, totalProducts }} />
      </div>
    </>
  );
}
