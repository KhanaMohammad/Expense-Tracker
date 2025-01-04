const express = require('express') ;
const mongoose = require("mongoose")
const cors = require('cors')
const userRouter = require('./routes/userRouter');
const errorHandler = require('./middlewares/errHandlerMiddleware');
const catagoryRouter = require('./routes/catagoryRouter');
const transactionRouter = require('./routes/transactionRouter');
const app = express();
const PORT = 5000;

//!Middleware
app.use(express.json());
const coreOption = {
    origin : ['http://localhost:5173']
}
app.use(cors(coreOption))
//! Routes
app.use("/" , userRouter)
app.use("/" , catagoryRouter)
app.use("/" , transactionRouter)
//! Error
app.use(errorHandler)


mongoose.connect("mongodb://localhost:27017/mern-expenses").then(()=>console.log("Db Connected")
).catch((e)=>console.log(e)
)



app.listen(process.env.PORT|| PORT , ()=>{
    console.log(`Server runnig on port ${PORT}`);
})

