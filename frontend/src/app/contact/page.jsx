export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-20">
      <div className="container mx-auto px-4">
        {/* En-tête avec animation */}
        <div className="mb-12 text-center">
          <h1 className="animate-fade-in bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            Contactez-nous
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Une question ? Un projet ? Notre équipe est là pour vous répondre dans les meilleurs délais.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {/* Formulaire moderne */}
          <div className="group rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
            <form className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Nom complet
                </label>
                <input 
                  type="text" 
                  placeholder="Votre nom et prénom" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input 
                  type="email" 
                  placeholder="votre@email.com" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Téléphone (optionnel)
                </label>
                <input 
                  type="tel" 
                  placeholder="+216 XX XXX XXX" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Message
                </label>
                <textarea 
                  placeholder="Décrivez-nous votre projet ou votre question..." 
                  rows="5" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              
              <button 
                type="submit" 
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-brand to-brand-dark px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <span className="relative z-10">Envoyer le message</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-brand-dark to-brand transition-transform duration-300 group-hover:translate-x-0"></span>
              </button>
            </form>
          </div>

          {/* Informations de contact */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-brand/5 to-brand-dark/5 p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-2xl font-bold text-slate-800">Nos coordonnées</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700">Email</p>
                    <p className="text-slate-500">contact@geministore.tn</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700">Téléphone</p>
                    <p className="text-slate-500">+216 51 679 495</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700">Adresse</p>
                    <a
                      href="https://maps.app.goo.gl/ybaCZx62Cd3LTWcH8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-brand underline underline-offset-2 transition-colors duration-200"
                    >
                      solimen, Borj Cédria
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Horaires d'ouverture */}
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h4 className="mb-4 font-semibold text-slate-700">Horaires d'ouverture</h4>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span>08:00 - 23:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span>09:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span>10:00 - 20:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}