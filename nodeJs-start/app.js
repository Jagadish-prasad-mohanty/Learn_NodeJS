const http= require('http');
// const route=require('./route')
// console.log(route);

const express= require('express');

const app= express();

app.use((req,res,next)=>{
    console.log("A middleware");
    next();
})
app.use((req,res,next)=>{
    console.log("Another middleware");
    res.send("<h1>Hi from middleware</h1>")
})


// const server =http.createServer(app);

// server.listen(3000);
app.listen(3000)