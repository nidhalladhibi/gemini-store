"use client";

import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/product/${product._id}`} className="relative block aspect-[4/3] bg-slate-100">
        <Image src={product.images?.[0] || "/placeholder.png"} alt={product.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase text-slate-500">
          <span>{product.category}</span>
          <span className="flex items-center gap-1 text-amber-500"><FiStar /> {product.rating || 4.7}</span>
        </div>
        <Link href={`/product/${product._id}`} className="mt-2 line-clamp-2 min-h-12 text-base font-bold text-ink hover:text-brand">{product.title}</Link>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <strong className="text-lg text-ink">{product.price} TND</strong>
          <div className="flex gap-2">
            <button className="rounded-full border border-slate-200 p-2 text-slate-600 hover:text-brand" aria-label="Wishlist"><FiHeart /></button>
            <button onClick={() => addToCart(product)} className="rounded-full bg-brand p-2 text-white hover:bg-blue-700" aria-label="Ajouter au panier"><FiShoppingCart /></button>
          </div>
        </div>
      </div>
    </article>
  );
}
