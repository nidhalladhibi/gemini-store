"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { categories, demoProducts } from "@/lib/data";

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tous");

  const products = useMemo(() => {
    return demoProducts.filter((product) => {
      const matchesQuery = product.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "Tous" || product.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <section className="container-page py-10">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase text-brand">Boutique</p>
        <h1 className="mt-2 text-4xl font-black">Produits Gemini Store</h1>
      </div>
      <div className="mb-8 grid gap-3 rounded-lg bg-white p-4 shadow-sm md:grid-cols-[1fr_240px]">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un produit..." className="focus-ring rounded-lg border border-slate-200 px-4 py-3" />
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="focus-ring rounded-lg border border-slate-200 px-4 py-3">
          <option>Tous</option>
          {categories.map((item) => <option key={item.name}>{item.name}</option>)}
        </select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </section>
  );
}
