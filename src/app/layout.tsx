import BaseLayout from '@/components/atoms/base-layout';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '../styles/globals.scss';

export const metadata = {
  title: 'Arca Technical Test',
  description: 'Pos System'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        {/* Layout UI */}
        <main>
          <MantineProvider>
            <BaseLayout>{children}</BaseLayout>
          </MantineProvider>
        </main>
      </body>
    </html>
  );
}
