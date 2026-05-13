import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-white">
      <div className="container-page grid gap-8 py-12 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-black">Gemini Store</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">Tech shop et agence digitale pour produits premium, setup gaming et croissance en ligne.</p>
        </div>
        <div>
          <h4 className="font-bold">Boutique</h4>
          <div className="mt-3 grid gap-2 text-sm text-slate-300">
            <Link href="/shop">Smartphones</Link>
            <Link href="/shop">Laptops</Link>
            <Link href="/shop">Gaming</Link>
            <Link href="/shop">Accessoires</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold">Services</h4>
          <div className="mt-3 grid gap-2 text-sm text-slate-300">
            <Link href="/services">Creation site web</Link>
            <Link href="/services">Marketing digital</Link>
            <Link href="/services">Branding</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold">Contact</h4>
          <p className="mt-3 text-sm text-slate-300">Tunis, Tunisie<br />contact@geministore.tn<br />+216 00 000 000</p>
        </div>
      </div>
    </footer>
  );
}
