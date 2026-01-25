import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeChar(c: string) {
  // Handle smart quotes and apostrophes from mobile keyboards
  if (c === '’' || c === '‘') return "'";
  if (c === '”' || c === '“') return '"';
  return c;
}
