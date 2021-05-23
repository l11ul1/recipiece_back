let router = require('express').Router();
const ProductModel = require("../models/ProductModel")
const apiResponse = require("../helpers/apiResponse");
const productController = require("../controllers/ProductController")

router.get("/", (req,res)=> {
    ProductModel.find({}).exec().then(
        (msg) => {
            return apiResponse.successResponseWithData(res,"Products data retreived", msg);
        }
    ).catch(
        (err) => {
            apiResponse.ErrorResponse(res, err);
        }
    );
});

router.get("/:name", (req, res)=> {
    const name = req.params.name;
    ProductModel.find({product_name: name}).then(
        (result) => {
            if(result.length === 0){
                apiResponse.notFoundResponse(res, "No products with this name")
            }else{
                return apiResponse.successResponseWithData(res,"Found a product successfully", result);
            }
        }
    ).catch(
        (err) => {
            apiResponse.ErrorResponse(res, err);
        }
    )
});

router.delete("/delete/:name", (req, res)=> {
    const name = req.params.name;
    console.log(name);

    ProductModel.deleteOne({product_name: name}).then(
        (result) => {
            if(result.length === 0){
                apiResponse.notFoundResponse(res, "No products with this name")
            }else{
                return apiResponse.successResponseWithData(res,"Deleted successfully", result);
            }
        }
    ).catch(
        (err) => {
            apiResponse.ErrorResponse(res, err);
        }
    )
});

router.post("/add", productController.productAdd);

module.exports = router;