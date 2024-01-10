import express from "express";
import Books from "../books.js";
const sync = express.Router();

const applyChangesToLocalDatabase = async (changes) => {
  for (const { operation, data } of changes) {
    switch (operation) {
      case "INSERT":
        await Books.create(data);
        break;
      case "UPDATE":
        await Books.update(data, { where: { id: data.id } });
        break;
      case "DELETE":
        await Books.destroy({ where: { id: data.id } });
        break;
      default:
        console.error("Unsupported operation:", operation);
    }
  }
};

sync.post("/", async (req, res) => {
  const { changes } = req.body;
  console.log(changes);
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
