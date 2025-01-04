const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref :"User",
    },
    category:{
        type: String,
        required : true,
        default :"Uncatagorized ",
    },
    type:{
        type: String,
        required : true,
        enum : ["income" , "expense"]
    },
    amount:{
        type: Number,
        required : true,
    },
    date:{
        type: Date,
        default :Date.now,
    },
    description:{
        type: String,
        required:false,
    },

})

module.exports = mongoose.model("Transaction" ,transactionSchema );  