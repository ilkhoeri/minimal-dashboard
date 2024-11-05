"use client";
import React, { Fragment } from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Session } from "next-auth";

export interface BreadcrumbDropdownProps {
  paths: string[];
}

export function NavBreadcrumb({
  session,
  products
}: {
  session?: Session | null;
  products: { id: string; name: string }[] | null;
}) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="max-md:hidden max-md:sr-only">
      <BreadcrumbList className="flex-nowrap">
        {paths.map((path, index) => {
          const product = products?.find((i) => i.id === path);
          const active = index === paths.length - 1;
          const href = active ? "" : `/${paths.slice(0, index + 1).join("/")}`;
          const displayedName =
            session && session.user.id === path
              ? session.user.name
              : product?.id === path
                ? product.name
                : displayName(path);

          return (
            <Fragment key={path}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={href}
                  active={active}
                  aria-disabled="true"
                >
                  {displayedName}
                </BreadcrumbLink>
              </BreadcrumbItem>

              {index < paths.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export function camelToKebab(n: string): string {
  if (n === undefined) {
    return "";
  }
  return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
export function capitalizeWords(str: string | undefined): string {
  const string = str ?? "---";
  const words = string.split("-");
  const capitalizedWords = words.map((word) => capitalizeString(word));
  return capitalizedWords.join(" ");
}
export function displayName(str: string) {
  str = camelToKebab(str);
  str = capitalizeWords(str);
  str = str.replace(/-/g, " ");
  return str;
}
