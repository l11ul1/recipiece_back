const User = require("../models/UserModel");
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const { constants } = require("../helpers/constants");
const mailer = require("../helpers/mailer");
const bcrypt = require("bcrypt");
const router = require("../routes/users");


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
				bcrypt.hash(req.body.password,10,function(err, hash) {
					// Create User object with escaped and trimmed data
					var registration_date = new Date().toISOString().slice(0,10);
					var user = new User(
						{
							user_name: req.body.user_name, 
							email: req.body.email, 
                            password_hash: hash, 
                            registration_date: registration_date,
						}
					);
					// Html email body
					let html = "<p>Please Confirm your Account.</p>";
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
