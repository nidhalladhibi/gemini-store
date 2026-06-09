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

// Connexion MongoDB
connectDB();

// Sécurité
app.use(helmet());

// ==================== CORS ====================
const allowedOrigins = [
  "http://localhost:3000",
  "https://gemini-store-frontend.vercel.app",
  "https://www.geministore.tn",
  "https://geministore.tn",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS non autorisé: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ==================== BODY PARSER ====================
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// ==================== LOGS ====================
app.use(morgan("dev"));

// ==================== RATE LIMIT ====================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  message: "Trop de requêtes, veuillez réessayer après 15 minutes",
});

app.use(limiter);

// ==================== HEALTH CHECK ====================
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "gemini-store-api",
    environment: process.env.NODE_ENV || "development",
  });
});

// ==================== ROUTES ====================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payments", paymentRoutes);

// ==================== ERRORS ====================
app.use(notFound);
app.use(errorHandler);

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🌐 Origins autorisés :`);
  allowedOrigins.forEach((origin) => console.log(`   - ${origin}`));
});