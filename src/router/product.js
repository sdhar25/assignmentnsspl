const express = require('express');
const router = new express.Router();
const Product = require('../models/product');



//adding products
router.post('/products',async(req,res)=>{
    const product = new Product(req.body);
    try{
        await product.save();
        res.send(product);
    }catch(err)
    {
        res.status(500).send({err})
    }
})
/*q1  given a productId and Write a single MongoDB query to find the count of tagSpecial and 
maximum value of rating, which have tagSpecial true and given productId is not included.*/

router.get('/products',async(req,res)=>{
    try{
        const reqData = await Product.aggregate([
            {
              $match:{productId:{$ne:String(req.body.productId)},tagSpecial:true}
            },
            {
                $group:{_id:"$tagSpecial",maxRating:{$max:"$rating"},
                countTagSpecial:{$sum:{
                            "$cond":[{$and:[{$ne:['productId',String(req.body.productId)]},{'tagSpecial':true}]},1,0]
                        }}
            }
            }  
          ])
        
          res.status(200).send(reqData);
        
        
    }catch(err)
    {
        console.log(err);
        res.status(500).send({err:'err.message'})
    }
})


//q2 you have given a productId, tagging year and tagId, write a mongoDB query to update tagging of  given productId.
router.patch('/products',async(req,res)=>{
    try{
        const productId = String(req.body.productId);
        const year= req.body.year;
        const tagId = req.body.tagId;
        
        const newupdata = {year,tagId};

        const pro = await Product.updateOne({productId:productId},{$push:{"tagging":newupdata}});
        if(pro.modifiedCount ==0)
        {
            throw new Error("Data not updted");
        }
        res.send({"sucess":1,"msg":"Data has been updated"});
       
    }catch(err)
    {
        res.status(500).send(err.message)
    }
})

// q3 given a productId and tagging year, write a mongoDB query to remove tagging which is greater than the given year.
router.patch('/products_tag',async(req,res)=>{
    try
    {
        const productId = String(req.body.productId);
        const year= req.body.year;
 
        //using mongoquery
        const pro = await Product.updateOne({productId:productId},{$pull:{"tagging":{"year":{$gt:year}}}});
        if(pro.modifiedCount ==0)
        {
            throw new Error("Data not updated");
        }
        res.send({"sucess":1,"msg":"Data has been updated"});
    }catch(err)
    {
        res.status(500).send(err.message)
    }
    
    
})

module.exports = router;