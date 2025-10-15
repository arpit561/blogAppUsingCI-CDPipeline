const express= require("express");
const connectWithDb = require("./config/database");
const app= express();
const sum= require("./sum");
require("dotenv").config();
const blog= require("./routes/blog");

const PORT= process.env.PORT || 4000;


// middleware
app.use(express.json());

//  mounting
app.use("/api/v1", blog);
 
// default route
app.get("/", (req, res) => {
    res.send("Blog Application");
})

app.get("/getsum/:a/:b", (req, res) => {
    const {a, b}= req.params;
    res.send(`Ans: ${sum(parseInt(a), parseInt(b))}`);
})

// connectWithDb();

app.listen(PORT, () => {
    console.log(`App is running at port no ${PORT}`);
})