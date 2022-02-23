const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const OrderItem=sequelize.define('order-item',{
  id:{
    type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
  }

})

module.exports=OrderItem;