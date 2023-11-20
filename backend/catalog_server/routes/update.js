import express from "express";
import Books from "../books.js";
const update = express.Router();

update.put("/updateStock/", async (req, res) => {
  const stock = req.body.newStock;
  const uuid = req.body.uuid;
  const books = await Books.update({ stock: stock }, { where: { uuid: uuid } });
  res.send(books);
});

export default update;
