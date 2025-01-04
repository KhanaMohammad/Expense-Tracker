
const jwt = require("jsonwebtoken");

const isAuthentacated =async(req,res ,next)=>{
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
    
    
    const verfiToken = jwt.verify(token , "khan" , (err , decoded)=>{
        if(err)
            return false;
        else
             return  decoded;
    })

    if(verfiToken){
        req.user = verfiToken.id
        next()
    }else{
        const err = new Error("Token Expired : Login again")
        next() 
    }
}


module.exports =isAuthentacated;