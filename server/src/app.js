const express = require("express");
const app = express();

app.use(express.json())

app.get("/", (req,res) => {
    res.json({status:"ok",uptime:process.uptime()});
});
app.use("/auth", require("./routes/auth.routes"));

module.exports = app;
