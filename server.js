import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect.js";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import path from "path";

//configure env
dotenv.config();



//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());


// Serve static files from the build folder
app.use(express.static(path.join(process.cwd(), 'client', 'build')));

// Handle requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client', 'build', 'index.html'));
  
});

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});


//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//routes.
app.use("/api/v1/product/", productRoutes);
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/category/", categoryRoutes);


//Port
const PORT = process.env.PORT || 5000;


//run listen
connectDB().then(()=>{
  app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
})

