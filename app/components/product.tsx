"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { IconDots } from "@tabler/icons-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { SelectProduct } from "@/types/client";
import { cn, formatTime } from "@/lib/utils";
import { DeleteProduct } from "./actions";
import { Session } from "@/types/auth";
import { Media } from "@/components/ui/media";

export function Product({
  session,
  product
}: Session & {
  product: SelectProduct;
}) {
  const variants = (v: "active" | "draft" | "archived") =>
    product.status.toLowerCase() === v;
  return (
    <TableRow title={product.name}>
      <TableCell className="table-cell">
        {product?.images[0]?.url ? (
          <Media
            alt="Product image"
            className="rounded-md aspect-square object-cover"
            height="64"
            width="64"
            src={product?.images[0]?.url || ""}
          />
        ) : (
          <span className="aspect-square flex items-center justify-center text-4xl font-bold size-16 rounded-md bg-muted">
            {product.name.slice(0, 2)}
          </span>
        )}
      </TableCell>

      <TableCell className="font-medium">
        <Link href={`/products/${product.id}`} className="block size-full">
          {product.name}
        </Link>
      </TableCell>

      <TableCell>
        {product.status && (
          <Badge
            // @ts-ignore
            variant={cn({
              constructive: variants("active"),
              default: variants("draft"),
              destructive: variants("archived")
            })}
            className="capitalize min-w-[74px] justify-center"
          >
            {product.status}
          </Badge>
        )}
      </TableCell>

      <TableCell className="hidden md:table-cell">{product.price}</TableCell>

      <TableCell className="hidden md:table-cell">{product.stock}</TableCell>

      <TableCell className="hidden md:table-cell">
        {formatTime(new Date(product.availableAt))}
      </TableCell>

      <TableCell>
        {session && session?.id === product.userId && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-haspopup="true"
                size="icon"
                variant="ghost"
                className="border select-none"
              >
                <IconDots className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="border-b">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/${session.id}/products/${product.id}`}>Edit</Link>
              </DropdownMenuItem>
              <DeleteProduct session={session} product={product}>
                <DropdownMenuItem primitive>Delete</DropdownMenuItem>
              </DeleteProduct>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </TableCell>
    </TableRow>
  );
}
