import { Model, DataTypes } from "sequelize";
import sequelize, { logChange } from "./db.js";
class Books extends Model {}

Books.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.STRING,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    category: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "books",
  }
);

Books.beforeCreate((book, options) => {
  logChange("INSERT", book.toJSON());
});

Books.beforeUpdate((book, options) => {
  logChange("UPDATE", book.toJSON());
});

Books.beforeDestroy((book, options) => {
  logChange("DELETE", book.toJSON());
});
export default Books;
