//#Sequelize#
// const Sequelize =require('sequelize');

// const sequelize = new Sequelize('nodejs_sql','root','mohantym90',{
//     dialect:'mysql',
//     host:'localhost'
// });

// module.exports=sequelize;

//#MongoDB#

const mongo= require('mongodb');
const mongoClient=mongo.MongoClient;

let _db;

const password = encodeURIComponent("Mohantym90@");
const mongoConnect= (callback)=>{
    mongoClient.connect(`mongodb+srv://Jagadish123:${password}@clusternodejs.s7kv5.mongodb.net/shop?retryWrites=true&w=majority`,{useNewUrlParser:true})
    .then(client=>{
        callback();
        _db=client.db();
    }).catch(err=>{
        console.log(err);
        throw _db;
    });
}

const getDb=()=>{
    if (_db){
        return _db;
    }
    throw "Database not found!!"
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// const mongoConnect=require('./util/database');

// mongoConnect((client)=>{
//   console.log(client);
//   app.listen(3000);
// })


