const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Cart=sequelize.define('cart-item',{
  id:{
    type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
  },
  quantity:Sequelize.INTEGER

})

module.exports=Cart;