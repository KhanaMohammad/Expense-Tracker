
const asynchHandler = require('express-async-handler');
const User = require('../modle/User');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userController = {
    register: asynchHandler(async(req, res)=>{
        const {username , email , password} = req.body;
        
        if(!username || !email || !password){
           throw new Error("Please fill all filds.")
        }

        const existUser = await User.findOne({username,email});
        if(existUser){
           throw new Error("user already exist")
        }

        //! Hash Password
        const salt =await bcrypt.genSalt(10);
        const hashPassword =await bcrypt.hash(password,salt)

        const userCreated =await User.create({
            username , 
            email,
            password:hashPassword,
        })
        res.json({
            username,
            email,
            id :  userCreated._id
        })
    }) ,


    //! Login 

    login: asynchHandler(async(req,res)=>{
        const {email, password} = req.body;

        const user = await User.findOne({email});
      
        if(!user){
            throw new Error("Invalid logein !")
        }

        const isMatch =  await bcrypt.compare(password , user.password);
        if(!isMatch){
            throw new Error("Invalid login")
        }

        const token = jwt.sign({id : user._id},"khan", {
            expiresIn : "30d"
        })

        res.json({
            message : "Loge in successfull!",
            token,
          user:  user.username,
           email:  user.email,
           password:  user.password,
          _id:  user._id,
        })
    }),


    //! Profile
    profile : asynchHandler(async(req , res)=>{
        const userId = req.user;
        const foundUser = await User.findById(userId);

        if(!foundUser){
            throw new Error("Not User found!")
        }
        
        res.json({
            username : foundUser.username,
            email : foundUser.email
        })
    }),

    //! Change Password
    changePassword : asynchHandler(async(req , res)=>{
      const {newPassword}= req.body;
        const foundUser = await User.findById(req.user);

        if(!foundUser){
            throw new Error("Not User found!")
        }

        //! Hash Password
        const salt =await bcrypt.genSalt(10);
        const hashPassword =await bcrypt.hash(newPassword,salt)

        foundUser.password = hashPassword;
       
        await foundUser.save({
            validateBeforeSave:false,
        });

        res.json({
            message : "Password successfully Changed!"
        })
    }),

   
    //! Update Profile
    updateProfile : asynchHandler(async(req , res)=>{
      const {username , email}= req.body;

        const upadatedUser = await User.findByIdAndUpdate(req.user, {
            username , 
            email
        }, {
            new : true,
        });
        

        res.json({
            message : "Profile successfully Updated!", upadatedUser
        })
    }),


}


module.exports= userController;