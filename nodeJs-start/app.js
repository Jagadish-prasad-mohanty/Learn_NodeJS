const http= require('http');
// const route=require('./route')
// console.log(route);

const path= require('path')
const express= require('express');
const bodyParser=require('body-parser');

const adminData  = require('./routes/admin');
const shopRouter= require('./routes/shop');

const app= express();

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname,'public')));

app.use('/',(req,res,next)=>{
    console.log("Allways happen");
    next();
})

app.use('/admin',adminData.router);

app.use(shopRouter);

app.use('*',(req,res,next)=>{
    res.status(404).send("<h1>Page not Found</h1>")
})

// const server =http.createServer(app);

// server.listen(3000);
app.listen(3000)