import express from "express";
import order from "./routes/order.js";
import cors from "cors";
var app = express();
app.use(cors());
app.use(express.json());

app.use("/api/order", order);

app.listen(5001, function () {
  console.log("order replica 2 app listening on port 5001!");
});
