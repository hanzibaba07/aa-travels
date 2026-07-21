import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDistance(meters: number) {
  if (meters < 1000) return `${meters} m from Haram`;
  return `${(meters / 1000).toFixed(1)} km from Haram`;
}

export function whatsappLink(number: string, message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}
