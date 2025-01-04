
const express = require("express");
const transactionController = require("../controllers/transactionCtr");
const isAuthentacated = require("../middlewares/isAuth");
const transactionRouter = express.Router();



//! Add
transactionRouter.post("/api/transaction/add" ,isAuthentacated,transactionController.create );
//! Show List 
transactionRouter.get("/api/transaction/lists" ,isAuthentacated,transactionController.getFilteredTransactions );
//! Update 
transactionRouter.put("/api/transaction/update/:id" ,isAuthentacated,transactionController.update );

//! Delete
transactionRouter.delete("/api/transaction/delete/:id" ,isAuthentacated,transactionController.delete );



module.exports = transactionRouter;