import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { BootPreloader } from '@/components/ui/BootPreloader';
import { BracketsField } from '@/components/ui/BracketsField';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/data/site';
import { LiteModeProvider } from '@/context/LiteModeContext';
import { ChatbotWidget } from '@/components/chatbot/ChatbotWidget';

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
    default: 'GDG on Campus RMKEC | Building the Future of Technology at RMKEC',
    template: `%s | GDG on Campus RMKEC`,
  },
  description:
    'Google Developer Group on Campus – R.M.K. Engineering College is a student-led technology community that empowers students to learn, build, collaborate, and innovate.',
  keywords: [
    'GDG on Campus RMKEC',
    'GDG RMKEC',
    'Google Developer Group on Campus',
    'RMK Engineering College',
    'HackNEXA 26',
    'Google Cloud Study Jam',
    'Agentic AI',
    'Student Tech Community Chennai',
  ],
  authors: [{ name: 'GDG on Campus RMKEC Team' }],
  openGraph: {
    title: 'GDG on Campus RMKEC',
    description:
      'Building the Future of Technology at RMKEC — A community of innovators, builders, and problem solvers.',
    url: siteConfig.url,
    siteName: 'GDG on Campus RMKEC',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDG on Campus RMKEC',
    description:
      'Building the Future of Technology at RMKEC — A community of innovators, builders, and problem solvers.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          id="lite-mode-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var p = new URLSearchParams(window.location.search);
                  var l = p.get('lite');
                  var on = false;
                  if (l === '1') on = true;
                  else if (l === '0') on = false;
                  else {
                    var s = localStorage.getItem('gdg-lite') || localStorage.getItem('devfest-lite');
                    if (s === '1') on = true;
                  }
                  if (on) {
                    document.documentElement.classList.add('lite-mode');
                    document.documentElement.setAttribute('data-lite', '1');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-black text-[#f0f0f2] flex min-h-screen flex-col selection:bg-[#4285F4]/30 selection:text-white">
        <LiteModeProvider>
          {/* Google 4-Dot Bouncing Preloader */}
          <BootPreloader />

          {/* Ambient Interactive Code Brackets Background */}
          <BracketsField />

          {/* Floating Capsule Navbar & Fullscreen Rolling Menu */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow relative z-10">{children}</main>

          {/* Signature Yellow Brackets Footer */}
          <Footer />

          {/* Floating GDG Campus Guide Chatbot Widget */}
          <ChatbotWidget />
        </LiteModeProvider>
      </body>
    </html>
  );
}
