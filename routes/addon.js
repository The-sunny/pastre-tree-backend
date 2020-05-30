const express = require("express");
const router = express.Router();
var multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname);
  }
});

var upload = multer({ storage: storage })

const {
  getAddonById,
  createAddon,
  getAllAddon,
  getAddon,
  photo,
  updateAddon,
  deleteAddon,
  getAllProducts,
  getAllUniqueCategories
} = require("../controllers/addon");


//all of params

router.param("addonId", getAddonById);

//all of actual routes
//create route
router.post(
  "/addon/create",
  upload.single('productImage'),
  createAddon
);

router.put(

  "/addon/:addonId", 
  upload.single('productImage'),
  updateAddon
  );

router.get(
    "/addon",
    getAllAddon
  );

// // read routes
router.get("/addon/:addonId", getAddon);


// //delete route
router.delete(
  "/addon/:addonId",
  deleteAddon
);



module.exports = router;