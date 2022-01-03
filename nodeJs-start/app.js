const http= require('http');

const server =http.createServer((req,res)=>{
    // console.log(req);
    // process.exit();

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My Document</title></head>')
    res.write('<body><h2>Hi there, It is my Document.</h2></body>')
    res.write('</html>');
    console.log(req.headers, req.method,req.url);
})

server.listen(3000);