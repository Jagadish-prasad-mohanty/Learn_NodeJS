const products = [];
const fs = require("fs");
const rtPath = require("../util/path");
const path = require("path");
const filePath = path.join(rtPath, "data", "products.json"); //location of you file
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
};
