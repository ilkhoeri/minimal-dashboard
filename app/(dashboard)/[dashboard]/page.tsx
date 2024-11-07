import { redirect } from "next/navigation";
import { currentUser } from "@/lib/account";
import { DashboardPage, dashboardMetadata } from "./dashboard";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return { ...dashboardMetadata };
}

export default async function UserLayout({
  params,
  searchParams
}: Readonly<{
  params: Promise<{ dashboard: string }>;
  searchParams: Promise<{ q: string; tab: string }>;
}>) {
  const slug = (await params).dashboard;
  const session = await currentUser();

  if (!session) return null;
  const paths = ["dashboard", session.id];

  if (!paths.includes(slug)) {
    redirect(`/dashboard/${session.id}`);
  }

  return <DashboardPage session={session} searchParams={searchParams} />;
}
