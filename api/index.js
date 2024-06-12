const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
//ROUTES
const auth_route = require("./routes/auth")
const user_route = require("./routes/user");
const product_route = require("./routes/products");
mongoose.connect("mongodb://localhost:27017/e_commerceDB").
then(() => {console.log("Db connection successful ");
}).catch((err) =>{
    console.log(err);
    
});

app.use("/api/auth", auth_route);
app.use("/api/user", user_route);
app.use("/api/product", product_route)

app.listen(1234, () =>{
    console.log("connected");

} )