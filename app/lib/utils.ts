import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { laravelMeta } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSearchParams(urlString: string): string {
  const url = new URL(urlString);
  return "?" + url.searchParams.toString();
}

export function getFrom(meta: laravelMeta): number {
  return (meta.current_page - 1) * meta.per_page + 1;
}

export function getNumRow(meta: laravelMeta, loop: number): number {
  return (meta.current_page - 1) * meta.per_page + loop + 1;
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
