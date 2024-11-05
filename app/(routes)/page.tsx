import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "./ui/products-table";
import { FileIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProducts } from "@/lib/get-product";
import { currentUser } from "@/lib/account";

export default async function ProductsPage(props: {
  searchParams: Promise<{ q: string; tab: string }>;
}) {
  const session = await currentUser();
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? "";
  const tab = searchParams.tab ?? 0;
  const { products, tabValue, totalProducts } = await getProducts(
    search,
    Number(tab)
  );

  return (
    <Tabs defaultValue="all">
      <TabsContent value="all">
        <ProductsTable
          session={session}
          products={products}
          tabValue={tabValue}
          totalProducts={totalProducts}
        />
      </TabsContent>
    </Tabs>
  );
}

const classLink =
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 h-8 gap-1";
