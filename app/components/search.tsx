"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/icons";
import { useSidebar } from "@/components/ui/sidebar";
import { IconSearch } from "@tabler/icons-react";

export function SearchInput({
  className,
  isSidebar
}: {
  className?: string;
  isSidebar?: boolean;
}) {
  const router = useRouter();
  const { toggleSidebar, open } = useSidebar();
  const [isPending, startTransition] = useTransition();

  function searchAction(formData: FormData) {
    const value = formData.get("q") as string;
    const params = new URLSearchParams({ q: value });
    startTransition(() => {
      router.replace(`?${params.toString()}`);
    });
  }

  return (
    <form
      action={searchAction}
      className="relative flex items-center justify-center flex-1 md:grow-0 [--sz:16px] [--space:32px] [&>input]:pl-[--space]"
    >
      <Input
        name="q"
        id="q-search"
        type="search"
        placeholder="Search..."
        className={className}
        disabled={isSidebar && !open}
      />
      <label
        htmlFor="q-search"
        onClick={() => {
          if (isSidebar && !open) toggleSidebar();
        }}
        className="cursor-pointer flex items-center justify-center size-[--space] absolute left-0"
      >
        <IconSearch className="size-[--sz] min-h-[--sz] min-w-[--sz]" />
      </label>
      {isPending && <Spinner />}
    </form>
  );
}
