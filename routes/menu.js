const express = require('express')

const router = express.Router();

const {getMenuItemById, createMenuItem, getMenuItem , getAllMenuItems,
       updateMenuItem, removeMenuItem } = require("../controllers/menu");

router.param("menuItemId", getMenuItemById);

//create a new menu item
router.post( "/menu/create",  createMenuItem );

//get a specific menu item by id
router.get("/menu/:menuItemId", getMenuItem);

//get all menu items
router.get("/menuItems", getAllMenuItems);

//update a specific menu item
router.put("/menu/:menuItemId", updateMenuItem );

//delete a menu item
router.delete("/menu/:menuItemId",removeMenuItem );


module.exports = router;