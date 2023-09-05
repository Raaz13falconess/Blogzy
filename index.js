const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/BMS");

const isBlog = require("./middlewares/isBlog")

app.use(isBlog.isBlog)

const adminRoute = require("./routes/adminRoutes")
app.use('/', adminRoute)

const userRoute = require("./routes/userRoute")
app.use('/', userRoute.user_route)

const blogRoute = require("./routes/blogRoute")
app.use('/', blogRoute.blog_route)

app.listen(3000, function(req, res)  {
    console.log("Server is running on 3000");
});