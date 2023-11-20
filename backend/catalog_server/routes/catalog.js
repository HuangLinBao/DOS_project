import express from "express";
import Books from "../books.js";
const catalog = express.Router();

catalog.get("/books", async (req, res) => {
  const books = await Books.findAll();
  res.send(books);
});
catalog.get("/search/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const book = await Books.findOne({ where: { uuid: uuid } });
  res.send(book);
});

catalog.get("/search/:name", async (req, res) => {
  const name = req.params.name;
  const book = await Books.findOne({ where: { title: name } });
  res.send(book);
});
export default catalog;
