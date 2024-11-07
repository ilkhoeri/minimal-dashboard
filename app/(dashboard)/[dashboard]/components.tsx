"use client";
import React from "react";
import Link from "next/link";
import { IconCirclePlus } from "@tabler/icons-react";
import { ProductsTable } from "../../components/products-table";
import { DownloadFiles } from "@/app/components/download-files";

import type { Session } from "@/types/auth";
import type { SelectProduct } from "@/types/client";

export function ProductsSection({
  ...restProducts
}: Session & {
  products: SelectProduct[];
  tabValue: number | null;
  totalProducts: number;
}) {
  const targetRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="ml-auto w-max mb-2 flex items-center gap-2">
        <DownloadFiles targetRefOrFunction={targetRef} fileName="products" />

        {restProducts?.session && (
          <Link
            href={`/${restProducts.session.id}/products/add`}
            className={classLink}
          >
            <IconCirclePlus className="size-5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Link>
        )}
      </div>

      <ProductsTable refFiles={targetRef} {...restProducts} />
    </>
  );
}

const classLink =
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 h-8 gap-1";
