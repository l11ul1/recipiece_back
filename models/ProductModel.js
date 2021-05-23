const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    product_name: String, 
    product_aisle: String, 
    product_url_to_image: String, 
    product_id: Number,
})

module.exports = mongoose.model("Product", ProductSchema);


// const ProductSchema = new mongoose.Schema({
//     product_name: String, 
//     product_category: String, 
//     product_url_to_image: String, 
//     product_one_piece_weight: Number,
// })