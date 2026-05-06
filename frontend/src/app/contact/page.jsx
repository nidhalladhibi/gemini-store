export default function ContactPage() {
  return (
    <section className="container-page py-10">
      <h1 className="text-4xl font-black">Contact</h1>
      <form className="mt-8 grid max-w-2xl gap-4 rounded-lg bg-white p-6 shadow-sm">
        <input placeholder="Nom" className="focus-ring rounded-lg border border-slate-200 px-4 py-3" />
        <input placeholder="Email" className="focus-ring rounded-lg border border-slate-200 px-4 py-3" />
        <textarea placeholder="Message" rows="5" className="focus-ring rounded-lg border border-slate-200 px-4 py-3" />
        <button className="w-fit rounded-full bg-brand px-6 py-3 font-bold text-white">Envoyer</button>
      </form>
    </section>
  );
}
