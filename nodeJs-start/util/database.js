const mysql =require('mysql2');

const pool= mysql.createPool({
    host:'localhost',
    user:'root',
    database:'nodejs_sql',
    password:'mohantym90'
});

module.exports=pool.promise();