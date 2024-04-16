import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect.js";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import path from "path";
import { fileURLToPath } from 'url';



// Configure environment variables from .env file in the current directory
dotenv.config();

// Database configuration
connectDB();

// esmodule
const __filename = fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

// Create an Express application instance
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'./client/build')));

// REST API route to serve index.html for client-side routing
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname,'/client/build/index.html'));
});

// Basic route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

// Routes
app.use("/api/v1/product/", productRoutes);
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/category/", categoryRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
