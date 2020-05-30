const Addon = require("../models/addon");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
var multer = require('multer')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

var upload = multer({ storage: storage })




exports.createAddon = 
(req, res) =>
 {
 
  const addon = new Addon(req.body);

  addon.productImagePath = req.file.path;
 
  addon.save((err, addon) => 
  {
    if (err) 
    {

      if(err.code === 11000 || err.code === 11001)
      {
        return res.status(400).json({
          error: "Duplicate Value " +req.body.name +",Value must be unique",
         
        });
      }
      else
      {
        return res.status(400).json({
          error: "NOT able to save category in DBs",
          messgae : err
         
        });
      }
      }

     
    res.json({ addon });
  });
};


exports.getAllAddon =
   (req, res) => 
  {
    Addon.find().exec((err, addon) => {
      if (err) {
        return res.status(400).json({
          error: "NO Addons found"
        });
      }
      res.json(addon);
    });
  };


exports.getAddonById = (req, res, next, id) => {
  Addon.findById(id)
    .populate("category")
    .exec((err, addon) => {
      if (err) {
        return res.status(400).json({
          error: "Addon not found"
        });
      }
      req.addon = addon;
      next();
    });
};


exports.getAddon = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.addon);
  };
// // delete controllers
exports.deleteAddon = (req, res) => {
  let addon = req.addon;
  addon.remove((err, deletedAddon) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product"
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedAddon
    });
  });
};

// // delete controllers



exports.updateAddon = (req, res) => {
  const addon = req.addon;
  addon.name = req.body.name;
  addon.price = req.body.price;
  addon.description = req.body.description;
//   addon.menuItem = req.body.menuItem;
  addon.stock = req.body.stock;
  
  addon.productImagePath = req.file.path;


  addon.save((err, updatedAddon) => {
    if(err){
      return res.status(400).json({
        error : "Failed to update Product"
      });
    }
    res.json({
      message : "Updation was successful",
      updatedAddon
    });
  });
};

