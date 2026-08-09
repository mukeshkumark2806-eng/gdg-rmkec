'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Github, Linkedin, Instagram, Twitter, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { footerNav } from '@/data/navigation';
import { GDGLogo } from '@/components/ui/GDGLogo';

const socialLinks = [
  { href: siteConfig.socials.github,    icon: <Github    className="h-4 w-4" />, label: 'GitHub' },
  { href: siteConfig.socials.linkedin,  icon: <Linkedin  className="h-4 w-4" />, label: 'LinkedIn' },
  { href: siteConfig.socials.instagram, icon: <Instagram className="h-4 w-4" />, label: 'Instagram' },
  { href: siteConfig.socials.twitter,   icon: <Twitter   className="h-4 w-4" />, label: 'Twitter' },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-[#0D1117] text-[#E8EAED] overflow-hidden">



      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-dot-grid-dark pointer-events-none opacity-60" />

      {/* Soft glow bottom center */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(66,133,244,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-8 pt-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-white/08">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link
              href="/"
              onClick={() => window.dispatchEvent(new CustomEvent('trigger-google-loader'))}
              className="hover:opacity-80 transition-opacity w-fit"
            >
              <GDGLogo size={48} theme="dark" />
            </Link>

            <p className="text-[14px] text-[#8B949E] leading-relaxed max-w-sm">
              The official Google Developer Group at RMK Engineering College — connecting student developers, building innovative open-source software, and cultivating industry-ready skills.
            </p>

            <div className="flex items-center gap-2 text-[12px] text-[#8B949E]">
              <MapPin className="h-3.5 w-3.5 text-[#EA4335] shrink-0" />
              <span>{siteConfig.address}</span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#8B949E] hover:border-[#4285F4]/50 hover:text-[#6BA3F7] hover:bg-[#4285F4]/08 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {[
            { title: 'Explore', links: footerNav.explore },
            { title: 'Community', links: footerNav.community },
            { title: 'Resources', links: footerNav.resources },
          ].map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4
                className="text-[12px] font-bold uppercase tracking-widest text-[#E8EAED]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-[#8B949E] hover:text-[#E8EAED] transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[13px] text-[#8B949E] hover:text-[#E8EAED] transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#8B949E]">
          <p>© {new Date().getFullYear()} Google Developer Group RMKEC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hidden sm:block">Designed for RMK Engineering College</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[#8B949E] hover:text-[#E8EAED] hover:border-[#4285F4]/40 transition-all duration-200"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5 text-[#4285F4]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
