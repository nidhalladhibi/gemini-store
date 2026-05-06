export default function ProfilePage() {
  return (
    <section className="container-page py-10">
      <h1 className="text-4xl font-black">Profil utilisateur</h1>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm lg:col-span-1">
          <h2 className="font-black">Informations personnelles</h2>
          <p className="mt-4 text-slate-600">Connectez l'endpoint `/auth/me` pour afficher et modifier le profil.</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="font-black">Historique commandes</h2>
          <p className="mt-4 text-slate-600">Les commandes utilisateur seront chargees depuis `/orders/my-orders`.</p>
        </div>
      </div>
    </section>
  );
}
