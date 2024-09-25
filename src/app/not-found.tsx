/* eslint-disable @next/next/no-img-element */

import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Not Found Page',
  description: 'Halaman ini mungkin sudah tidak tersedia'
};
// Forced redirect to default locale
export default function NotFound() {
  return 'Not Found';
}
