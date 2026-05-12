"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit2, FiPlus, FiSave, FiTrash2, FiX } from "react-icons/fi";
import { categories } from "@/lib/data";
import { api } from "@/lib/api";

const emptyForm = {
  title: "",
  brand: "",
  category: "Smartphones",
  price: "",
  stock: "",
  imageUrl: "",
  description: "",
  isPopular: false
};

function productToForm(product) {
  return {
    title: product.title || "",
    brand: product.brand || "",
    category: product.category || "Smartphones",
    price: product.price ?? "",
    stock: product.stock ?? "",
    imageUrl: product.images?.[0]?.url || product.images?.[0] || "",
    description: product.description || "",
    isPopular: Boolean(product.isPopular)
  };
}

function formToPayload(form) {
  return {
    title: form.title.trim(),
    brand: form.brand.trim(),
    category: form.category,
    price: Number(form.price),
    stock: Number(form.stock),
    description: form.description.trim(),
    isPopular: form.isPopular,
    images: form.imageUrl.trim() ? [{ url: form.imageUrl.trim() }] : []
  };
}

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const selectedProduct = useMemo(
    () => products.find((product) => product._id === editingId),
    [editingId, products]
  );

  useEffect(() => {
    const token = localStorage.getItem("gemini_token");
    if (!token) {
      router.replace("/login?redirect=/admin");
      return;
    }

    api.get("/auth/me")
      .then(({ data }) => {
        if (data.role !== "admin") {
          router.replace("/");
          return;
        }
        setIsAuthorized(true);
      })
      .catch(() => {
        localStorage.removeItem("gemini_token");
        router.replace("/login?redirect=/admin");
      });
  }, [router]);

  useEffect(() => {
    if (!isAuthorized) return;

    loadProducts();
  }, [isAuthorized]);

  async function loadProducts() {
    try {
      setIsLoading(true);
      const { data } = await api.get("/products");
      setProducts(data);
    } catch {
      setMessage("Impossible de charger les produits.");
    } finally {
      setIsLoading(false);
    }
  }

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function startEdit(product) {
    setEditingId(product._id);
    setForm(productToForm(product));
    setMessage("");
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const payload = formToPayload(form);
      if (editingId) {
        const { data } = await api.put(`/products/${editingId}`, payload);
        setProducts((current) => current.map((product) => product._id === editingId ? data : product));
        setMessage("Produit modifie avec succes.");
      } else {
        const { data } = await api.post("/products", payload);
        setProducts((current) => [data, ...current]);
        setMessage("Produit ajoute avec succes.");
      }
      resetForm();
    } catch (error) {
      setMessage(error.response?.data?.message || "Operation impossible. Verifiez les champs.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteProduct(product) {
    const confirmed = window.confirm(`Supprimer "${product.title}" ?`);
    if (!confirmed) return;

    try {
      await api.delete(`/products/${product._id}`);
      setProducts((current) => current.filter((item) => item._id !== product._id));
      if (editingId === product._id) resetForm();
      setMessage("Produit supprime.");
    } catch {
      setMessage("Suppression impossible.");
    }
  }

  if (!isAuthorized) {
    return <section className="container-page py-10 text-center text-slate-600">Verification de l'acces admin...</section>;
  }

  return (
    <section className="container-page py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-brand">Admin</p>
          <h1 className="mt-2 text-4xl font-black">Gestion produits</h1>
        </div>
        <button onClick={resetForm} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">
          <FiPlus />
          Nouveau produit
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <form onSubmit={handleSubmit} className="rounded-lg bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-black">{editingId ? "Modifier produit" : "Ajouter produit"}</h2>
            {editingId && (
              <button type="button" onClick={resetForm} className="rounded-full border border-slate-200 p-2 text-slate-600 hover:text-brand" aria-label="Annuler la modification">
                <FiX />
              </button>
            )}
          </div>

          {selectedProduct && <p className="mt-2 text-sm text-slate-500">Edition de {selectedProduct.title}</p>}

          <div className="mt-5 grid gap-3">
            <input value={form.title} onChange={(event) => updateField("title", event.target.value)} required placeholder="Nom du produit" className="focus-ring rounded-lg border border-slate-200 px-4 py-3" />
            <input value={form.brand} onChange={(event) => updateField("brand", event.target.value)} placeholder="Marque" className="focus-ring rounded-lg border border-slate-200 px-4 py-3" />
            <select value={form.category} onChange={(event) => updateField("category", event.target.value)} required className="focus-ring rounded-lg border border-slate-200 px-4 py-3">
              {categories.map((category) => <option key={category.name}>{category.name}</option>)}
            </select>
            <div className="grid gap-3 sm:grid-cols-2">
              <input value={form.price} onChange={(event) => updateField("price", event.target.value)} type="number" min="0" step="0.01" required placeholder="Prix TND" className="focus-ring rounded-lg border border-slate-200 px-4 py-3" />
              <input value={form.stock} onChange={(event) => updateField("stock", event.target.value)} type="number" min="0" step="1" required placeholder="Stock" className="focus-ring rounded-lg border border-slate-200 px-4 py-3" />
            </div>
            <input value={form.imageUrl} onChange={(event) => updateField("imageUrl", event.target.value)} type="url" placeholder="URL image" className="focus-ring rounded-lg border border-slate-200 px-4 py-3" />
            <textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} required rows={5} placeholder="Description" className="focus-ring rounded-lg border border-slate-200 px-4 py-3" />
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
              <input checked={form.isPopular} onChange={(event) => updateField("isPopular", event.target.checked)} type="checkbox" className="h-4 w-4 accent-blue-600" />
              Produit populaire
            </label>
          </div>

          <button disabled={isSaving} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
            <FiSave />
            {isSaving ? "Enregistrement..." : editingId ? "Enregistrer les modifications" : "Ajouter le produit"}
          </button>

          {message && <p className="mt-4 text-sm font-semibold text-slate-700">{message}</p>}
        </form>

        <div className="rounded-lg bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-black">Produits</h2>
            <span className="text-sm font-semibold text-slate-500">{products.length} produit(s)</span>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b text-xs uppercase text-slate-500">
                  <th className="py-3">Produit</th>
                  <th>Categorie</th>
                  <th>Prix</th>
                  <th>Stock</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">Chargement des produits...</td>
                  </tr>
                )}
                {!isLoading && products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">Aucun produit pour le moment.</td>
                  </tr>
                )}
                {!isLoading && products.map((product) => (
                  <tr key={product._id} className="border-b last:border-0">
                    <td className="py-4">
                      <strong className="block text-ink">{product.title}</strong>
                      <span className="text-slate-500">{product.brand || "Sans marque"}</span>
                    </td>
                    <td>{product.category}</td>
                    <td className="font-semibold">{product.price} TND</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => startEdit(product)} className="rounded-full border border-slate-200 p-2 text-slate-700 hover:text-brand" aria-label={`Modifier ${product.title}`}>
                          <FiEdit2 />
                        </button>
                        <button type="button" onClick={() => deleteProduct(product)} className="rounded-full border border-red-100 p-2 text-red-600 hover:bg-red-50" aria-label={`Supprimer ${product.title}`}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
