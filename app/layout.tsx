import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/data/site';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.fullName}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'GDG RMKEC',
    'Google Developer Group RMKEC',
    'RMK Engineering College',
    'GDSC RMKEC',
    'Student Developers Chennai',
    'Google Cloud RMK',
    'Generative AI Hackathon',
  ],
  authors: [{ name: 'GDG RMKEC Core Team' }],
  openGraph: {
    title: siteConfig.fullName,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.fullName,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-[#F5F7FA] text-[#1A1A2E] flex min-h-screen flex-col selection:bg-blue-100 selection:text-blue-900">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="flex-grow relative">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
