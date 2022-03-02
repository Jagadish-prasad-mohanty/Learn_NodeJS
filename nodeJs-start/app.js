const http = require("http");
// const route=require('./route')
// console.log(route);

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");


// const adminRouter = require("./routes/admin");
// const shopRouter = require("./routes/shop");

//Models
// const User = require("./models/user");
// const Product = require("./models/product");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");

// const expHDBars= require('express-handlebars');

//import errorControllers
const errorControllers = require("./controllers/error");

const app = express();

// db.execute("select * from products")
// .then(data=>console.log(data[0]))
// .catch(err=>console.log(err));

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

// app.use("/admin", adminRouter);

// app.use(shopRouter);

app.use("*", errorControllers.getErro404);

// const server =http.createServer(app);

// server.listen(3000);

//import sequelize
// const sequelize = require("./util/database");
// conneting models
// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// User.hasMany(Order);
// Order.belongsTo(User);
// Product.belongsToMany(Order, { through: OrderItem });
// Order.belongsToMany(Product, { through: OrderItem });

//Syncronise all the models to the app
// sequelize
//   .sync()
//   .then((result) => {
//     console.log("Product table Created Successfully");
//     return User.findByPk(1);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({
//         name: "RedEye",
//         email: "RedEye@gmail.com",
//         password: "1234",
//       });
//     }
//     return user;
//   })
//   .then((user) => {
//     console.log("User created succesfully");
//     return user.createCart();
//   })
//   .then((cart) => {
//     console.log("cart created successfully");
//     app.listen(3000);
//   })

//   .catch((err) => {
//     console.log(err);
//   });


//mongodb
const mongoConnect=require('./util/database');

mongoConnect((client)=>{
  app.listen(3000);
  console.log(client);
})