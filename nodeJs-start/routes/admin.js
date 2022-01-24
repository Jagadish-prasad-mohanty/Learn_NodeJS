const express=require('express');

const router=express.Router();
const path=require('path');
const rootDir= require('../util/path');

//get productControllers
const adminControllers=require('../controllers/admin');

//send request (add product)
router.get('/add-product',adminControllers.getAddProduct);

// post add product for post data( the product data )
router.post('/add-product',adminControllers.postAddProduct);

router.get('/edit-product',adminControllers.getEditProduct);

//admin/products
router.get('/products',adminControllers.getProducts);

// router.get(/)

module.exports= router;