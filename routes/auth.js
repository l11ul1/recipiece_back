const express = require("express"); 
//const { model } = require("mongoose");
let router = require('express').Router();
const AuthController = require("../controllers/AuthController.js")

router.post("/registration", AuthController.register)
router.post("/login", AuthController.login)
router.post("/verify", AuthController.verifyConfirm)

module.exports = router;

