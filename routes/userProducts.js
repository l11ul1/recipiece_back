const mongoose = require("mongoose");

const UserProductsSchema = new mongoose.Schema({
    product_status: Boolean,
    product_count: Number,
    user_id: String,
    product_id: String,
})

module.exports = mongoose.model("UserProdModel", UserProductsSchema);


// const Product1 = Product({
//     product_name: "Banana", 
//     product_category: "Fruits", 
//     product_url_to_image: "https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bananas-218094b-scaled.jpg?quality=90&resize=960%2C872", 
//     product_one_piece_weight: 118
// })

// Product1.save().then(
// ()=>{
//     console.log("Success");
// }
// ).catch(
// (err)=>{
//     console.log(err);
// }
// )