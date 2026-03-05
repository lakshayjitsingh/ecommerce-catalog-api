require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.get("/", (req,res)=>{
  res.send("E-commerce Catalog API Running");
});

app.get("/products", async (req,res)=>{
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req,res)=>{
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
  console.log("Server running");
});