import { services } from "@/lib/data";

export default function ServicesPage() {
  return (
    <section className="container-page py-10">
      <p className="text-sm font-bold uppercase text-brand">Services digitaux</p>
      <h1 className="mt-2 text-4xl font-black">Creation web, marketing et branding</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black">{service.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{service.text}</p>
            <button className="mt-5 rounded-full bg-ink px-5 py-2 font-bold text-white">Demander un devis</button>
          </article>
        ))}
      </div>
    </section>
  );
}
