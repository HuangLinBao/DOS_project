import express from "express";
import axios from "axios";
const order = express.Router();

order.post("/books/purchase", (req, res) => {
  try {
    const uuid = req.body.uuid;
    const quantity = req.body.quantity;
    // Get current stock
    axios
      .get(`http://localhost:4000/api/catalog/search/${uuid}`)
      .then((response) => {
        const currentStock = response.data.stock;
        // Calculate new stock
        const newStock = currentStock - quantity;
        console.log(newStock);
        // Make the second request only if newStock is a valid value
        if (Number.isFinite(newStock)) {
          // Update stock
          axios
            .put("http://localhost:4000/api/update/updateStock", {
              uuid: uuid,
              newStock: newStock,
            })
            .then((updateResponse) => {
              console.log("Update Response:", updateResponse.data);
              res.send("Stock updated successfully");
            });
        } else {
          res.status(500).send("Invalid newStock value");
        }
      });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

export default order;
