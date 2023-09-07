const express = require('express');
const app = express();
const mongoose = require('mongoose');

const db = "mongodb+srv://Saumya:Aidenfalconess@cluster0.oiyq1qf.mongodb.net/Blog?retryWrites=true&w=majority";


mongoose.connect(db).then(() => {
    console.log("Connection to atlas successful");
}).catch((err) => {
    console.log(err);
});

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