let router = require('express').Router();
const User = require("../models/UserModel");

router.get("/", (req,res)=> {
    User.find({}).exec().then(
        (msg) => {
        res.send(msg);
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    );
});

router.get("/:email", (req, res)=> {
    const email = req.params.email;
    console.log(email);

    User.find({email: email}).then(
        (result) => {
            if(result.length === 0){
                res.status(404).send("No users with this email")
            }else{
                res.send(result);
            }
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )
});


router.delete("/delete/:email", (req, res)=> {
    const email = req.params.email;
    console.log(email);

    User.deleteOne({email: email}).then(
        (result) => {
            if(result.length === 0){
                res.status(404).send("Sorry item was not found :(")
            }else{
                res.send("Delete was completed successfully")
            }
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )
});


module.exports = router;