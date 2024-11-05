import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(time: Date) {
  return time.toLocaleString("id-ID", {
    day: "2-digit",
    year: "numeric",
    month: "short"
  });
}

export function formatDateToInputX(date: Date) {
  return date.toString().slice(0, 16); // conversion to "YYYY-MM-DDTHH:MM"
}

export function formatDateToInput(date: Date): string {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export const price = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR"
});
