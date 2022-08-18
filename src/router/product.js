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
//q1 count the tagSpecial which is true and max rating
router.get('/products/:productId',async(req,res)=>{
    try{
        const countTagSpe = await Product.aggregate([
            {
                $match: {
                   productId: {
                       $ne: req.params.productId
                    },
                    tagSpecial:{
                        $eq: true 
                        }
                   }
              },
              {
                $count: "countTagSpecial"
              }
        ]);
        const maxRating = await Product.aggregate([
            {
                $match: {
                   productId: {
                       $ne: req.params.productId
                    },
                    tagSpecial:{
                        $eq: true 
                        }
                   }
              },
              {
                $group: { _id: "$tagSpecial", totalQuantity: { $max: "$rating" } }
             }
        ]);

        
        res.status(200).send({countTagSpecial:countTagSpe[0].countTagSpecial,maxRating:maxRating[0].totalQuantity})
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
        const pro = await Product.findOne({productId});
        if(!pro)
        {
            throw new Error("productId not found");
        }
        //console.log(pro.tagging);
        const tagObj = pro.tagging;
        tagObj.push(newupdata);
        //console.log(tagObj);
        pro.tagging = tagObj;
        await pro.save();
        res.send(pro);
        //console.log(newupdata);
    }catch(err)
    {
        res.status(500).send(err.message)
    }
})

// q3 given a productId and tagging year, write a mongoDB query to remove tagging which is greater than the given year.
router.patch('/products_tag',async(req,res)=>{
    const productId = String(req.body.productId);
    const year= req.body.year;
    const pro = await Product.findOne({productId});
        if(!pro)
        {
            throw new Error("productId not found");
        }
        const tagObj = pro.tagging;
       
        const greater = tagObj.filter(item => item.year <= year );
         pro.tagging = greater;
         await pro.save();
        res.send(pro);
    
})

module.exports = router;