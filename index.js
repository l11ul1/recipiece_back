// Import all necessary variable for database connection
const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users")
const productRouter = require("./routes/products")
const mongoose = require("mongoose");
var bodyParser = require('body-parser');

const url = "mongodb+srv://admin:Gustavo2021@recipiecemvp.yegrh.mongodb.net/DBMain?retryWrites=true&w=majority";
const connectionOptions = { useNewUrlParser:  true, useUnifiedTopology: true };

mongoose.connect(url, connectionOptions).then(
    () => {
        console.log("Mongoose connected successfully");
    }).catch(
    (err) => {
        console.log(`Mongoose failed to connect with a ${err}`);
    }
)

const HTTP_PORT = process.env.PORT || 8080;
const onHttpStart = () => {
    console.log(`Server runs on ${HTTP_PORT}`);
}
app.listen(HTTP_PORT, onHttpStart);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/registration', function(request, response) {
	response.sendFile('/Users/alikhmens/GitHub/recipiece_back/testPages/registration.html');
});
app.get('/login', function(request, response) {
	response.sendFile('/Users/alikhmens/GitHub/recipiece_back/testPages/login.html');
});
app.get('/verify', function(request, response) {
	response.sendFile('/Users/alikhmens/GitHub/recipiece_back/testPages/verify.html');
});
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);

