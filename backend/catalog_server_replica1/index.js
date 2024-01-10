import express from "express";
import sequelize from "./db.js";
import Books from "./books.js";
import catalog from "./routes/catalog.js";
import update from "./routes/update.js";
import sync from "./routes/sync.js";
import cors from "cors";

var app = express();
app.use(cors());
app.use(express.json());
sequelize.sync().then(() => {
  console.log("db is ready");
});
app.post("/books", function (req, res) {
  Books.create(req.body).then(() => {
    res.send("success!");
  });
});
app.use("/api/catalog", catalog);
app.use("/api/update", update);
app.use("/api/sync", sync);

app.listen(6000, function () {
  console.log("catalog replica 1 listening on port 6000!");
});
