"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(res => res.json())
      .then(setProducts);
  }, []);
  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-black mb-6">Nos produits</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}