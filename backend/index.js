const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const cors = require("cors");
const { urlencoded } = require("body-parser");
const { carData } = require("./data");
const app = express();
const port = 3000;


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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
    