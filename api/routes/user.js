const { verify_token } = require("./verify_token");
const router = require("express").Router();
const User = require("../models/User.ts");
const Message = require("../models/Message.ts")
//Update
router.put("/:id", verify_token, async (req, res) => {
  try {
    const updated_user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //$set to add new data;
      },
      { new: true }
    );
    res.status(200).json(updated_user);
  } catch (error) {
    console.log(error);
  }
});
// Delete

// router.delete("/:id", verify_token, async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json("user delete successfuly");
//   } catch (error) {
//     console.log(error);
//   }
// });
router.delete("/", async (req, res) => {
  try {
    const { ids } = req.body;

    if (Array.isArray(ids) && ids.length > 0) {
      const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));

      if (ids.length === 1) {
        // Single item delete
        const result = await User.deleteOne({ _id: objectIds[0] });

        if (result.deletedCount === 1) {
          res.status(200).send("Item deleted successfully");
        } else {
          res.status(404).send("Item not found");
        }
      } else {
        const result = await User.deleteMany({ _id: { $in: objectIds } });

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

// Get one user

router.get("/search/:id", verify_token, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    console.log(error);
  }
});

// Get all user

router.get("/", verify_token, async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

// Get stats number of user per month

// router.get("/stats", verify_token, async (req,res) =>{
//     const date = new Date();
//     const last_year = new Date(date.setFullYear(date.getFullYear() - 1));

//     try {

//     } catch (error) {
//         console.log(error);
//     }
// })


router.post("/message", async (req, res) =>{
  const new_message = new Message({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  })

  try {
    const saved_message = await new_message.save();
    res.status(201).json(saved_message);
  } catch (error) {
    console.log(error);
    
  }
});
router.get("/message", async (req, res) =>{
  try {
      const message = await Message.find();
      res.status(200).json(message);
  } catch (error) {
    console.log(error);
    
  }
})

module.exports = router;
