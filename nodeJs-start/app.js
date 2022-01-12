const http= require('http');
// const route=require('./route')
// console.log(route);
const fs=require('fs');
const express= require('express');
const bodyParser=require('body-parser');

const app= express();
app.use(bodyParser.urlencoded());

app.use('/',(req,res,next)=>{
    console.log("Allways happen");
    next();
})

app.use('/add-product',(req,res,next)=>{
    console.log("A middleware");
    res.send("<form action='/products' method='POST'><input name='title'/><button type='submit'>submit</button></form>");
    
    // next();
})
app.use('/products',(req,res,next)=>{
    console.log(req.body);
    fs.writeFile('data.txt',req.body['title'],()=>{

        res.redirect('/');
    })
})
app.use('/',(req,res,next)=>{
    console.log("Another middleware");
    res.send("<h1>Hi from middleware (HOME)</h1>");
})


// const server =http.createServer(app);

// server.listen(3000);
app.listen(3000)