const express = require("express");
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({extended: false}))
const cors = require("cors");
app.use(cors())

const authRoute = require("./routes/auth.js").router;
const productRoute = require("./routes/products.js").router;
const ordersRoute = require("./routes/orders.js").router;

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB).then(()=>{
    app.listen(5002, () => {
        console.log("Connected to mongoDB")
        console.log("server connected at 5002");
      });
})
.catch((err)=>{
    console.log(err)
})

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", ordersRoute)
