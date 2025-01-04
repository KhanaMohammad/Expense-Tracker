
const asynchHandler = require('express-async-handler');
const Catagory = require('../modle/Catagory');
const Transaction = require('../modle/Transaction');


const catagoryController = {
    
    //! Add catagory.
    create: asynchHandler(async(req, res)=>{
        const {name , type } = req.body;

        if(!name || !type){
            throw new Error("Name and Type are Required property.")
        }
        const normalizeName = name.toLowerCase()
        const validType = ["income","expense"]

        //! Valided the type
        if(!validType.includes(type.toLowerCase())){
            throw new Error("Invalid catagory type ", type)
        }

        //! Check the catagory exist or not
        const existCatagory = await Catagory.findOne({
            name : normalizeName,
            user : req.user
        })
        if(existCatagory){
            throw new Error(`Catagory ${existCatagory.name} already exist on database.`)
        }

        const catagory = await Catagory.create({
            name : normalizeName,
            user:req.user,
            type
        })
            res.status(201).json(catagory)
    }) ,


    //! Lists 
    Lists: asynchHandler(async(req,res)=>{
       const catagories = await Catagory.find({user: req.user});
       res.status(201).json(catagories)
    }),


    //! Update
    update : asynchHandler(async(req , res)=>{
       const catogoryId = req.params.id;
       const {type, name } = req.body;
        const normalizeName = name.toLowerCase();
       const catagory = await Catagory.findById(catogoryId);
         
       if(!catagory || catagory.user.toString() !== req.user.toString()){
            throw new Error("Catagory not found or User not Authorized!")
       }

       const oldName = catagory.name;
       catagory.name = name;
       catagory.type = type;
       const updateCatagory = await catagory.save();
       if(oldName !== updateCatagory.name){
            await Transaction.updateMany({
                user : req.user,
                catagory : oldName
            },{
                $set : {catagory : updateCatagory.name}
            })
       }
       res.status(201).json(updateCatagory);

    }),

    //! Delete
    delete: asynchHandler(async(req , res)=>{
        const catagory = await Catagory.findById(req.params.id);
        if(catagory && catagory.user.toString() === req.user.toString()){
            const defaultCatagory = "Uncatagorized";
             await Transaction.updateMany({
                user:req.user,
                catagory : catagory.name
            },{
                $set : {
                    catagory : defaultCatagory
                }
            })
             await Catagory.findByIdAndDelete(req.params.id);
             res.status(201).json("Catagory deleted and Transaction Updated!")
        }else{
            res.json("Catagory not found or user un authorized ")
        }
    }),



}


module.exports= catagoryController;