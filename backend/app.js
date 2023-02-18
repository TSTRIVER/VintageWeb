const express = require("express");
const app = express();
const products = require("./routes/productRoute");
const router = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");

const middleware = require("./middleware/error");

app.use(bodyparser.urlencoded({extended: true}));
app.use(fileupload());

app.use(
    express.urlencoded({ extended: true })
);

app.use(express.json());
app.use(cookieParser());

app.use(middleware);
app.use("/api/v1",products);
app.use("/api/v1",router);
app.use("/api/v1",order);

module.exports = app;