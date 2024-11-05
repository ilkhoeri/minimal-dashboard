"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { NavItem } from "./nav-item";
import { UsersIcon } from "@/components/icons";
import { VercelLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
  HomeIcon,
  BarChartIcon,
  ArchiveIcon,
  ContainerIcon,
  GearIcon,
  TokensIcon,
  TextAlignLeftIcon
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

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
            <React.Fragment key={path}>
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
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function DesktopNav({
  session,
  children
}: {
  session?: Session | null;
  children?: React.ReactNode;
}) {
  const [stretch, setStretch] = React.useState(false);

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-10 hidden sm:flex flex-col border-r bg-background transition-[width] duration-200",
          stretch ? "w-[200px]" : "w-14"
        )}
      >
        <nav
          className={cn(
            "grid grid-flow-row pr-3 pl-3 gap-4 sm:py-5 transition-[padding] duration-200"
          )}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setStretch(!stretch)}
            className="mr-auto -ml-1"
          >
            <TextAlignLeftIcon className="size-6" />
            <span className="sr-only hidden">aside-sizer</span>
          </Button>

          <Link
            href="/"
            className="group flex size-9 md:size-8 shrink-0 items-center justify-center mt-8 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base mr-auto"
          >
            <VercelLogo className="size-3 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>

          {session &&
            routeInSession(session?.user.id).map((i) => (
              <NavItem key={i.label} stretch={stretch} {...i}>
                <i.icon className="size-5 min-h-5 min-w-5" />
              </NavItem>
            ))}

          {route.map((i) => (
            <NavItem key={i.label} stretch={stretch} {...i}>
              <i.icon className="size-5 min-h-5 min-w-5" />
            </NavItem>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ml-auto mr-0.5"
              >
                <GearIcon className="size-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>

      <main
        className={cn(
          "flex min-h-screen flex-col bg-muted/40 transition-[padding] duration-200 w-full relative max-sm:pl-0",
          stretch ? "pl-[200px]" : "sm:pl-14"
        )}
      >
        {children}
      </main>
    </>
  );
}

export function MobileNav({ session }: { session?: Session | null }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <ContainerIcon className="size-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-[300px]">
        <nav className="grid gap-4 text-base font-medium">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base mb-4"
          >
            <VercelLogo className="h-3 w-3 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>

          {session &&
            routeInSession(session?.user.id).map((i) => (
              <Link
                key={i.label}
                href={i.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <i.icon className="size-5 min-h-5 min-w-5" />
                {i.label}
              </Link>
            ))}

          {route.map((i) => (
            <Link
              key={i.label}
              href={i.href}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <i.icon className="size-5 min-h-5 min-w-5" />
              {i.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

const routeInSession = (userId: string | undefined) => [
  {
    label: "Dashboard",
    href: `/dashboard/${userId}`,
    icon: HomeIcon
  },
  {
    label: "Products",
    href: `/${userId}/products`,
    icon: ArchiveIcon
  }
];

const route = [
  {
    label: "Orders",
    href: "#",
    icon: TokensIcon
  },
  {
    label: "Customers",
    href: "/customers",
    icon: UsersIcon
  },
  {
    label: "Analytics",
    href: "#",
    icon: BarChartIcon
  }
];

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