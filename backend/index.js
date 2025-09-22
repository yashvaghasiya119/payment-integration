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
  
  app.get('/invoice', async (req, res) => {
    try {
      const { session_id } = req.query;
      if (!session_id) {
        return res.status(400).json({ error: 'Missing session_id' });
      }

      const session = await stripe.checkout.sessions.retrieve(session_id);

      let normalized = null;

      // If a Stripe Invoice exists (subscriptions), return its details
      if (session.invoice) {
        const invoice = await stripe.invoices.retrieve(session.invoice);
        normalized = {
          type: 'invoice',
          id: invoice.id,
          amount: invoice.amount_paid ?? invoice.amount_due ?? 0,
          currency: invoice.currency?.toUpperCase(),
          status: invoice.status,
          created: invoice.created,
          customer_email: invoice.customer_email,
          hosted_invoice_url: invoice.hosted_invoice_url,
          number: invoice.number,
        };
      } else if (session.payment_intent) {
        // One-time payments via Checkout have no invoice; use PaymentIntent + Charge
        const paymentIntent = await stripe.paymentIntents.retrieve(
          typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent.id,
          { expand: ['charges.data.balance_transaction'] }
        );
        const charge = paymentIntent.charges?.data?.[0] || null;
        normalized = {
          type: 'payment_intent',
          id: paymentIntent.id,
          amount: paymentIntent.amount ?? 0,
          currency: paymentIntent.currency?.toUpperCase(),
          status: paymentIntent.status,
          created: paymentIntent.created,
          customer_email: paymentIntent.receipt_email || charge?.billing_details?.email || session.customer_details?.email || null,
          receipt_url: charge?.receipt_url || null,
          brand: charge?.payment_method_details?.card?.brand || null,
          last4: charge?.payment_method_details?.card?.last4 || null,
        };
      }

      // Fallback to session basics if neither invoice nor PI is present (should be rare)
      if (!normalized) {
        normalized = {
          type: 'session',
          id: session.id,
          amount: session.amount_total ?? 0,
          currency: session.currency?.toUpperCase(),
          status: session.status,
          created: session.created,
          customer_email: session.customer_details?.email || null,
        };
      }

      return res.json(normalized);
    } catch (error) {
      console.error('Error fetching invoice:', error);
      return res.status(500).json({ error: 'Failed to fetch invoice details' });
    }
  });

 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
    