const express = require("express");
const app = express();
const port = 3000;
const getBusBoardArrivals = require("./getBusBoardArrivals.js");

app.use(express.static("frontend"));
app.get("/departureboards", (req, res) => {
  getBusBoardArrivals(res);
});

app.listen(port);
