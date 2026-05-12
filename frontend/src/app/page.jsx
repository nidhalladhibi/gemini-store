"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/products")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("✅ المنتجات:", data);
        setProducts(data);
      })
      .catch(err => {
        console.error("❌ فشل الجلب:", err);
        setError(err.message);
      });
  }, []);

  if (error) return <div className="p-10 text-center text-red-500">خطأ: {error}</div>;
  if (products.length === 0) return <div className="p-10 text-center">جاري التحميل...</div>;

  return (
    <div className="container-page py-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map(product => <ProductCard key={product._id} product={product} />)}
      </div>
    </div>
  );
}