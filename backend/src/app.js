import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from "./modules/auth/auth.routes.js";
import customerRoutes from "./modules/customers/customers.routes.js";


const app = express();

// =====================
// Middlewares
// =====================

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// =====================
// Static Folder
// =====================

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =====================
// Home Route
// =====================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ERP Backend API Running Successfully"
    });
});

// =====================
// API Routes
// =====================

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
// =====================
// 404 Handler
// =====================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// =====================
// Global Error Handler
// =====================

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

export default app;