"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

const nav = [
  ["Accueil", "/"],
  ["Shop", "/shop"],
  ["Services", "/services"],
  ["Contact", "/contact"],
  // ["Admin", "/admin"]
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { items } = useCart();
  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/shop?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-20 items-center gap-4">
        <Link href="/" className="text-xl font-black tracking-tight text-ink">
          Gemini <span className="text-brand">Store</span>
        </Link>
        <div className="hidden flex-1 items-center rounded-full border border-slate-200 bg-slate-50 px-4 focus-within:border-brand md:flex">
          <FiSearch className="text-slate-400" />
          <input
            className="h-11 flex-1 bg-transparent px-3 text-sm outline-none"
            placeholder="Rechercher smartphone, laptop, accessoire..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 lg:flex">
          {nav.map(([label, href]) => <Link key={href} href={href} className="hover:text-brand">{label}</Link>)}
        </nav>
        {/* <Link href="/login" className="hidden rounded-full border border-slate-200 p-3 text-slate-700 hover:text-brand md:block" aria-label="Compte">
          <FiUser />
        </Link> */}
        <Link href="/cart" className="relative rounded-full bg-ink p-3 text-white" aria-label="Panier">
          <FiShoppingCart />
          {items.length > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-brand text-xs">{items.length}</span>}
        </Link>
        <button className="rounded-full border border-slate-200 p-3 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="container-page grid gap-2 py-4 text-sm font-semibold">
            {nav.map(([label, href]) => <Link key={href} href={href} className="rounded-lg px-3 py-2 hover:bg-slate-100" onClick={() => setOpen(false)}>{label}</Link>)}
          </nav>
        </div>
      )}
    </header>
  );
}
