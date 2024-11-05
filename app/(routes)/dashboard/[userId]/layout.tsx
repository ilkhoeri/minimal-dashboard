import db from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/account";

export default async function UserLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return <>{children}</>;
}
