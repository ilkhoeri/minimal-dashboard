import Providers from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { User } from "./user";
import { SearchInput } from "./search";
import { auth } from "@/lib/auth";
import { NavBreadcrumb } from "./nav-breadcrumb";
import { getNameProductById } from "@/lib/get-product";
import { DesktopNav, MobileNav } from "./nav";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const productOnly = await getNameProductById();

  return (
    <Providers>
      <DesktopNav session={session}>
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav session={session} />
            <NavBreadcrumb session={session} products={productOnly} />
            <SearchInput />
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
