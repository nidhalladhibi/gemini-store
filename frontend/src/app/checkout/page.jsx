"use client";

import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { total, clearCart } = useCart();

  return (
    <section className="container-page py-10">
      <h1 className="text-4xl font-black">Checkout</h1>
      <form className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]" onSubmit={(event) => { event.preventDefault(); clearCart(); alert("Commande confirmee"); }}>
        <div className="grid gap-4 rounded-lg bg-white p-6 shadow-sm">
          <input required placeholder="Nom complet" className="focus-ring rounded-lg border border-slate-200 px-4 py-3" />
          <input required placeholder="Telephone" className="focus-ring rounded-lg border border-slate-200 px-4 py-3" />
          <input required placeholder="Adresse livraison" className="focus-ring rounded-lg border border-slate-200 px-4 py-3" />
          <select className="focus-ring rounded-lg border border-slate-200 px-4 py-3">
            <option>Paiement a la livraison</option>
            <option>Carte bancaire Stripe</option>
          </select>
        </div>
        <aside className="h-fit rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Confirmation</h2>
          <p className="mt-4 text-slate-600">Total commande</p>
          <strong className="mt-2 block text-3xl">{total} TND</strong>
          <button className="mt-6 w-full rounded-full bg-brand px-6 py-3 font-bold text-white hover:bg-blue-700">Confirmer la commande</button>
        </aside>
      </form>
    </section>
  );
}
