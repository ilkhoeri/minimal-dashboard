import { currentUser } from "@/lib/account";
import { getProducts } from "@/lib/get-product";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ProductsTable } from "../components/products-table";

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
