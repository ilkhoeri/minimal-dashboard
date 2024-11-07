import Providers from "../components/providers";
import { auth } from "@/lib/auth";
import { User } from "../components/user";
import { SearchInput } from "../components/search";
import { Analytics } from "@vercel/analytics/react";
import { getIdNameProducts } from "@/lib/get-product";
import { NavBreadcrumb, DesktopNav, MobileNav } from "../components/nav";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const products = await getIdNameProducts();

  return (
    <Providers>
      <DesktopNav session={session}>
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:[&_form]:ml-auto">
            <MobileNav session={session} />
            <NavBreadcrumb session={session} products={products} />
            <SearchInput className="pl-8 md:w-[200px] lg:w-[336px]" />
            <User />
          </header>

          <div className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </div>
        </div>
        <Analytics />
      </DesktopNav>
    </Providers>
  );
}
