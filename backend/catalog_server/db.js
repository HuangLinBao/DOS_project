import { Sequelize } from "sequelize";
import axios from "axios";

const sequelize = new Sequelize("libDB", "user", "pass", {
  dialect: "sqlite",
  host: "./database/books.sqlite",
});

export const logChange = (operation, data) => {
  console.log(
    `Change logged On master - Operation: ${operation}, Data: `,
    data
  );
  propagateChangesToReplicas([{ operation, data }]);
};

const propagateChangesToReplicas = (changes) => {
  const replicaUrls = [
    "http://localhost:6000/sync", // catalog replica 1
    "http://localhost:7000/sync", //catalog replica 2
  ];

  // Propagate changes to each replica
  return Promise.all(
    replicaUrls.map(async (replicaUrl) => {
      await axios.post(
        replicaUrl,
        { changes },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    })
  );
};

export default sequelize;
