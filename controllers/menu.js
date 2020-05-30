const MenuItem = require("../models/menu")



  

  exports.createMenuItem = 
  (req, res) =>
    {
   
    const menuItem = new MenuItem(req.body);
   
    menuItem.save((err, menuItem) => 
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
           
          });
        }
        }

       
      res.json({ menuItem });
    });
  };
  


  exports.getMenuItemById = (req, res, next, id) => {
    MenuItem.findById(id).exec((err, foundMenuItem) => {
      if (err) {
        return res.status(400).json({
          error: "Category not found in DB"
        });
      }
      req.menuItem = foundMenuItem;
      next();
    });
  };
  
  
  exports.getMenuItem = (req, res) => {
    return res.json(req.menuItem);
  };
  
  exports.getAllMenuItems =
   (req, res) => 
  {
    MenuItem.find().exec((err, menuItems) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }
      res.json(menuItems);
    });
  };
  
  exports.updateMenuItem = (req, res) => {
    
    const menuItem = req.menuItem;
   
    menuItem.name = req.body.name;
  
    menuItem.save((err, updatedMenuItem) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update category"
        });
      }
      res.json(updatedMenuItem);
    });
  };
  


  exports.removeMenuItem = (req, res) => {
   
   
    const menuItem = req.menuItem;
  
    menuItem.remove((err, menuItem) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this category"
        });
      }
      res.json({
        message: "Successfull deleted"
      });
    });
  };