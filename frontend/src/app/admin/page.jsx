"use client";

import { FiBox, FiDollarSign, FiShoppingBag, FiUsers } from "react-icons/fi";
import { demoProducts, services } from "@/lib/data";

const stats = [
  ["Total produits", "128", FiBox],
  ["Total ventes", "42K TND", FiDollarSign],
  ["Commandes", "86", FiShoppingBag],
  ["Utilisateurs", "1.2K", FiUsers]
];

export default function AdminPage() {
  return (
    <section className="container-page py-10">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase text-brand">Admin securise</p>
        <h1 className="mt-2 text-4xl font-black">Dashboard Gemini Store</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map(([label, value, Icon]) => (
          <div key={label} className="rounded-lg bg-white p-5 shadow-sm">
            <Icon className="text-2xl text-brand" />
            <p className="mt-4 text-sm text-slate-500">{label}</p>
            <strong className="text-2xl">{value}</strong>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Gestion produits</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b"><th className="py-3">Produit</th><th>Prix</th><th>Stock</th></tr></thead>
              <tbody>{demoProducts.map((product) => <tr key={product._id} className="border-b"><td className="py-3 font-semibold">{product.title}</td><td>{product.price}</td><td>{product.stock}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Gestion services</h2>
          <div className="mt-4 grid gap-3">
            {services.map((service) => <div key={service.title} className="rounded-lg border border-slate-200 p-4"><strong>{service.title}</strong><p className="text-sm text-slate-600">{service.text}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
