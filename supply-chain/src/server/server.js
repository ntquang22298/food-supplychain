var express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const checkJWT = require("./middlewares/check-jwt");
var app = express();

require("dotenv").config();

mongoose.connect(
    process.env.MONGODB_URI,
    { useUnifiedTopology: true, useNewUrlParser: true },
    error => {
        if (error) console.log(error);
    }
);
mongoose.set("useCreateIndex", true);

app.set("view engine", "ejs");
// security
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up cors to allow us to accept requests from our client
app.use(
    cors({
        origin: "*", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    })
);

const authRoutes = require("./routes/auth");
const farmerRoutes = require("./routes/farmer");
const productRoutes = require("./routes/product");
const seasonRoutes = require("./routes/season");
const actionRoutes = require("./routes/action");
const certificateRoutes = require("./routes/certificate");
const infoRoutes = require("./routes/info");
app.use("/auth", authRoutes);
app.use("/farmer", checkJWT, farmerRoutes);
app.use("/product", checkJWT, productRoutes);
app.use("/season", checkJWT, seasonRoutes);
app.use("/action", checkJWT, actionRoutes);
app.use("/certificate", checkJWT, certificateRoutes);
app.use("/info", infoRoutes);

app.listen(8080, () => {
    console.log("***********************************");
    console.log("API server listening at localhost:8080");
    console.log("***********************************");
});
module.exports = app;
