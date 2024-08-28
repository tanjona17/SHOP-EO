const router = require("express").Router();
const Product = require("../models/Produts.ts");
const mongoose = require("mongoose");
const {objectID} = require("mongodb")
//CREATE
router.post("/register", async (req, res) => {
  const new_product = new Product({
    product_name: req.body.product_name,
    descri: req.body.descri,
    price: req.body.price,
    img: req.file.filename,
  });

  try {
    const saved_product = await new_product.save();
    res.status(200).json(saved_product);
  } catch (error) {
    console.log(error);
  }
});

// UPDATE
router.put("/", async (req, res) => {
  const id = req.query.id;
  const objectID = new mongoose.Types.ObjectId(id);
  try {
    const updated_procuts = await Product.findByIdAndUpdate(
      objectID,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updated_procuts);
  } catch (error) {
    console.log(error);
  }
});

// DELETE
// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;
//    const objectID = new mongoose.Types.ObjectId(id);
//   try {
//     await Product.findByIdAndDelete(objectID);
//     res.status(200).json("product delete successfuly");
//   } catch (error) {
//     console.log(error);
//   }
// });
// router.delete("/", async (req, res) => {
//   const {ids} = req.body;
//   //  const objectID = new mongoose.Types.ObjectId(ids);
//   try {
//     await Product.deleteMany({
//       _id: {$in: ids}
//     });
//     res.status(200).json("products delete successfuly");
//   } catch (error) {
//     console.log(error);
//   }
// });

// GET one product
// router.get("",  async (req, res) =>{
//     const id = req.query.id
//     const objectID = new mongoose.Types.ObjectId(id)
//     try {

//         const product = await Product.findById(objectID);
//         product ? res.status(200).json(product) : res.status(404).json("no product matching your search 😥")

//     } catch (error) {
//         console.log(error);
//     }

// });

// GET all product
router.get("/", async (req, res) => {
  const id = req.query.id;
  if (id) {
    const objectID = new mongoose.Types.ObjectId(id);
    try {
      const product = await Product.findById(objectID);
      product
        ? res.status(200).json(product)
        : res.status(404).send("no product matching your search 😥");
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const product = await Product.find();
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  }
});

router.delete("/", async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (Array.isArray(ids) && ids.length > 0) {
      const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));

      if (ids.length === 1) {
        // Single item delete
        const result = await Product.deleteOne({ _id: objectIds[0] });

        if (result.deletedCount === 1) {
          res.status(200).send("Item deleted successfully");
        } else {
          res.status(404).send("Item not found");
        }
      } else {
        const result = await Product.deleteMany({ _id: { $in: objectIds } });

        if (result.deletedCount > 0) {
          res
            .status(200)
            .send(`${result.deletedCount} items deleted successfully`);
        } else {
          res.status(404).send("No items found for deletion");
        }
      }
    } else {
      res.status(400).send("Invalid input");
    }
  } catch (error) {
    console.error("Error deleting items:", error);
    res.status(500).send("An error occurred while deleting items");
  }
});

module.exports = router;
