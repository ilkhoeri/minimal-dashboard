import { redirect } from "next/navigation";
import { currentUser } from "@/lib/account";
import { DashboardPage, dashboardMetadata } from "../dashboard";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return { ...dashboardMetadata };
}

export interface Params {
  params: Promise<{ dashboard: string; id: string }>;
}

export default async function Page({
  params,
  searchParams
}: Params & {
  searchParams: Promise<{ q: string; tab: string }>;
}) {
  const slug = (await params);
  const session = await currentUser();

  if (
    session &&
    (slug.dashboard !== "dashboard" || slug.id !== session.id)
  ) {
    return redirect(`/dashboard/${session.id}`);
  }

  return <DashboardPage session={session} searchParams={searchParams} />;
}
