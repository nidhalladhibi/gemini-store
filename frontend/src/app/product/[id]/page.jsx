"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { FiHeart, FiShoppingCart, FiTruck } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { demoProducts } from "@/lib/data";

export default function ProductDetailsPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const product = demoProducts.find((item) => item._id === params.id) || demoProducts[0];

  return (
    <section className="container-page grid gap-8 py-10 lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-white shadow-sm">
        <Image src={product.images[0]} alt={product.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase text-brand">{product.category}</p>
        <h1 className="mt-3 text-4xl font-black">{product.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{product.description}</p>
        <div className="mt-6 flex items-center gap-4">
          <strong className="text-3xl">{product.price} TND</strong>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">Stock: {product.stock}</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => addToCart(product)} className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-white hover:bg-blue-700"><FiShoppingCart /> Ajouter au panier</button>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 font-bold text-slate-700 hover:text-brand"><FiHeart /> Wishlist</button>
        </div>
        <div className="mt-8 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
          <FiTruck className="mb-2 text-xl text-brand" />
          Livraison rapide, garantie produit et support Gemini Store.
        </div>
      </div>
    </section>
  );
}
