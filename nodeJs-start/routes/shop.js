const express= require('express');
const router=express.Router();
const path=require('path');
// const rootDir= require('../util/path');

//import adminData from admin.js
// const adminData=require('./admin');

// import product controller
const productControllers=require('../controllers/product');
router.get('/',productControllers.getProducts);

module.exports= router;