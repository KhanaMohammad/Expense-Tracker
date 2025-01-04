
const express = require("express");
const catagoryController = require("../controllers/catagoryCtr");
const isAuthentacated = require("../middlewares/isAuth");
const catagoryRouter = express.Router();



//! Add
catagoryRouter.post("/api/catagory/create" ,isAuthentacated,catagoryController.create );
//! Show List 
catagoryRouter.get("/api/catagory/lists" ,isAuthentacated,catagoryController.Lists );

//! Update
catagoryRouter.put("/api/catagory/update/:id" ,isAuthentacated,catagoryController.update );

//! Delete
catagoryRouter.delete("/api/catagory/delete/:id" ,isAuthentacated,catagoryController.delete );



module.exports = catagoryRouter