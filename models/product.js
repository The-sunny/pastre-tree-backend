const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },

//menu item category
    menuItem : {
      type: ObjectId,
      ref: "MenuItem",
      required: true
    },

//   specials category
    special : {

        type: ObjectId,
        ref: "Special",
        required: false
    },

    stock: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    photo: {
      data: Buffer,
      contentType: String
    },
  
    productImagePath :{
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);