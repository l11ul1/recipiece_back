const User = require("../models/UserModel");
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const { constants } = require("../helpers/constants");
const mailer = require("../helpers/mailer");
const bcrypt = require("bcrypt");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");

 exports.register = [
	//Validate fields.
	body("user_name").isLength({ min: 1 }).trim().withMessage("Name must be specified")
		.isAlphanumeric().withMessage("Name contains non-alphanumeric characters."),
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address.").custom((value) => {
			return User.findOne({email : value}).then((user) => {
				if (user) {
					return Promise.reject("E-mail already in use");
				}
			});
		}),
	body("password").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	body('password_confirm').custom((value, { req }) => {
		if (value !== req.body.password) {
		  throw new Error('Password confirmation does not match password');
		}
		// Indicates the success of this synchronous custom validator
		return true;
	  }),
	sanitizeBody("user_name").escape(),
	sanitizeBody("email").escape(),
	sanitizeBody("password").escape(),
	sanitizeBody("password_confirm").escape(),
	// Process request after validation and sanitization.
	(req, res) => {
		try {
			// Extract the validation errors from a request.
			const errors = validationResult(req);
			
			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				//hash input password
				bcrypt.hash(req.body.password,12,function(err, hash) {
					let otp = utility.randomNumber(4);
					// Create User object with escaped and trimmed data
					var registration_date = new Date().toISOString().slice(0,10);
					var user = new User(
						{
							user_name: req.body.user_name, 
							email: req.body.email, 
                            password_hash: hash, 
                            registration_date: registration_date,
							confirm_otp: otp,
							isConfirmed: null
						}
					);
					// Html email body
					let html = "<p>Please Confirm your Account.</p><p>OTP: "+otp+"</p>";
					// Send confirmation email
					mailer.send(
						constants.confirmEmails.from, 
						req.body.email,
						"Confirm Account",
						html
					).then(function(){
						// Save user.
						user.save(function (err) {
							if (err) { return apiResponse.ErrorResponse(res, err); }
							let userData = {
								_id: user._id,
								user_name: user.user_name,
								email: user.email
							};
							return apiResponse.successResponseWithData(res,"Registration Success.", userData);
						});
					}).catch(err => {
						console.log(err);
						return apiResponse.ErrorResponse(res,err);
					}) ;
				});
			}
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	},
	];

exports.login = [
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	body("password").isLength({ min: 1 }).trim().withMessage("Password must be specified."),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				User.findOne({email : req.body.email}).then(user => {
					if (user) {
						//Compare given password with db's hash.
						bcrypt.compare(req.body.password, user.password_hash,function (err,same) {
							if(same){
								if(user.isConfirmed){
									return apiResponse.successResponse(res, "Login successful");
								}else{
									return apiResponse.unauthorizedResponse(res, "Account is not confirmed");
									}
							}else{
								return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
							}
						});
					}else{
						dummy_pass = "$2y$12$Tt87J56ZQqJ0B5Zuo.g8F.Uc8u2LdqYaA3zTqrGoL.vD2N.Of79fq"
						bcrypt.compare(req.body.password,dummy_pass,function (err,same) {});
						console.log("Wrong email")
						return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];

exports.verifyConfirm = [
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	body("otp").isLength({ min: 1 }).trim().withMessage("OTP must be specified."),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				console.log(req.body.otp);
				var query = {email : req.body.email};
				User.findOne(query).then(user => {
					if (user) {
						//Check already confirm or not.
						if(!user.isConfirmed){
							//Check account confirmation.
							if(user.confirm_otp == req.body.otp){
								//Update user as confirmed
								User.findOneAndUpdate(query, {
									isConfirmed: 1,
									confirmOTP: null 
								}).catch(err => {
									return apiResponse.ErrorResponse(res, err);
								});
								return apiResponse.successResponse(res,"Account confirmed success.");
							}else{
								return apiResponse.unauthorizedResponse(res, "Otp does not match");
							}
						}else{
							return apiResponse.unauthorizedResponse(res, "Account already confirmed.");
						}
					}else{
						return apiResponse.unauthorizedResponse(res, "Specified email not found.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];
		


	