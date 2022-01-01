const mysql2=require('mysql2');
// const { createPool } = require('mysql2/promise');

const pool=mysql2.createPool({
    host:'localhost',
    user:'root',
    database:'nodejs_sql',
    password:'mohantym90'
})

module.exports =pool.promise();