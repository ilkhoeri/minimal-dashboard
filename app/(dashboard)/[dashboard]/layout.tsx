import { SidebarMain } from "../../components/sidebar-main";
import { auth, signOut as sessionOut } from "@/lib/auth";
import { getIdNameProducts } from "@/lib/get-product";
import { redirect } from "next/navigation";

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect("/auth/sign-in");
  }
  const products = await getIdNameProducts();
  const signOut = async () => {
    "use server";
    await sessionOut({ redirectTo: "/" });
  };

  return (
    <SidebarMain {...{ session, products, signOut }}>
      <main className="flex flex-1 flex-col gap-6 p-4 pt-0">{children}</main>
    </SidebarMain>
  );
}
