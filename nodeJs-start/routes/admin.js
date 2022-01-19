const express=require('express');
const fs=require('fs');
const router=express.Router();
const path=require('path');
const rootDir= require('../util/path');


//product array
const products=[];

//send request (add product)
router.get('/add-product',(req,res,next)=>{
    console.log("A middleware");
    //notmal page render
    // res.sendFile(path.join(rootDir,'views','add-product.html'))

    //pug dynamic page render
    res.render('add-product',{title:'add-product',isAddProductPage:true,isShopPage:false});
    
    // next();
}) 

// post add product for post data( the product data )
router.post('/add-product',(req,res,next)=>{
    console.log("[admin.js]",req.body);
    products.push({'title':req.body.title,price:req.body.price});

    fs.writeFile('data.txt',req.body['title'],()=>{

        res.redirect('/');
    })
})

module.exports.router= router;
module.exports.products=products;