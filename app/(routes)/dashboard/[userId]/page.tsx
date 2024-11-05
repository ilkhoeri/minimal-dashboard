import Link from "next/link";
import { getProducts } from "@/lib/get-product";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "../../ui/products-table";
import { FileIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentUser } from "@/lib/account";

export interface UserIdParams {
  params: { userId: string };
}

export default async function ProductsPage(
  props: UserIdParams & {
    searchParams: Promise<{ q: string; tab: string }>;
  }
) {
  const { userId } = await props.params;
  const session = await currentUser();
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? "";
  const tab = searchParams.tab ?? 0;
  const productsPerPage = 20;
  const { products, tabValue, totalProducts } = await getProducts(
    search,
    Number(tab),
    { productsPerPage, userId }
  );

  return (
    <>
      <div className="ml-auto mb-2 flex items-center gap-2">
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <FileIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Export
          </span>
        </Button>
        <Link href={`/${userId}/products/add`} className={classLink}>
          <PlusCircledIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Link>
      </div>

      <ProductsTable
        session={session}
        products={products}
        tabValue={tabValue}
        totalProducts={totalProducts}
        productsPerPage={productsPerPage}
      />
    </>
  );
}

const classLink =
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 h-8 gap-1";