const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_name: String, 
    email: String, 
    password_hash: String, 
    registration_date: Date,
    confirm_otp: Number,
    isConfirmed: Number,
})

module.exports = mongoose.model("User", UserSchema);