
const express = require("express");
const userController = require("../controllers/userCtr");
const isAuthentacated = require("../middlewares/isAuth");
const userRouter = express.Router();

//! Register
userRouter.post("/api/user/register" , userController.register);

//! Legin
userRouter.post("/api/user/login" , userController.login);

//! Profile
userRouter.get("/api/user/profile" ,isAuthentacated, userController.profile);

//! Change Password
userRouter.put("/api/user/change-password" ,isAuthentacated, userController.changePassword);

//! Update Profile
userRouter.put("/api/user/update-profile" ,isAuthentacated, userController.updateProfile);

module.exports = userRouter