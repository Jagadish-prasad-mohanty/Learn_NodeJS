const express= require('express');
const router=express.Router();
const path=require('path');
// const rootDir= require('../util/path');

//import adminData from admin.js
// const adminData=require('./admin');

// import product controller
const productControllers=require('../controllers/product');
router.get('/',productControllers.getProducts);
router.get('/cart',productControllers.getCartProducts);
router.get('/check-out',productControllers.getCheckOut);

module.exports= router;