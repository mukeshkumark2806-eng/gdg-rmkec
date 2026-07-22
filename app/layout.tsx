import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/data/site';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
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
    <html lang="en" className={`${outfit.variable} dark scroll-smooth`}>
      <body className="bg-[#0B0F17] text-gray-100 flex min-h-screen flex-col selection:bg-blue-500/30 selection:text-blue-200">
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
