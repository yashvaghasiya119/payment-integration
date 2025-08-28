const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const { urlencoded } = require("body-parser");
const app = express();
const port = 3000;


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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
    