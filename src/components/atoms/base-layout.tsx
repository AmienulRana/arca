'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  {
    title: 'Home',
    href: '/'
  },
  {
    title: 'Report',
    href: '/report'
  }
];

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div>
      <div className="bg-primary/10 mb-5 flex justify-center gap-3 py-4">
        {routes?.map((route) => (
          <Link
            key={route?.href}
            href={route?.href}
            className={`text-sm ${route?.href === pathname ? 'text-primary font-bold' : ''} `}
          >
            {route?.title}
          </Link>
        ))}
      </div>
      <div className="container">{children}</div>
    </div>
  );
}
