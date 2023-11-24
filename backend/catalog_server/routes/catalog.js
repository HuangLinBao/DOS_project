import express from "express";
import Books from "../books.js";
import { Sequelize, Op } from "sequelize";
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

catalog.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const books = await Books.findAll({
      where: Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("category")), {
        [Op.like]: `%${query.toLowerCase()}%`,
      }),
    });

    res.send(books);
  } catch (error) {
    console.error("Error searching for books:", error);
    res.status(500).send("Internal Server Error");
  }
});
export default catalog;
