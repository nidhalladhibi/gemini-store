"use client";

import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  return (
    <section className="container-page py-10">
      <h1 className="text-4xl font-black">Panier</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg bg-white shadow-sm">
          {items.length === 0 && <p className="p-6 text-slate-600">Votre panier est vide.</p>}
          {items.map((item) => (
            <div key={item._id} className="grid gap-4 border-b border-slate-100 p-5 md:grid-cols-[1fr_130px_110px_40px] md:items-center">
              <div>
                <h2 className="font-bold">{item.title}</h2>
                <p className="text-sm text-slate-500">{item.category} · {item.price} TND</p>
              </div>
              <input type="number" min="1" value={item.quantity} onChange={(event) => updateQuantity(item._id, Number(event.target.value))} className="focus-ring rounded-lg border border-slate-200 px-3 py-2" />
              <strong>{item.price * item.quantity} TND</strong>
              <button onClick={() => removeFromCart(item._id)} className="rounded-full p-2 text-red-500 hover:bg-red-50" aria-label="Supprimer"><FiTrash2 /></button>
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Resume</h2>
          <div className="mt-5 flex justify-between text-lg">
            <span>Total</span>
            <strong>{total} TND</strong>
          </div>
          <Link href="/checkout" className="mt-6 block rounded-full bg-ink px-6 py-3 text-center font-bold text-white hover:bg-slate-800">Commander</Link>
        </aside>
      </div>
    </section>
  );
}
