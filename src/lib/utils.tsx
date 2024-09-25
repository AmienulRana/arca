import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (price: number | string): string => {
  let formattedPrice = Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(Number(price));

  formattedPrice = formattedPrice?.concat(',-');

  return formattedPrice;
};
