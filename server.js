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

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'./client/build')));

//rest api
app.use('*',(req,res)=>{
res.sendFile(path.join(__dirname,'/client/build/index.html'));
})
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
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
