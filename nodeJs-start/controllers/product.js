const fs=require('fs');

//product array
// const products=[];

//import product model class
const Product =require('../models/product');

exports.getAddProduct=(req,res,next)=>{
    console.log("A middleware");
    //notmal page render
    // res.sendFile(path.join(rootDir,'views','add-product.html'))

    //pug dynamic page render
    res.render('add-product',{title:'add-product',isAddProductPage:true,isShopPage:false});
    
    // next();
}

exports.postAddProduct=(req,res,next)=>{
    console.log("[admin.js]",req.body);
    //push object to product array
    // products.push({'title':req.body.title,price:req.body.price});
    const product=new Product(req.body.title,req.body.price);
    product.save();

    fs.writeFile('data.txt',req.body['title'],()=>{

        res.redirect('/');
    })
}

exports.getProducts=(req,res,next)=>{
    
    //normal send file
    // res.sendFile(path.join(rootDir,'views','shop.html'));

    //fetch all Products
    const products=Product.fetchProducts();
    // send file with pug
    res.render('shop',{prods:products,title:'Shop',isShopPage:true,isAddProductPage:false});
}

