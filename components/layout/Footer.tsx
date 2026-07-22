'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Github, Linkedin, Instagram, Twitter, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { footerNav } from '@/data/navigation';
import { GDGLogo } from '@/components/ui/GDGLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-slate-950 text-slate-300 pt-16 pb-12 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <GDGLogo size={38} />
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Google Developer Group - RMK Engineering College. Connecting student developers, building innovative open-source applications, and cultivating industry-ready skills.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
              <MapPin className="h-4 w-4 text-red-400 shrink-0" />
              <span>{siteConfig.address}</span>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-3 mt-3">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-slate-900 p-2.5 text-slate-400 hover:bg-blue-600/20 hover:text-blue-400 hover:border-blue-500/40 border border-white/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-slate-900 p-2.5 text-slate-400 hover:bg-blue-600/20 hover:text-blue-400 hover:border-blue-500/40 border border-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-slate-900 p-2.5 text-slate-400 hover:bg-pink-600/20 hover:text-pink-400 hover:border-pink-500/40 border border-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-slate-900 p-2.5 text-slate-400 hover:bg-blue-400/20 hover:text-blue-400 hover:border-blue-400/40 border border-white/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Explore</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              {footerNav.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Community</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              {footerNav.community.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 3 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Resources</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              {footerNav.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Google Developer Group RMKEC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Designed for RMK Engineering College Developers</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 rounded-full bg-slate-900 border border-white/10 px-3 py-1.5 text-slate-300 hover:text-white hover:border-blue-500/40 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5 text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
