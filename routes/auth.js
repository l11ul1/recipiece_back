const express = require("express"); 
//const { model } = require("mongoose");
let router = require('express').Router();
const AuthController = require("../controllers/AuthController.js")

router.post("/registration.html", AuthController.register)

module.exports = router;

// router.post("/registration", (req, res)=> 
// {
//     if(req.body.user_name === "" || 
//     req.body.password_hash === "" ||
//     req.body.email === "" || 
//     req.body.registration_date === "" ||
//     req.body.last_login === ""){
//         res.status(400).send("please check if all fields are filled up")
//     }else{
//         console.log(req.body.date);
//         const user = User(
//             {
//                 user_name: req.body.user_name, 
//                 password_hash: req.body.password_hash, 
//                 email: req.body.email, 
//                 registration_date: req.body.registration_date,
//                 last_login: req.body.last_login, 
//             })

//         user.save().then(
//             () => {
//                 console.log("Insert Was Successfull")
//                 res.status(200).send("Insert Was Successful")
//             }).catch(
//                 (err) => { 
//                     console.log(err)
//                 })
//     }
// });


