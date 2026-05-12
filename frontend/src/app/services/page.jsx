"use client";

import { useState, useEffect } from "react";
import { 
  FiCode, FiTrendingUp, FiAward, FiBriefcase, 
  FiShoppingCart, FiSmartphone, FiGlobe, FiMail,
  FiArrowRight, FiCheckCircle
} from "react-icons/fi";
import Link from "next/link";

const iconMap = {
  "Site vitrine": FiCode,
  "E-commerce": FiShoppingCart,
  "Publicité Facebook & Instagram": FiTrendingUp,
  "Branding complet": FiAward,
  "Creation Site Web": FiCode,
  "Marketing Digital": FiTrendingUp,
  "Branding & Publicite": FiAward
};

const defaultIcon = FiBriefcase;

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`)
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur chargement services:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-brand border-t-transparent"></div>
          <p className="text-slate-600">Chargement des services...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-ink to-slate-900 py-20 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container-page relative z-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-400">
            Notre expertise
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Des solutions digitales sur mesure
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Nous vous accompagnons de la stratégie à la réalisation : sites web, applications, marketing et identité visuelle.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-blue-700"
            >
              Demander un devis
              <FiArrowRight />
            </Link>
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-bold transition hover:bg-white/10"
            >
              Voir les produits
            </Link>
          </div>
        </div>
      </section>

      {/* Grid des services */}
      <section className="container-page py-16">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase text-brand">Ce que nous faisons</p>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">
            Services <span className="text-brand">digitaux</span> haut de gamme
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Des prestations adaptées à vos objectifs, avec un accompagnement personnalisé de A à Z.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.title] || defaultIcon;
            return (
              <article
                key={service._id || index}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Icône avec dégradé */}
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-brand/20 to-blue-600/20 p-3 text-brand">
                  <Icon className="text-3xl" />
                </div>

                {/* Titre */}
                <h3 className="text-2xl font-black text-slate-800">{service.title}</h3>

                {/* Description */}
                <p className="mt-2 leading-relaxed text-slate-600">{service.description}</p>

                {/* Prix (optionnel, si vous avez priceFrom) */}
                {service.priceFrom && (
                  <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-brand">
                    <FiCheckCircle />
                    <span>À partir de {service.priceFrom} TND</span>
                  </div>
                )}

                {/* Bouton devis */}
                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white py-2 font-semibold text-slate-700 transition group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  Demander un devis
                  <FiArrowRight className="text-sm" />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section avantages */}
      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black">Pourquoi <span className="text-brand">nous choisir</span> ?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Des avantages compétitifs pour garantir votre satisfaction.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Expertise technique", desc: "Équipe expérimentée avec les dernières technologies.", icon: FiCode },
              { title: "Accompagnement personnalisé", desc: "Suivi dédié et conseils stratégiques.", icon: FiBriefcase },
              { title: "Résultats mesurables", desc: "Performance et ROI garantis.", icon: FiTrendingUp }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="mb-3 rounded-full bg-white p-3 shadow-md">
                    <Icon className="text-3xl text-brand" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Appel à l'action final */}
      <section className="py-16">
        <div className="container-page rounded-2xl bg-gradient-to-r from-brand to-blue-600 p-8 text-center text-white md:p-12">
          <h2 className="text-3xl font-black">Prêt à lancer votre projet ?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Contactez-nous dès maintenant pour un devis gratuit et personnalisé.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 font-bold text-brand transition hover:bg-slate-100"
            >
              Nous écrire
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-white/30 px-6 py-3 font-bold transition hover:bg-white/10"
            >
              Découvrir la boutique
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}