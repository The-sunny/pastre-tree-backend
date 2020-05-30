const express = require("express");
const router = express.Router();



const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus
} = require("../controllers/order");

//params
router.param("orderId", getOrderById);



//Actual routes


//create
router.post(
  "/order/create",

  createOrder
);

//update


router.put(
  "/order/:orderId",
 
  updateStatus
);



router.get("/orders", getAllOrders);

router.get("/order/:orderId", getOrderStatus);






module.exports = router;