"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/icons";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function SearchInput() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function searchAction(formData: FormData) {
    let value = formData.get("q") as string;
    let params = new URLSearchParams({ q: value });
    startTransition(() => {
      router.replace(`?${params.toString()}`);
    });
  }

  return (
    <form
      action={searchAction}
      className="relative flex items-center flex-1 ml-auto md:grow-0"
    >
      <MagnifyingGlassIcon className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        name="q"
        type="search"
        placeholder="Search..."
        className="pl-8 md:w-[200px] lg:w-[336px]"
      />
      {isPending && <Spinner />}
    </form>
  );
}
