
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { FirebaseClientProvider } from '@/firebase';
import { PageLoaderProvider } from '@/components/providers/page-loader-provider';
import { PageLoader } from '@/components/shared/page-loader';
import { ServiceWorkerProvider } from '@/components/providers/service-worker-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://nutrifygh--studio-228615184-8a100.europe-west4.hosted.app'),
  title: 'Nutrify',
  description: 'A Ghana-focused smart nutrition platform to help you track your meals and achieve your health goals.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/favicon.ico', sizes: '180x180', type: 'image/x-icon' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#00b371',
  viewportFit: 'cover',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FirebaseClientProvider>
            <PageLoaderProvider>
              <ServiceWorkerProvider />
              {children}
              <PageLoader />
            </PageLoaderProvider>
          </FirebaseClientProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
