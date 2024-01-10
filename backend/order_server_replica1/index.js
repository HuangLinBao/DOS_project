import express from "express";
import order from "./routes/order.js";
import cors from "cors";
var app = express();
app.use(cors());
app.use(express.json());

app.use("/api/order", order);

app.listen(4001, function () {
  console.log("order replica 1 app listening on port 4001!");
});
