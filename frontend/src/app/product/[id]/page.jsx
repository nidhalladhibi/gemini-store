"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  FiHeart, FiShoppingCart, FiTruck, FiShield, 
  FiRefreshCw, FiStar
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/api";

export default function ProductDetailsPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Récupération du numéro WhatsApp depuis .env.local
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+21600000000";

  useEffect(() => {
    if (!params.id) return;
    setLoading(true);
    api.get(`/products/${params.id}`)
      .then(({ data }) => {
        setProduct(data);
        setSelectedImage(0);
        setLoading(false);
      })
      .catch(() => {
        setError("Produit introuvable.");
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-brand border-t-transparent"></div>
          <p className="text-slate-600">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="container-page py-10 text-center">
        <p className="text-red-600">{error}</p>
        <Link href="/shop" className="mt-4 inline-block text-brand hover:underline">
          ← Retour à la boutique
        </Link>
      </section>
    );
  }

  if (!product) return null;

  // Images : support du format API {url: string} ou string direct
  const allImages = product.images?.map(img => img?.url || img) || [];
  const mainImage = allImages[selectedImage] || "/placeholder.png";
  const hasMultipleImages = allImages.length > 1;

  const rating = product.rating || 4.5;
  const reviewCount = product.numReviews || 0;
  const specs = product.specifications || {};

  // Construction du lien WhatsApp
  const whatsappMessage = `Bonjour, je souhaite confirmer ma commande pour : ${product.title} - ${product.price} TND.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\s/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="bg-slate-50 py-8">
      <div className="container-page">
        {/* Fil d'Ariane */}
        <div className="mb-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-brand">Accueil</Link> / 
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-brand"> {product.category}</Link> / 
          <span className="text-slate-800 font-medium"> {product.title}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Galerie d'images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-md">
              <img
                src={mainImage}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
            {hasMultipleImages && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      idx === selectedImage ? "border-brand shadow-md" : "border-slate-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`${product.title} - vue ${idx + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Infos produit */}
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase text-brand">
                {product.brand || product.category}
              </span>
              {product.isPopular && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                  Populaire
                </span>
              )}
              {product.isOnSale && (
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                  Promotion
                </span>
              )}
            </div>

            <h1 className="text-3xl font-black leading-tight md:text-4xl">{product.title}</h1>

            {/* Évaluation étoilée */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={`${i < Math.floor(rating) ? "fill-amber-500" : "fill-slate-200"}`} />
                ))}
              </div>
              <span className="text-sm text-slate-600">
                {rating} ({reviewCount} avis)
              </span>
            </div>

            <p className="mt-5 text-lg leading-relaxed text-slate-600">{product.description}</p>

            {/* Prix et stock */}
            <div className="mt-6 flex items-baseline gap-4 border-y border-slate-100 py-4">
              <div>
                {product.originalPrice && product.originalPrice > product.price ? (
                  <>
                    <span className="text-3xl font-black text-brand">{product.price} TND</span>
                    <span className="ml-2 text-lg text-slate-400 line-through">{product.originalPrice} TND</span>
                  </>
                ) : (
                  <span className="text-3xl font-black text-brand">{product.price} TND</span>
                )}
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${
                product.stock > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
              }`}>
                {product.stock > 0 ? `Stock: ${product.stock}` : "Rupture"}
              </span>
            </div>

            {/* Boutons d'action */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white transition ${
                  product.stock > 0
                    ? "bg-brand hover:bg-blue-700"
                    : "bg-slate-400 cursor-not-allowed"
                }`}
              >
                <FiShoppingCart /> Ajouter au panier
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 font-bold text-slate-700 transition hover:border-brand hover:text-brand">
                <FiHeart /> Wishlist
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700"
              >
                <FaWhatsapp size={20} /> Confirmer par WhatsApp
              </a>
            </div>

            {/* Garanties */}
            <div className="mt-8 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 text-sm">
              <div className="flex items-center gap-2">
                <FiTruck className="text-brand" /> Livraison rapide
              </div>
              <div className="flex items-center gap-2">
                <FiShield className="text-brand" /> Garantie 1 an
              </div>
              <div className="flex items-center gap-2">
                <FiRefreshCw className="text-brand" /> Retour 14 jours
              </div>
              <div className="flex items-center gap-2">
                <FiHeart className="text-brand" /> Service client 7j/7
              </div>
            </div>
          </div>
        </div>

        {/* Section des spécifications techniques (si existantes) */}
        {Object.keys(specs).length > 0 && (
          <div className="mt-12 rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-2xl font-black">Spécifications techniques</h2>
            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="border-b border-slate-100 pb-2">
                  <dt className="text-sm font-semibold text-slate-500 capitalize">{key}</dt>
                  <dd className="text-slate-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Produits similaires (optionnel – tu peux ajouter une requête plus tard) */}
        <div className="mt-12 text-center">
          <Link href="/shop" className="inline-flex items-center gap-2 text-brand hover:underline">
            ← Voir tous les produits
          </Link>
        </div>
      </div>
    </section>
  );
}