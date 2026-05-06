import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// Connexion à MongoDB
connectDB();

// Sécurité
app.use(helmet());

// CORS - corrigé pour utiliser CLIENT_URL du .env
app.use(cors({ 
  origin: CLIENT_URL, 
  credentials: true 
}));

// Body parsers
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan("dev"));

// Rate limiting
const limiter = rateLimit({ 
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300, // 300 requêtes par IP
  message: "Trop de requêtes, veuillez réessayer après 15 minutes"
});
app.use(limiter);

// Routes de santé
app.get("/api/health", (_req, res) => { 
  res.json({ 
    status: "ok", 
    service: "gemini-store-api",
    environment: process.env.NODE_ENV || "development"
  }); 
});

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payments", paymentRoutes);

// Middleware d'erreur
app.use(notFound);
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré avec succès !`);
  console.log(`📡 API: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Client autorisé: ${CLIENT_URL}`);
  console.log(`📦 Base de données: ${process.env.MONGO_URI ? "Connectée" : "Non configurée"}`);
});