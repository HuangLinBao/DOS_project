import { Sequelize } from "sequelize";

const sequelize = new Sequelize("libDB", "user", "pass", {
  dialect: "sqlite",
  host: "./database/books.sqlite",
});
export default sequelize;
