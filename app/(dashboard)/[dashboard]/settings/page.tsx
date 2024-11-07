import { currentUser } from "@/lib/account";
import { SettingsPage } from "./components";

import type { Metadata, ResolvingMetadata } from "next";
interface Params {
  params: Promise<{ dashboard: string }>;
}

export async function generateMetadata(
  { params }: Params,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).dashboard;
  const user = await currentUser();
  const previousImages = (await parent).openGraph?.images || [];

  const url = process.env.NEXTAUTH_URL;
  const slug = `/${id}/${user?.id}` || "";
  const namePage = user?.name || "NotFound!";

  return {
    title: user?.name,
    description: namePage,
    openGraph: {
      title: namePage,
      siteName: namePage,
      description: namePage,
      images: [
        {
          url: user?.image || "",
          width: 800,
          height: 800
        },
        ...previousImages
      ],
      url: url + slug,
      locale: "en_US",
      type: "website"
    }
  };
}

export default async function Settings({ params }: Params) {
  const session = await currentUser();

  return <SettingsPage session={session} />;
}
