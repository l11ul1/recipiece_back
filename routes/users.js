let router = require('express').Router();
const User = require("../models/UserModel");
const apiResponse = require("../helpers/apiResponse");

router.get("/", (req,res)=> {
    User.find({}).exec().then(
        (msg) => {
            return apiResponse.successResponseWithData(res,"Users Data retreived", msg);
        }
    ).catch(
        (err) => {
            apiResponse.ErrorResponse(res, err);
        }
    );
});

router.get("/:email", (req, res)=> {
    const email = req.params.email;
    console.log(email);

    User.find({email: email}).then(
        (result) => {
            if(result.length === 0){
                apiResponse.notFoundResponse(res, "No users with this email")
            }else{
                return apiResponse.successResponseWithData(res,"Found a user successfully", result);
            }
        }
    ).catch(
        (err) => {
            apiResponse.ErrorResponse(res, err);
        }
    )
});

router.delete("/delete/:email", (req, res)=> {
    const email = req.params.email;
    console.log(email);

    User.deleteOne({email: email}).then(
        (result) => {
            if(result.length === 0){
                apiResponse.notFoundResponse(res, "No users with this email")
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


module.exports = router;