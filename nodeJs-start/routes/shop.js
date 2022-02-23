const express= require('express');
const router=express.Router();
const path=require('path');
// const rootDir= require('../util/path');

//import adminData from admin.js
// const adminData=require('./admin');

// import product controller
const shopControllers=require('../controllers/shop');
router.get('/',shopControllers.getIndex);
router.get('/products',shopControllers.getProducts);
router.get('/products/:productId',shopControllers.getProductDetails);
router.get('/cart',shopControllers.getCartProducts);
router.post('/cart',shopControllers.postCartProducts);
router.post('/delete-cart-product/:productId',shopControllers.postDeleteCartProduct);
router.get('/check-out',shopControllers.getCheckOut);
router.get('/order',shopControllers.getOrder);
router.post('/order',shopControllers.postOrder);

module.exports= router;