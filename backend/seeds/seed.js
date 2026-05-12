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
    title: "iPhone 13 Pro Max 128GB",
    description: "Écran Super Retina XDR 6.7\", puce A15 Bionic, système de caméra pro avec mode cinématique, autonomie exceptionnelle.",
    price: 3299,
    originalPrice: 3899,
    category: "Smartphones",
    brand: "Apple",
    stock: 12,
    isPopular: true,
    isOnSale: true,
    specifications: {
      screen: "6.7″ Super Retina XDR",
      resolution: "2778 x 1284 pixels",
      processor: "A15 Bionic",
      storage: "128GB",
      camera: "12 MP triple caméra",
      battery: "4352 mAh",
      colors: ["Vert Alpine", "Or", "Argent", "Gris Sidéral", "Bleu"]
    },
    images: [{ url: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=900&q=80" }]
  },
  {
    title: "iPhone 13 Pro 256GB",
    description: "Écran Super Retina XDR 6.1\" avec ProMotion 120Hz, puce A15 Bionic, autonomie améliorée et design élégant.",
    price: 2899,
    originalPrice: 3499,
    category: "Smartphones",
    brand: "Apple",
    stock: 10,
    isPopular: true,
    isOnSale: true,
    specifications: {
      screen: "6.1″ Super Retina XDR",
      resolution: "2532 x 1170 pixels",
      processor: "A15 Bionic",
      storage: "256GB",
      camera: "12 MP triple caméra",
      battery: "3095 mAh",
      colors: ["Vert Alpin", "Or", "Argent", "Gris Sidéral", "Bleu"]
    },
    images: [{ url: "https://images.unsplash.com/photo-1638889963930-530e1e6c2e1b?auto=format&fit=crop&w=900&q=80" }]
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
    category: "PC Gamer",
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
  },
  {
    title: "Oppo A5X – Smartphone 4G (4+128Go) Bleu",
    description: "Smartphone 4G avec écran 6.67″ LCD IPS 90Hz, processeur Snapdragon, batterie 6000mAh avec charge rapide 45W, double SIM, capteur d'empreintes latéral et reconnaissance faciale. Résistant à l'eau et à la poussière (IP65).",
    price: 589,
    originalPrice: 599,
    category: "Smartphones",
    brand: "Oppo",
    stock: 15,
    isPopular: true,
    isOnSale: true,
    specifications: {
      screen: "6.67″ LCD IPS 90Hz",
      resolution: "1604 x 720 pixels",
      os: "ColorOS 15 basé sur Android 15",
      processor: "Octa Core Snapdragon 6s 4G Gen1",
      ram: "4Go",
      storage: "128Go",
      camera: "32 MP (arrière)",
      selfie: "5 MP",
      battery: "6000mAh",
      charging: "Charge rapide 45W",
      connectivity: "4G Double SIM, WiFi, GPS, Bluetooth 5.0, USB Type-C",
      security: "Capteur d'empreintes latéral + Reconnaissance faciale",
      protection: "IP65 (Splash Touch + Résistant à la poussière et à l'eau)"
    },
    images: [{ 
      url: "https://wiki.tn/wp-content/uploads/2025/10/Oppo-A5X-bleu-768x768.webp" 
    }]
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
    
    console.log('✅ Admin créé avec succès!');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Mot de passe: Admin12345!');
    console.log('👑 Rôle:', admin.role);
    
    // Insertion des produits
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ ${createdProducts.length} produits ajoutés`);
    
    // Afficher les produits ajoutés
    console.log('\n📦 Liste des produits ajoutés:');
    createdProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title} - ${product.price} TND`);
    });
    
    // Insertion des services
    const createdServices = await Service.insertMany(services);
    console.log(`\n✅ ${createdServices.length} services ajoutés`);
    
    // Afficher les services ajoutés
    console.log('\n🛠️ Services ajoutés:');
    createdServices.forEach((service, index) => {
      console.log(`${index + 1}. ${service.title} - À partir de ${service.priceFrom} TND`);
    });
    
    console.log("\n🎉 Gemini Store seed completed successfully!");
    console.log("=".repeat(50));
    console.log("Vous pouvez maintenant vous connecter avec:");
    console.log("Email: admin@geministore.tn");
    console.log("Mot de passe: Admin12345!");
    console.log("=".repeat(50));
    
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
