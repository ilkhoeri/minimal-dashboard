"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function NavItem({
  href,
  label,
  children,
  stretch
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  stretch?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(stretch);

  return (
    <Tooltip
      open={open}
      onOpenChange={() => {
        if (stretch) {
          setOpen(false);
        } else {
          setOpen(!open);
        }
      }}
    >
      <TooltipTrigger asChild>
        <Link
          href={href}
          data-stretch={stretch ? "active" : ""}
          className={cn(
            "flex items-center gap-4 rounded-lg text-muted-foreground hover:text-foreground min-h-8 size-9 md:size-8 p-1.5 data-[stretch=active]:h-8 data-[stretch=active]:w-full transition-all duration-200",
            {
              "bg-accent text-black [&_*]:text-black": pathname === href
            }
          )}
        >
          {children}
          <span
            className={cn(
              "font-medium line-clamp-1 [transition:opacity,transform_200ms_ease]",
              stretch
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            )}
          >
            {label}
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
