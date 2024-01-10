import axios from "axios";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("libDB", "user", "pass", {
  dialect: "sqlite",
  host: "./database/books.sqlite",
});
export const logChange = (operation, data) => {
  console.log(
    `Change logged On Replica 2. Propogating to Leader... - Operation: ${operation}, Data: `,
    data
  );
  propagateChangesToLeader([{ operation, data }]);
};
const propagateChangesToLeader = (changes) => {
  const replicaUrls = [
    "http://localhost:3000/sync", // catalog replica 1
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
