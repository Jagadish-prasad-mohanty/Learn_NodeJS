// #### Sql ####


// const fs = require("fs");
// const rtPath = require("../util/path");
// const path = require("path");
// const filePath = path.join(rtPath, "data", "products.json"); //location of you file
// const cartFilePath = path.join(rtPath, "data", "cart.json"); //location of you file
// const db=require('../util/database');

// //product class to manage data
// module.exports = class Product {
//   constructor(title, price, imgUrl, description,id) {
//     this.title = title;
//     this.price = price;
//     this.imgUrl = imgUrl;
//     this.description = description;
//     this.id=id;
//   }
//   save() {
//     console.log("models -> product.js -> this -> 18 :",this);
//     return db.execute( "insert into products (title,price,description,inputURL) values(?,?,?,?);",
//     [this.title,this.price,this.description,this.imgUrl]);
//   }
 
//   static remove(productId){
//     return db.execute("delete from products where product_id=?",[productId]);
//   }

//   static fetchProducts() {
//     return db.execute('select * from products');
//   }

//   static fetchProductById (productId) {
//     return db.execute('select * from products where product_id=?',[productId]);
//   }

// };


// #### Sequelize ####


// const sequelize = require("../util/database");

// const Sequelize= require('sequelize');

// const Product =sequelize.define('product',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     title: Sequelize.STRING,
//     price:{
//         type:Sequelize.INTEGER,
//         allowNull:false
//     },
//     imageurl:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },

// }
// );

// module.exports=Product;


//mongo db
const getDb= require('../util/database').getDb;
class Product{
    constructor(title, price, imgUrl, description,id) {
        this.title = title;
        this.price = price;
        this.imgUrl = imgUrl;
        this.description = description;
        this.id=id;
    }

    save(){
        const db=getDb();
        db.collection('products').insertOne(this).then((result)=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        });
    }
}

module.exports=Product;