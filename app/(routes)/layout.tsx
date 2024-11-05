import { SidebarRoot } from "../components/sidebar-root";
import { auth, signOut } from "@/lib/auth";
import { getNameProductById } from "@/lib/get-product";

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const products = await getNameProductById();

  return (
    <SidebarRoot
      {...{ session, products }}
      signOut={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      {children}
    </SidebarRoot>
  );
}
