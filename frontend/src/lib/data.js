export const categories = [
  { name: "Smartphones", detail: "Samsung, Apple, Xiaomi, Oppo, Huawei" },
  { name: "Laptops", detail: "HP, Dell, Lenovo, Asus, Acer" },
  { name: "PC Gamer", detail: "Setups, laptops gaming, desktops, RGB" },
  { name: "Accessoires", detail: "Casques, souris, claviers, chargeurs" }
];

export const services = [
  { title: "Creation Site Web", text: "Sites vitrines, e-commerce, portfolios et applications web rapides." },
  { title: "Marketing Digital", text: "Publicites Facebook et Instagram, SEO, campagnes et analytics." },
  { title: "Branding & Publicite", text: "Identite visuelle, contenus commerciaux et supports de lancement." }
];

export const demoProducts = [
  {
    _id: "p1",
    title: "iPhone 15 Pro 256GB",
    category: "Smartphones",
    price: 4599,
    stock: 8,
    rating: 4.9,
    description: "Smartphone premium avec camera pro, puce rapide et design titanium.",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80"]
  },
  {
    _id: "p2",
    title: "Asus ROG Strix G16",
    category: "PC Gamer",
    price: 5699,
    stock: 5,
    rating: 4.8,
    description: "Laptop gaming puissant avec ecran rapide, GPU dedie et refroidissement avance.",
    images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80"]
  },
  {
    _id: "p3",
    title: "Dell XPS 13 Plus",
    category: "Laptops",
    price: 3899,
    stock: 11,
    rating: 4.7,
    description: "Ultrabook compact pour productivite, design premium et autonomie solide.",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80"]
  },
  {
    _id: "p4",
    title: "Pack RGB Pro",
    category: "Accessoires",
    price: 349,
    stock: 30,
    rating: 4.6,
    description: "Clavier, souris et casque RGB pour setup gaming complet.",
    images: ["https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80"]
  }
];
