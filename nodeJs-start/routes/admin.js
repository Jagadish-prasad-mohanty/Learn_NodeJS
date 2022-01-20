const express=require('express');

const router=express.Router();
const path=require('path');
const rootDir= require('../util/path');

//get productControllers
const productControllers=require('../controllers/product');

//send request (add product)
router.get('/add-product',productControllers.getAddProduct);

// post add product for post data( the product data )
router.post('/add-product',productControllers.postAddProduct);

module.exports= router;