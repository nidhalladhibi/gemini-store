"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function RegisterPage() {
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const { data } = await api.post("/auth/register", Object.fromEntries(form));
      localStorage.setItem("gemini_token", data.token);
      setMessage("Compte cree avec succes.");
    } catch {
      setMessage("Creation impossible pour le moment.");
    }
  }

  return (
    <section className="container-page grid min-h-[620px] place-items-center py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black">Register</h1>
        <input name="name" required placeholder="Nom" className="focus-ring mt-6 w-full rounded-lg border border-slate-200 px-4 py-3" />
        <input name="email" type="email" required placeholder="Email" className="focus-ring mt-3 w-full rounded-lg border border-slate-200 px-4 py-3" />
        <input name="password" type="password" required placeholder="Mot de passe" className="focus-ring mt-3 w-full rounded-lg border border-slate-200 px-4 py-3" />
        <button className="mt-6 w-full rounded-full bg-brand px-6 py-3 font-bold text-white">Creer le compte</button>
        {message && <p className="mt-4 text-sm font-semibold text-slate-700">{message}</p>}
      </form>
    </section>
  );
}
