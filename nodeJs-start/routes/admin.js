const express=require('express');
const fs=require('fs');
const router=express.Router();
const path=require('path');

router.get('/add-product',(req,res,next)=>{
    console.log("A middleware");
    res.sendFile(path.join(__dirname,'../','views','add-product.html'));
    
    // next();
})
router.post('/add-product',(req,res,next)=>{
    console.log(req.body);
    fs.writeFile('data.txt',req.body['title'],()=>{

        res.redirect('/');
    })
})

module.exports= router;