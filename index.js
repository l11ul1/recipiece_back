// Import all necessary variable for database connection
const mongoose = require("mongoose");
const express = require("express"); 
const url = "mongodb+srv://admin:Gustavo2021@recipiecemvp.yegrh.mongodb.net/DBMain?retryWrites=true&w=majority";
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const router = express.Router();


mongoose.connect(url, connectionOptions).then(
    () => {
        console.log("Mongoose connected successfully");
    }).catch(
    (err) => {
        console.log(`Mongoose failed to connect with a ${err}`);
    }
)

// Establish scheema
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    product_name: String, 
    product_category: String, 
    product_url_to_image: String, 
    product_one_piece_weight: Number,
})

const UserSchema = new Schema({
    user_name: String, 
    password_hash: String, 
    email: String, 
    registration_date: Date,
    last_login: Date,
})

const UserProductsSchema = new Schema({
    product_status: Boolean,
    product_count: Number,
    user_id: String,
    product_id: String,
})

const Product = mongoose.model("Products", ProductSchema);
const Product1 = Product({
        product_name: "Banana", 
        product_category: "Fruits", 
        product_url_to_image: "https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bananas-218094b-scaled.jpg?quality=90&resize=960%2C872", 
        product_one_piece_weight: 118
    })

Product1.save().then(
    ()=>{
        console.log("Success");
    }
).catch(
    (err)=>{
        console.log(err);
    }
)

const User = mongoose.model("User", UserSchema);
const User1 = User({
        user_name: "testUser", 
        password_hash: "test", 
        email: "test@test.com", 
        registration_date: 18/05/2021,
        last_login: 19/05/2021,
    })

User1.save().then(
    ()=>{
        console.log("Success");
    }
).catch(
    (err)=>{
        console.log(err);
    }
)

const UserProducts = mongoose.model("UserProducts", UserProductsSchema);

const UP1 = UserProducts({
    user_id: "60a527741e9abf24eb6dad63",
    product_id: "60a527741e9abf24eb6dad62",
    product_status: true,
    product_count: 3
})

UP1.save().then(
    ()=>{
        console.log("Success");
    }
).catch(
    (err)=>{
        console.log(err);
    }
)
