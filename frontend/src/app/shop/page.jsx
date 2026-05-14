"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/lib/data";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelectedCategory(params.get("category") || "");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="container-page py-10">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-brand">Boutique</p>
          <h1 className="mt-2 text-3xl font-black">
            {selectedCategory ? selectedCategory : "Nos produits"}
          </h1>
        </div>
        <span className="text-sm font-semibold text-slate-500">
          {filteredProducts.length} produit(s)
        </span>
      </div>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        <Link
          href="/shop"
          onClick={() => setSelectedCategory("")}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${
            selectedCategory ? "border border-slate-200 bg-white text-slate-600" : "bg-brand text-white"
          }`}
        >
          Tous
        </Link>
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/shop?category=${encodeURIComponent(category.name)}`}
            onClick={() => setSelectedCategory(category.name)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${
              selectedCategory === category.name ? "bg-brand text-white" : "border border-slate-200 bg-white text-slate-600"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map(p => <ProductCard key={p._id} product={p} />)}
      </div>

      {filteredProducts.length === 0 && (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600">
          Aucun produit dans cette categorie.
        </div>
      )}
    </div>
  );
}
