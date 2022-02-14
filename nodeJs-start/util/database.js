
const Sequelize =require('sequelize');

const sequelize = new Sequelize('nodejs_sql','root','mohantym90',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;

