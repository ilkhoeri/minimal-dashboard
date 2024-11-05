"use client";

import { Product } from "./product";
import { SelectProduct } from "@/types/client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Session } from "@/types/auth";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function ProductsTable({
  session,
  products,
  tabValue,
  totalProducts,
  productsPerPage = 5
}: Session & {
  products: SelectProduct[];
  tabValue: number | null;
  totalProducts: number;
  productsPerPage?: number;
  query?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const tabQuery = parseInt(searchParams.get("tab") || "0", 10);

  function prevPage() {
    const newTab = tabQuery - productsPerPage;
    if (newTab >= 0) {
      const params = new URLSearchParams({
        q: searchQuery,
        tab: String(newTab)
      });
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }

  function nextPage() {
    const newTab = tabQuery + productsPerPage;
    if (newTab < totalProducts) {
      const params = new URLSearchParams({
        q: searchQuery,
        tab: String(newTab)
      });
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Stock</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <Product key={product.id} session={session} product={product} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {Math.max(
                0,
                Math.min(Number(tabValue) - productsPerPage, totalProducts) + 1
              )}
              -{tabValue}
            </strong>{" "}
            of <strong>{totalProducts}</strong> products
          </div>

          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={tabQuery <= 0}
            >
              <ChevronLeftIcon className="mr-2 h-4 w-4" />
              Prev
            </Button>

            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={tabQuery + productsPerPage >= totalProducts}
            >
              Next
              <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
