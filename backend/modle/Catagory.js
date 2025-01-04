const mongoose = require("mongoose");

const catagorySchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref :"User",
    },
    name:{
        type: String,
        required : true,
        default :"Uncatagorized ",
    },
    type:{
        type: String,
        required : true,
        enum : ["income" , "expense"]
    },

})

module.exports = mongoose.model("Catagory" , catagorySchema);  