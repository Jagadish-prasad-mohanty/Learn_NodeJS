const sequelize = require("../util/database");

const Sequelize= require('sequelize');

const Product =sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    title: Sequelize.STRING,
    price:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    imageurl:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },

}
);

module.exports=Product;