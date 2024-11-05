import db from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/account";

export default async function UserLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await currentUser();

  if (!session) {
    redirect("/auth/sign-in");
  }

  const user = await db.user.findFirst({
    where: {
      id: session.id
    }
  });

  if (!user) {
    redirect("/auth/sign-in");
  }

  return <>{children}</>;
}
