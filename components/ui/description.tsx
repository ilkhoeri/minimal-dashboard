"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const descVariants = cva(
  "w-full text-muted-foreground leading-none text-[12px] text-left truncate"
);

interface DescriptionProps {
  className?: string;
  desc?: string;
  children?: React.ReactNode;
}

type descRef = React.ForwardRefExoticComponent<
  DescriptionProps & React.RefAttributes<HTMLParagraphElement>
>;

export const Description = React.forwardRef<
  React.ElementRef<descRef>,
  React.ComponentPropsWithoutRef<descRef> & VariantProps<typeof descVariants>
>(({ className, children, desc, ...props }, ref) => (
  <p ref={ref} className={twMerge(descVariants(), className)} {...props}>
    {children || desc}
  </p>
));
Description.displayName = Description.displayName;
