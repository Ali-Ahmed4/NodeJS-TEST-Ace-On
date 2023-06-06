/* importing dependencies */
const express = require("express");
const app = express();
const env = require("dotenv").config();
app.use(express.json()); /* Parser */

/* importing DB connection */
const connection = require("./config/connection.js");
connection();

/* importing route */
const authRoute = require("./routes/authRoute.js");


app.use("/api/users",authRoute)



app.listen(process.env.PORT, () => {
	console.log("app is working");
});
