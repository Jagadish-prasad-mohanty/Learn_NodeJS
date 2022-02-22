// const fs=require('fs');
// const { title } = require('process');

//product array
// const products=[];

//import product model class
const Product = require("../models/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");

exports.getIndex = (req, res, next) => {
  //normal send file
  // res.sendFile(path.join(rootDir,'views','shop.html'));

  //fetch all Products
  Product.findAll()
    .then((products) => {
      console.log("product -> getProducts-> products", products);
      res.render("shop/index", { prods: products, title: "Shop", path: "/" });
    })
    .catch((err) => console.log(err));
};
exports.getProducts = (req, res, next) => {
  //normal send file
  // res.sendFile(path.join(rootDir,'views','shop.html'));

  //fetch all Products
  Product.findAll()
    .then((products) => {
      console.log("product -> getProducts-> products", products);
      res.render("shop/product-list", {
        prods: products,
        title: "Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};
exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then((product) => {
      console.log("contr/shop - data -> 45 : ", product);

      res.render(`shop/product-details`, {
        product: product,
        title: "Product Details",
        path: `/products`,
      });
    })
    .catch((err) => console.log(err));
};
exports.getCartProducts = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      console.log("cart -> 83", cart);
      return cart
        .getProducts()
        .then((products) => {
            console.log("cart -> 87", products);
          res.render("shop/cart", {
            title: "Cart",
            cart: { cart: products },
            path: "/cart",
          });
        })
        .catch((err) => {
          console.log(err);
        });
      // res.render('shop/cart',{title:'Cart',cart:cart,path:'/cart'});
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postCartProducts = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })

    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      console.log("constollers -> product - 121 : ", product);
      
      if (product) {
        const oldQuantity = product['cart-item'].quantity;
        newQuantity = oldQuantity + 1;
      }
      return Product.findByPk(productId)
        
    })
    .then(product=>{
        return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity },
          });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postDeleteCartProduct = (req, res, next) => {
  const productId = req.params.productId;
  console.log(" shop.js[controlers] -> productId", productId);
//   Product.fetchProductById(productId, (product) => {
//     Product.deleteCartProduct(productId, product.price);
//     res.redirect("/cart");
//   });
    req.user.getCart()
    .then(cart=>{
        return cart.getProducts({where:{id:productId}})
        
    })
    .then(products=>{
        const product=products[0];
        return product['cart-item'].destroy();
    })
    .then(()=>{
        res.redirect("/cart");
    })
    .catch(err=>{
        console.log(err);
    })
};
exports.getCheckOut = (req, res, next) => {
  //normal send file
  // res.sendFile(path.join(rootDir,'views','shop.html'));

  //fetch all Products

  // send file with pug
  res.render("shop/check-out", { title: "CheckOut", path: "/check-out" });
};
