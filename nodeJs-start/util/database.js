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
const password = encodeURIComponent("Mohantym90@");
const mongoConnect= (callback)=>{
    mongoClient.connect(`mongodb+srv://Jagadish123:${password}@clusternodejs.s7kv5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{useNewUrlParser:true})
    .then(client=>{
        callback(client);
    }).catch(err=>{
        console.log(err);
    });
}
module.exports = mongoConnect;

// const mongoConnect=require('./util/database');

// mongoConnect((client)=>{
//   console.log(client);
//   app.listen(3000);
// })


