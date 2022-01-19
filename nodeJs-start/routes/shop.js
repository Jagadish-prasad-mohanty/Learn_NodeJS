const express= require('express');
const router=express.Router();
const path=require('path');
const rootDir= require('../util/path');

//import adminData from admin.js
const adminData=require('./admin');

router.get('/',(req,res,next)=>{
    console.log("Another middleware");
    console.log("[shop.js]",adminData.products);
    //normal send file
    // res.sendFile(path.join(rootDir,'views','shop.html'));

    // send file with pug
    res.render('shop',{prods:adminData.products,title:'Shop',isShopPage:true,isAddProductPage:false});
})

module.exports= router;