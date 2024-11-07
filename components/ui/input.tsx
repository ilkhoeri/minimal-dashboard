"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export function classInput(className?: string) {
  return cn(
    "flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    className
  );
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      className,
      type = "text",
      value,
      disabled,
      onChange,
      spellCheck = false,
      autoComplete = "off",
      ...props
    },
    ref
  ) {
    const [numb, setNumb] = React.useState(value ?? "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);

      const numeric = e.target.value.replace(/[^0-9]/g, "");
      if (/^\d*$/.test(numeric)) {
        type === "number" && setNumb(numeric);
      }
    };

    return (
      <input
        type={type === "number" ? "text" : type}
        className={classInput(className)}
        value={type === "number" ? numb : value}
        {...{
          ref,
          disabled,
          spellCheck,
          autoComplete,
          onChange: handleChange,
          "aria-invalid": "false",
          "aria-disabled": disabled ? "true" : undefined,
          ...props
        }}
      />
    );
  }
);
Input.displayName = "Input";
