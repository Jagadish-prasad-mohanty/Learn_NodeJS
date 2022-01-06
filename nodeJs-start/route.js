const fs=require('fs');

const requestRoute=(req,res)=>{
    //Log the request
    // console.log(req);

    //exit the event loop(which run until there is any event listner )
    // process.exit();

    if (req.url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>My Form</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Submit</button></form></body>')
        res.write('</html>');
        return res.end()
    }
    if (req.url === '/message' && req.method==="POST"){
        const data=[];
        req.on('data',(chunk)=>{
            data.push(chunk);
            console.log(chunk);
        })
        return req.on('end',()=>{
            const responseData=Buffer.concat(data).toString();
            const  message=responseData.split('=')[1]
            console.log(message);
            fs.writeFile('message.txt',`This is your Message : ${message}`,(err)=>{
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            });
        })
    }

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My Document</title></head>')
    res.write('<body><h2>Hi there, It is my Document.</h2></body>')
    res.write('</html>');
    // console.log(req.headers, req.method,req.url);
    res.end()


}

// module.exports=requestRoute;

// module.exports={
//     handler:requestRoute,
//     otherText:"Hi there"
// }

exports.handler=requestRoute;
exports.otherText="Hi there";