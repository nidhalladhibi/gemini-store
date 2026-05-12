"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/lib/data";
import { api } from "@/lib/api";

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tous");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const search = new URLSearchParams(window.location.search).get("search");
    if (search) setQuery(search);
  }, []);

  useEffect(() => {
    const params = {};
    if (query.trim()) params.search = query.trim();
    if (category !== "Tous") params.category = category;

    setIsLoading(true);
    setError("");

    api.get("/products", { params })
      .then(({ data }) => setProducts(data))
      .catch(() => setError("Impossible de charger les produits."))
      .finally(() => setIsLoading(false));
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
      {error && <p className="rounded-lg bg-red-50 p-4 text-center font-semibold text-red-600">{error}</p>}
      {isLoading && <p className="p-10 text-center text-slate-600">Chargement des produits...</p>}
      {!isLoading && !error && products.length === 0 && <p className="p-10 text-center text-slate-600">Aucun produit trouve.</p>}
      {!isLoading && !error && products.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      )}
    </section>
  );
}
