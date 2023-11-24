import express from "express";
import order from "./routes/order.js";
import cors from "cors";
var app = express();
app.use(cors());
app.use(express.json());

app.use("/api/order", order);

app.listen(3001, function () {
  console.log("Example app listening on port 3001!");
});
