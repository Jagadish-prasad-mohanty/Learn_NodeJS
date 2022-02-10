const http = require("http");
// const route=require('./route')
// console.log(route);

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./util/database");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

// const expHDBars= require('express-handlebars');

//import errorControllers
const errorControllers = require("./controllers/error");

const app = express();

db.execute("select * from products")
.then(data=>console.log(data[0]))
.catch(err=>console.log(err));

// setting of dynamic content (PUG)
// app.set('view engine', 'pug');
// app.set('views','views');

// setting of dynamic content (handlebars)
// app.engine('hbs',expHDBars);
// app.set('view engine','hbs');
// app.set('views','views');
// setting of dynamic content (EJS)

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", (req, res, next) => {
  console.log("Allways happen");
  next();
});

app.use("/admin", adminRouter);

app.use(shopRouter);

app.use("*", errorControllers.getErro404);

// const server =http.createServer(app);

// server.listen(3000);
app.listen(3000);
