import { Instagram, Linkedin, Youtube, Twitter, ArrowUp } from 'lucide-react';
import { AGENCY, NAV_ITEMS } from '@/data/content';

export function Footer() {
  return (
    <footer className="relative border-t border-violet-500/20 pt-16 pb-8">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt={AGENCY.name}
                className="h-10 w-auto object-contain"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <span className="font-display font-bold text-xl">{AGENCY.name}</span>
            </div>
            <p className="text-sm text-slate-400 light:text-slate-600 leading-relaxed max-w-md">
              We scale brands into market leaders with high-CTR ads, viral content, and conversion-first web architecture. Your growth is our only metric.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Instagram, href: AGENCY.socials.instagram, label: 'Instagram' },
                { icon: Linkedin, href: AGENCY.socials.linkedin, label: 'LinkedIn' },
                { icon: Youtube, href: AGENCY.socials.youtube, label: 'YouTube' },
                { icon: Twitter, href: AGENCY.socials.twitter, label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-violet-500/10 hover:text-violet-400 transition-all hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-300 light:text-slate-700">Quick Links</h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-slate-400 light:text-slate-600 hover:text-violet-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-300 light:text-slate-700">Get in Touch</h4>
            <ul className="space-y-2.5 text-sm text-slate-400 light:text-slate-600">
              <li><a href={`mailto:${AGENCY.email}`} className="hover:text-violet-400 transition-colors">{AGENCY.email}</a></li>
              <li><a href={`tel:${AGENCY.phone}`} className="hover:text-violet-400 transition-colors">{AGENCY.phone}</a></li>
              <li>{AGENCY.office}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-violet-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {AGENCY.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built with precision · Designed to convert
          </p>
        </div>
      </div>

      {/* Back to top */}
      <a
        href="#hero"
        aria-label="Back to top"
        className="fixed bottom-24 right-4 sm:right-6 z-40 w-11 h-11 rounded-xl glass-strong flex items-center justify-center hover:bg-violet-500/10 hover:text-violet-400 transition-all hover:scale-110"
      >
        <ArrowUp className="w-5 h-5" />
      </a>
    </footer>
  );
}
