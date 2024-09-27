const router = require("express").Router();
const Product = require("../models/Produts.ts");
const mongoose = require("mongoose");
const {objectID} = require("mongodb")
const multer = require("multer");
const path = require("path")
//CREATE
const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null, "public/db_images")
  },
    filename: (req,file, cb) =>{
      cb(null, file.fieldname + "_" + Date.now() +"_" + file.originalname)
    }
  

});
const upload = multer({
  storage: storage
})

router.post("/register",upload.single("img"),  async (req, res) => {
  const new_product = new Product({
    product_name: req.body.product_name,
    descri: req.body.descri,
    img: req.body.img,
    categories: req.body.categories,
    price: req.body.price,
    // img: req.file.filename,
   
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
// router.get("/", async (req, res) => {
//   const id = req.query.id;
//   const categories = req.query.category

  
//   if (id) {
//     const objectID = new mongoose.Types.ObjectId(id);
//     try {
//       const product = await Product.findById(objectID);
//       product
//         ? res.status(200).json(product)
//         : res.status(404).send("no product matching your search 😥");
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     try {
//       const product = await Product.find();
//       res.status(200).json(product);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// });

// original
router.get("/", async (req, res) => {
  const id = req.query.id;
  const qnew= req.query.new
  const qcategory = req.query.categories;
  const qprice = req.query.price;
  const qname =  req.query.q;
  if (!id && !qnew && !qcategory && !qprice && !qname) {
    try {
      const product = await Product.find();
      return res.status(200).json(product);
      
    } catch (error) {
      console.log(error);
    }
  
  };
  if (qname && qprice && qcategory) {

    const is_array = Array.isArray(qcategory) ? qcategory : qcategory.split(",");
    const p = qprice.split(",").map(Number);
  
    try {
      const  product = await Product.find({
        product_name : qname,
        categories : {$in:is_array},
         price : {$gte:p[0], $lte: p[1]}
       });

       if (product.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      return res.status(200).json(product);
     
      
    } catch (error) {
      console.log(error);
    }
    
    
  }
  if (qname && qcategory) {

    const is_array = Array.isArray(qcategory) ? qcategory : qcategory.split(",");
    try {
      const  product = await Product.find({
        product_name : qname,
        categories : {$in:is_array},
       });

   
     if (product.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      return res.status(200).json(product);
      
    } catch (error) {
    
      console.log(error);
    }
    
    
  }
  

 
  // if (qname) {
  //   try {
  //     // Use findOne to return a single product by its name
  //     const product = await Product.findOne({
  //       product_name: qname
  //     });
  
  //     if (!product) {
  //       return res.status(404).json({ message: 'Product not found' });
  //     }
  
  //     return res.status(200).json(product);
      
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ message: 'Server error' });
  //   }
  // }
  if (qname) {
    try {
      // Use a regex to search for partial matches and ignore case sensitivity
      const product = await Product.find({
        product_name: { $regex: new RegExp(qname, "i") } // "i" makes it case-insensitive
      });
  
      if (product.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      return res.status(200).json(product);
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
  
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
  };

  if (qnew) {
    let product;
    try {
       product = await Product.find().sort({ _id: -1}).limit(5);
       return res.status(200).json(product);
      
    } catch (error) {
      console.log(error);
    }
    
  }

 
  
   if(qcategory){
    
    const {categories} = req.query;

    const is_array = Array.isArray(categories) ? categories : categories.split(",");
    try {
        product = await Product.find({
          categories : {$in:is_array }
        });
        return res.status(200).json(product);
      // }
    
     
     
   } catch (error) {
     console.log(error);
   }
  } 

if (qprice) {
    const price = qprice.split(",").map(Number);
    try {
     const  product = await Product.find({
        price : {$gte:price[0], $lte: price[1]}
      });
    return res.status(200).json(product);
    
     
   } catch (error) {
     console.log(error);
   }
    
  }


});



// router.get("/", async (req, res) => {
//   const id = req.query.id;
//   const qnew = req.query.new;
//   const qcategory = req.query.categories;
//   const qprice = req.query.price;

//   // If no filters are provided, return all products
//   if (!id && !qnew && !qcategory && !qprice) {
//     try {
//       const product = await Product.find();
//       return res.status(200).json(product);
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ error: "Something went wrong" });
//     }
//   }

//   // If an id is provided, return the product by ID
//   if (id) {
//     const objectID = new mongoose.Types.ObjectId(id);
//     try {
//       const product = await Product.findById(objectID);
//       return product
//         ? res.status(200).json(product)
//         : res.status(404).send("No product matching your search 😥");
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ error: "Something went wrong" });
//     }
//   }

//   // If qnew is provided, return the latest product
//   if (qnew) {
//     try {
//       const product = await Product.find().sort({ createdAt: -1 }).limit(1);
//       return res.status(200).json(product);
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ error: "Something went wrong" });
//     }
//   }

//   // Handle the case when both qcategory and qprice are provided
//   if (qcategory && qprice) {
//     const { categories, price } = req.query;
//     const p = price.split(",").map(Number);
//     const is_array = Array.isArray(categories) ? categories : categories.split(",");

//     // Check that both price values are valid
//     if (p.length === 2 && !isNaN(p[0]) && !isNaN(p[1])) {
//       try {
//         const product = await Product.find({
//           categories: { $in: is_array },
//           price: { $gte: p[0], $lte: p[1] }
//         });
//         return res.status(200).json(product);
//       } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: "Something went wrong" });
//       }
//     } else {
//       return res.status(400).json({ error: "Invalid price range" });
//     }
//   }

//   // Handle the case when only qcategory is provided
//   if (qcategory) {
//     const { categories } = req.query;
//     const is_array = Array.isArray(categories) ? categories : categories.split(",");
//     try {
//       const product = await Product.find({
//         categories: { $in: is_array }
//       });
//       return res.status(200).json(product);
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ error: "Something went wrong" });
//     }
//   }

//   // Handle the case when only qprice is provided
//   if (qprice) {
//     const price = qprice.split(",").map(Number);
//     if (price.length === 2 && !isNaN(price[0]) && !isNaN(price[1])) {
//       try {
//         const product = await Product.find({
//           price: { $gte: price[0], $lte: price[1] }
//         });
//         return res.status(200).json(product);
//       } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: "Something went wrong" });
//       }
//     } else {
//       return res.status(400).json({ error: "Invalid price range" });
//     }
//   }
// });




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

router.get("/search")

module.exports = router;

// if(qprice && qcategory){
//   const {categories,price} = req.query;
//   const p = price.split(",").map(Number);
//   const is_array = Array.isArray(categories) ? categories : categories.split(",");

//   try {
//     const  product = await Product.find({
//        categories : {$in:is_array },
//        price : {$gte:p[0], $lte: p[1]}
       
//      });
//     res.status(200).json(product);
//     return;
    
//   } catch (error) {
//     console.log(error);
//   }
   

// }