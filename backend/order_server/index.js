import express from "express";
import order from "./routes/order.js";
var app = express();

app.use(express.json());

app.use("/api/order", order);

app.listen(3001, function () {
  console.log("Example app listening on port 3001!");
});
