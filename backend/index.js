const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const cors = require("cors");
const { urlencoded } = require("body-parser");
const { carData } = require("./data");
const Stripe = require('stripe');
const app = express();
const port = 3000;
require("dotenv").config();


const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],  
    allowedHeaders: ["Content-Type", "Authorization"],  
    credentials: true,  
};

app.use(cors(corsOptions));  // Apply CORS settings to all routes

app.use(express.json());
app.use(urlencoded({extended:true}))

async function connectToMongo() {
    try {
        await mongoose.connect("mongodb://localhost:27017/stripe");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToMongo();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/users",userRoute);
app.get("/car",(req,res)=>{
    return res.json(carData)
})

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
app.post('/create-checkout-session', async (req, res) => {
  const {price,name} = req.body;
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card','amazon_pay'],
        line_items: [{
          price_data: {
            currency: 'USD',
            product_data: {
              name: name,
            },
            unit_amount: price*100, 
          },
          quantity: 1,
        }],
        mode: 'payment',
        // success_url: 'http://localhost:5173/stripe/success',
        success_url: 'http://localhost:5173/stripe/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:5173/stripe/cancel',
      });
  
      res.json({ id: session.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  


 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
    