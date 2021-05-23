const Product = require("../models/ProductModel");
const { body,validationResult } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");

exports.productAdd = [
	body("product_name", "Name must not be empty").isLength({ min: 1 }).trim(),
	body("product_url_to_image", "Image link has to be specified").isLength({ min: 1 }).trim(),
	body("product_id", "ISBN must not be empty").isLength({ min: 1 }).trim().custom((value,{req}) => {
		return Product.findOne({product_id: req.body.product_id}).then(product => {
			if (product) {
				return Promise.reject("Product already exist with this id");
			}
		});
	}),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var product = new Product(
				{ product_name: req.body.product_name,
					product_aisle: req.body.product_aisle,
                    product_url_to_image: req.body.product_url_to_image,
					product_id: req.body.product_id,
				});
			if (!errors.isEmpty()) {
                console.log("Validation error")
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				//Save product.
				product.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
                    console.log("Succesffully added");
					return apiResponse.successResponse(res,"Product added Successfully");
				});
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];