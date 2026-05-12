"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const { data } = await api.post("/auth/login", Object.fromEntries(form));
      localStorage.setItem("gemini_token", data.token);
      setMessage("Connexion reussie.");
      const redirectTo = new URLSearchParams(window.location.search).get("redirect");
      const safeRedirect = redirectTo?.startsWith("/") ? redirectTo : null;
      router.replace(safeRedirect || (data.user?.role === "admin" ? "/admin" : "/"));
    } catch {
      setMessage("Connexion impossible. Verifiez vos identifiants.");
    }
  }

  return (
    <section className="container-page grid min-h-[620px] place-items-center py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black">Login</h1>
        <input name="email" type="email" required placeholder="Email" className="focus-ring mt-6 w-full rounded-lg border border-slate-200 px-4 py-3" />
        <input name="password" type="password" required placeholder="Mot de passe" className="focus-ring mt-3 w-full rounded-lg border border-slate-200 px-4 py-3" />
        <button className="mt-6 w-full rounded-full bg-brand px-6 py-3 font-bold text-white">Se connecter</button>
        <p className="mt-4 text-sm text-slate-600">Pas de compte ? <Link href="/register" className="font-bold text-brand">Register</Link></p>
        {message && <p className="mt-4 text-sm font-semibold text-slate-700">{message}</p>}
      </form>
    </section>
  );
}
