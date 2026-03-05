const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// Home route
app.get("/", (req,res)=>{
  res.send("E-commerce Catalog API Running");
});


// GET all products
app.get("/products", async (req,res)=>{
  try{
    const products = await Product.find();
    res.json(products);
  }
  catch(err){
    res.status(500).json({error: err.message});
  }
});


// POST new product
app.post("/products", async (req,res)=>{
  try{
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  }
  catch(err){
    res.status(500).json({error: err.message});
  }
});

app.listen(3000, ()=>{
  console.log("Server running on port 3000");
});