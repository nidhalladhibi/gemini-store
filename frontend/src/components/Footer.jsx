import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-[#0a0a0f] text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-brand/15 blur-[80px]" />
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-brand-dark/10 blur-[60px]" />
      </div>

      {/* Top border glint */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

      <div className="relative container-page py-14">
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-2xl font-black text-transparent">
              Gemini Store
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Tech shop et agence digitale pour produits premium, setup gaming et croissance en ligne.
            </p>
            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              {[
                { label: "Facebook", d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { label: "Instagram", paths: ["rect x='2' y='2' width='20' height='20' rx='5' ry='5'", "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z", "M17.5 6.5h.01"] },
              ].map(({ label, d }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 hover:border-brand/40 hover:bg-brand/10 hover:text-brand"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Boutique</h4>
            <div className="mt-4 grid gap-2.5">
              {["Smartphones", "Laptops", "Gaming", "Accessoires"].map((item) => (
                <Link
                  key={item}
                  href="/shop"
                  className="group flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                >
                  <span className="h-px w-3 bg-brand opacity-0 transition-all duration-200 group-hover:opacity-100" />
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Services</h4>
            <div className="mt-4 grid gap-2.5">
              {[
                { label: "Création site web", href: "/services" },
                { label: "Marketing digital", href: "/services" },
                { label: "Branding", href: "/services" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="group flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                >
                  <span className="h-px w-3 bg-brand opacity-0 transition-all duration-200 group-hover:opacity-100" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Contact</h4>
            <div className="mt-4 grid gap-3">
              <a
                href="https://maps.app.goo.gl/ybaCZx62Cd3LTWcH8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors duration-200 hover:text-white"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                Solimen, Borj Cédria
              </a>

              <a
                href="mailto:contact@geministore.tn"
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors duration-200 hover:text-white"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                contact@geministore.tn
              </a>

              <a
                href="tel:+21651679495"
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors duration-200 hover:text-white"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                +216 51 679 495
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Gemini Store. Tous droits réservés.
          </p>
          <div className="flex gap-5 text-xs text-slate-500">
            <Link href="/privacy" className="transition-colors hover:text-slate-300">Confidentialité</Link>
            <Link href="/terms" className="transition-colors hover:text-slate-300">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}