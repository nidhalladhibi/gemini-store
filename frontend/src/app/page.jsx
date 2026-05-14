"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiCpu, FiMonitor, FiSmartphone, FiTrendingUp } from "react-icons/fi";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "@/components/ProductCard";
import { categories, services } from "@/lib/data";

const iconMap = {
  Smartphones: FiSmartphone,
  Laptops: FiMonitor,
  Gaming: FiCpu,
  Accessoires: FiTrendingUp
};

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL non défini");
      setLoading(false);
      return;
    }
    fetch(`${apiUrl}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur chargement produits:", err);
        setLoading(false);
      });
  }, []);

  const sliderProducts = products.slice(0, 3);
  const popularProducts = products.filter(p => p.isPopular).slice(0, 4);
  const getProductImage = (product) => product.images?.[0]?.url || product.images?.[0] || "/placeholder.png";

  if (loading) {
    return <div className="container-page py-20 text-center">Chargement des produits...</div>;
  }

  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-page grid min-h-[560px] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cyan">Tech, gaming et digital services</p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Gemini Store</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Votre boutique premium pour smartphones, laptops, PC Gamer, accessoires et solutions digitales qui vendent.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-white hover:bg-blue-700">Voir la boutique <FiArrowRight /></Link>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-bold text-white hover:bg-white/10">Nos services</Link>
            </div>
          </div>
          <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3500 }} pagination={{ clickable: true }} className="w-full overflow-hidden rounded-lg" loop>
            {sliderProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-slate-900">
                  <img
                    src={getProductImage(product)}
                    alt={product.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-75"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-6">
                    <p className="text-sm font-semibold text-cyan">{product.category}</p>
                    <h2 className="mt-2 text-2xl font-black">{product.title}</h2>
                    <p className="mt-2 text-slate-200">{product.price} TND</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase text-brand">Categories</p>
            <h2 className="mt-2 text-3xl font-black">Explorer Gemini Store</h2>
          </div>
          <Link href="/shop" className="hidden font-bold text-brand md:inline">Tout voir</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {categories.map((category) => {
            const Icon = iconMap[category.name] || FiCpu;
            return (
              <Link href={`/shop?category=${encodeURIComponent(category.name)}`} key={category.name} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:shadow-soft">
                <Icon className="text-3xl text-brand" />
                <h3 className="mt-4 font-black">{category.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{category.detail}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-page py-6">
        <div className="mb-7">
          <p className="text-sm font-bold uppercase text-brand">Populaire</p>
          <h2 className="mt-2 text-3xl font-black">Produits populaires</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black">{service.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
       
      </section>
    </>
  );
}
