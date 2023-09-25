import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Created by shadCn to merge tailwind utilities
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
