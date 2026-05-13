import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Service from "../models/Service.js";
import User from "../models/User.js";

const products = [
  {
    title: "iPhone 16 Pro 256GB",
    description: "Smartphone premium avec caméra pro, puce rapide et design titanium.",
    price: 3280,
    category: "Smartphones",
    brand: "Apple",
    stock: 8,
    isPopular: true,
    images: [{ url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Samsung Galaxy S24 Ultra",
    description: "Écran AMOLED, stylet intégré, zoom puissant et performances haut niveau.",
    price: 4299,
    category: "Smartphones",
    brand: "Samsung",
    stock: 10,
    isPopular: true,
    images: [{ url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Dell XPS 13 Plus",
    description: "Ultrabook compact pour productivité, design premium et autonomie solide.",
    price: 3899,
    category: "Laptops",
    brand: "Dell",
    stock: 11,
    images: [{ url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "ASUS ROG Strix G16",
    description: "Laptop gaming puissant avec écran rapide, GPU dédié et refroidissement avancé.",
    price: 5699,
    category: "Gaming",
    brand: "Asus",
    stock: 5,
    isPopular: true,
    images: [{ url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "Pack RGB Pro",
    description: "Clavier, souris et casque RGB pour setup gaming complet.",
    price: 349,
    category: "Accessoires",
    brand: "Gemini",
    stock: 30,
    images: [{ url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80" }]
  }
];

const services = [
  { title: "Site vitrine", category: "web", description: "Création d'un site moderne, rapide et responsive.", priceFrom: 900 },
  { title: "E-commerce", category: "web", description: "Boutique en ligne avec catalogue, panier et commandes.", priceFrom: 1800 },
  { title: "Publicité Facebook & Instagram", category: "marketing", description: "Campagnes ciblées, créatives et suivi des performances.", priceFrom: 450 },
  { title: "Branding complet", category: "branding", description: "Logo, charte, supports publicitaires et direction visuelle.", priceFrom: 700 }
];

async function seed() {
  try {
    await connectDB();
    
    // Nettoyage des collections
    await Promise.all([
      Order.deleteMany(),
      Product.deleteMany(),
      Service.deleteMany(),
      User.deleteMany()
    ]);
    
    console.log('✅ Collections vidées');
    
    // Création de l'admin
    const admin = await User.create({ 
      name: "Gemini Admin", 
      email: "admin@geministore.tn", 
      password: "Admin12345!", 
      role: "admin" 
    });
    
    console.log('✅ Admin créé');
    
    // Insertion des produits
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ ${createdProducts.length} produits ajoutés`);
    
    // Insertion des services
    const createdServices = await Service.insertMany(services);
    console.log(`✅ ${createdServices.length} services ajoutés`);
    
    console.log("🎉 Gemini Store seed completed successfully");
    
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Déconnecté de MongoDB');
  }
}

// Exécution du script
seed().catch((error) => {
  console.error('❌ Échec du seeding:', error);
  process.exit(1);
});
