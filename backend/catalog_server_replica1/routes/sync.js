import express from "express";
import Books from "../books.js";

const sync = express.Router();

const recordExists = async (uuid) => {
  try {
    // Check if the record exists in your local database using Sequelize's findOne
    const record = await Books.findOne({ where: { uuid } });

    // Return true if the record exists, false otherwise
    return !!record;
  } catch (error) {
    console.error("Error checking record existence:", error);
    throw error; // You may want to handle or log the error accordingly
  }
};

const getUpdatedValue = async (uuid) => {
  try {
    // Retrieve the updated record from the local database
    const updatedRecord = await Books.findOne({ where: { uuid } });

    // Return the updated value if the record exists, null otherwise
    return updatedRecord ? updatedRecord.toJSON() : null;
  } catch (error) {
    console.error("Error getting updated value:", error);
    throw error; // You may want to handle or log the error accordingly
  }
};

const applyChangesToLocalDatabase = async (changes) => {
  for (const { operation, data } of changes) {
    switch (operation) {
      case "INSERT":
        // Check if the record already exists in the local database
        const existsInsert = await recordExists(data.uuid);
        if (!existsInsert) {
          await Books.create(data);
        } else {
          console.log(
            `Record with UUID ${data.uuid} already exists. Skipping...`
          );
        }
        break;
      case "UPDATE":
        const record = await Books.findOne({
          where: { uuid: data.uuid },
          attributes: ["stock"], // Retrieve only the stock value
        });
        console.log(record);
        let hooks = true;
        // Check for updates and conditionally disable hooks:
        if (record && String(record.stock) === String(data.stock)) {
          console.log(
            "Record already has the updated stock value. Skipping update..."
          );
          hooks = false; // Disable hooks if no actual update is needed
        }
        try {
          await Books.update(data, {
            where: { id: data.id },
            individualHooks: hooks, // Dynamically set based on condition
          });
        } catch (error) {
          console.error("Error updating record:", error);
        }
        break;
      case "DELETE":
        // Check if the record exists before deleting
        const existsDelete = await recordExists(data.uuid);
        if (existsDelete) {
          await Books.destroy({
            where: { uuid: data.uuid },
          });
        } else {
          console.log(
            `Record with UUID ${data.uuid} does not exist. Skipping delete...`
          );
        }
        break;
      default:
        console.error("Unsupported operation:", operation);
    }

    // Check and log the updated value after each operation
    const updatedValue = await getUpdatedValue(data.uuid);
    console.log("Updated Value:", updatedValue);
  }
};

sync.post("/", async (req, res) => {
  const { changes } = req.body;

  try {
    // Apply changes to the local database
    await applyChangesToLocalDatabase(changes);

    res.status(200).json({ message: "Changes synchronized successfully" });
  } catch (error) {
    console.error("Error applying changes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default sync;
