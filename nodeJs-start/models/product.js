const products = [];
const fs = require("fs");
const rtPath = require("../util/path");
const path = require("path");
const filePath = path.join(rtPath, "data", "products.json"); //location of you file
const cartFilePath = path.join(rtPath, "data", "cart.json"); //location of you file
const getProductHelperFunction = (callback) => {
  fs.readFile(filePath, (err, fileContent) => {
    let products = [];
    console.log("product.js[models] -> err3 : ", err);
    if (!err) {
      // if no Error you can push fileContent
      products.push(...JSON.parse(fileContent));
    }

    callback(products);
  });
  console.log("product.js[models] ->products : ", products);
};
//product class to manage data
module.exports = class Product {
  constructor(title, price, imgUrl, description,id) {
    this.title = title;
    this.price = price;
    this.imgUrl = imgUrl;
    this.description = description;
    this.id=id;
  }
  save() {
    
    getProductHelperFunction((products) => {
      console.log("product -save -> this",this);
      if(!this.id){

        this.id=Math.random().toString();
  
        products.push(this); // this = object to push
        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          // just make you object to string
          // and you are good to go
          console.log("product.js -> err2 : ", err);
        });
      }else{
        const productIndex=products.findIndex(item=>item.id===this.id);
        if(productIndex){
          const updatedProducts=[...products]
          updatedProducts[productIndex]=this;
          fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
            // just make you object to string
            // and you are good to go
            console.log("product.js -> err2 : ", err);
          });
        }
      }
      
    });
  }
  static remove(productId){
    getProductHelperFunction(products=>{
      const updatedProducts=products.filter(item=>item.id!==productId);
      let priceOfRemoveProductFromCart=+products.find(item=>item.id===productId).price;
      fs.writeFile(filePath,JSON.stringify(updatedProducts),err=>{
        console.log("model ->product.js -> 64 :",err);
        if (!err){
          this.fetchCart(cart=>{
            let countOfRemoveProductFromCart;
           
            const updatedCart={...cart};
            updatedCart.cart= cart.cart.filter(item=>{
              countOfRemoveProductFromCart=+item.count
              return item.id!==productId
            });
            
            updatedCart.totalPrice-=priceOfRemoveProductFromCart*countOfRemoveProductFromCart;

            fs.writeFile(cartFilePath,JSON.stringify(updatedCart),err=>{
              console.log("models ->product.js -> err -> 79 :",err);
            })
          })
        }
      })
    })
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

  //cart
  static productAddToCart (productId,productPrice){
    let cart={
      cart:[],
      totalPrice:0
    };
      
      fs.readFile(cartFilePath,(err,fileContent)=>{
        if (!err){
          cart=JSON.parse(fileContent);
          console.log("product.js[models] -> cartContent",cart);
          
        }
        
        
        const product= cart.cart.find(item=>item.id===productId);
        let updatedProduct;
        if (!product){

          updatedProduct={
            id:productId,
            count:1
          }; 
          cart.cart=[...cart.cart,updatedProduct]
        }
        else{
          updatedProduct={...product,count:product.count+1};
          const prodIndex=cart.cart.findIndex(item=>item.id===updatedProduct.id);
          cart.cart[prodIndex]=updatedProduct;
        }
        cart.totalPrice+=+productPrice;
        console.log("product.js[models] -> cart",cart);
        fs.writeFile(cartFilePath,JSON.stringify(cart),(err)=>{
          console.log(err);
        })
        
      })
  
    
  }
  static deleteCartProduct (productId){
    let cart={
      cart:[],
      totalPrice:0
    }
    fs.readFile(cartFilePath,(err,fileContent)=>{
      if (!err){
        cart=JSON.parse(fileContent);
      }
      let updatedPrice=cart.totalPrice;
      let priceOfProductToDelete=0;
      let countOfProductToDelete=0;
      cart.cart.forEach(item=>{
        if (item.id===productId){
          countOfProductToDelete=+item.count;
        }
      })
      this.fetchProductById(productId,product=>{
        console.log("product -> 154 : ",product);
         priceOfProductToDelete=product.price;
         updatedPrice-=priceOfProductToDelete*countOfProductToDelete;
         const updatedCart=cart.cart.filter(item=>item.id!==productId);
         cart={
           ...cart,
           cart:updatedCart,
           totalPrice:updatedPrice
         }
   
         fs.writeFile(cartFilePath,JSON.stringify(cart),err=>{
           console.log("models -> product.js -> err -> 165 : ",err);
         })
      })
      // console.log("updatedPrice 157 : ",updatedPrice,priceOfProductToDelete,countOfProductToDelete);
      
    });
  }
  static fetchCart (callback){
    let cart={};
    
      fs.readFile(cartFilePath,(err,fileContent)=>{
        if (!err && fileContent){
          cart=JSON.parse(fileContent)
        }
        else{
          cart={
            cart:[],
            totalPrice:0
          };
        }
        callback(cart);
        
      })  
  }
};
