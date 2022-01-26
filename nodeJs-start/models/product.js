const products = [];
const fs = require("fs");
const rtPath = require("../util/path");
const path = require("path");
const filePath = path.join(rtPath, "data", "products.json"); //location of you file
const cartFilePath = path.join(rtPath, "data", "cart.json"); //location of you file
const getProductHelperFunction = (callback) => {
  fs.readFile(filePath, (err, fileContent) => {
    let products = [];
    console.log("product.js -> err3 : ", err);
    if (!err) {
      // if no Error you can push fileContent
      products.push(...JSON.parse(fileContent));
    }
    callback(products);
  });
  console.log("product.js ->products : ", products);
};
//product class to manage data
module.exports = class Product {
  constructor(title, price, imgUrl, description) {
    this.title = title;
    this.price = price;
    this.imgUrl = imgUrl;
    this.description = description;
  }
  save() {
    
    getProductHelperFunction((products) => {
      this.id=Math.random().toString();

      products.push(this); // this = object to push
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        // just make you object to string
        // and you are good to go
        console.log("product.js -> err2 : ", err);
      });
    });
  }
  static fetchProducts(callback) {
    getProductHelperFunction(callback);
  }

  static fetchProductById (productId,callback) {
    getProductHelperFunction((products)=>{
      const product=products.find(item=>item.id===productId);
      callback(product);
    })
  }
  static productAddToCart (productId){
    const cart=[];
    getProductHelperFunction(products=>{
      const product= products.find(item=>item.id===productId);
      

      fs.readFile(cartFilePath,(err,fileContent)=>{
        if (!err){
          cart.push(...JSON.parse(fileContent));
        }
        const inCart= cart.findIndex(item=>item.id===productId);
        if (inCart ===-1){

          cart.push(product);
        }
        fs.writeFile(cartFilePath,JSON.stringify(cart),(err)=>{
          console.log(err);
        })
        
      })
    })
    
  }
  static fetchCart (callback){
    const cart=[];
    
      fs.readFile(cartFilePath,(err,fileContent)=>{
        if (!err){
          cart.push(...JSON.parse(fileContent));
        }
        callback(cart);
        
      })
   
    
  }
};
