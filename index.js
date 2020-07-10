const express = require("express");
const getBusBoardArrivals = require("./getBusBoardArrivals.js")
const app = express();
const port = 3000;

app.get("/departureboards", (req, res) => {
 getBusBoardArrivals(res);
});

app.listen(port);
