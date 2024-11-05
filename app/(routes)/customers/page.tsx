import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import type { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const url = process.env.NEXTAUTH_URL;
  const namePage = "Customers";
  return {
    title: namePage ? namePage.slice(0, 30) : "NotFound!",
    description: namePage,
    openGraph: {
      title: namePage || "NotFound!",
      description: namePage || "NotFound!",
      url: url + "/customers/",
      locale: "en_US",
      type: "website"
    }
  };
}

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>View all customers and their orders.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
