
const asynchHandler = require('express-async-handler');
const Transaction = require('../modle/Transaction');



const transactionController = {
    
    //! Create Transactions.
    create: asynchHandler(async(req, res)=>{
        const { type, category , amount , description,date  } = req.body;
        if(!type || !category|| !amount ){
            throw new Error("Type, Category and Amount are required !")
        }
        
        const transaction = await Transaction.create({
            user : req.user,
            type,
            amount,
            category,
            date,
            description,

        })
            res.status(201).json(transaction)
    }) ,


    //! Lists Transaction
   
  //!lists
  getFilteredTransactions: asynchHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;
    let filters = { user: req.user };

    if (startDate) {
      filters.date = { ...filters.date, $gte: new Date(startDate) };
    }
    if (endDate) {
      filters.date = { ...filters.date, $lte: new Date(endDate) };
    }
    if (type) {
      filters.type = type;
    }
    if (category) {
      if (category === "All") {
        //!  No category filter needed when filtering for 'All'
      } else if (category === "Uncategorized") {
        //! Filter for transactions that are specifically categorized as 'Uncategorized'
        filters.category = "Uncategorized";
      } else {
        filters.category = category;
      }
    }
    const transactions = await Transaction.find(filters).sort({ date: -1 });
    res.json(transactions);
  }),

    //! Update Transaction
    update: asynchHandler(async(req,res)=>{
        
       const transactions = await Transaction.findById(req.params.id);
       
       if (transactions && transactions.user.toString() == req.user.toString()) {
            (transactions.type = req.body.transaction || transactions.type ),
            (transactions.catagory = req.body.catagory || transactions.catagory ),
            (transactions.amount = req.body.amount || transactions.amount ),
            (transactions.date = req.body.date || transactions.date ),
            (transactions.description = req.body.description || transactions.description )

            const updateTrnasaction = await transactions.save();
            res.status(201).json(updateTrnasaction)
       }

    }),

    //! Delete Transaction
    delete: asynchHandler(async(req,res)=>{
       const transactions = await Transaction.findById(req.params.id);
       if (transactions && transactions.user.toString() == req.user.toString()) {
           
            const deleteTrnasaction = await Transaction.findByIdAndDelete(req.params.id);
            res.status(201).json(deleteTrnasaction)
       }

    }),


}


module.exports=  transactionController;