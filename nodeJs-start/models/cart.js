const db=require('../util/database');

module.exports = class Cart {
  
  static productAddToCart(productId, productPrice) {
    let cart = {
      cart: [],
      totalPrice: 0,
    };

    

    fs.readFile(cartFilePath, (err, fileContent) => {
      if (!err) {
        cart = JSON.parse(fileContent);
        console.log("product.js[models] -> cartContent", cart);
      }

      const product = cart.cart.find((item) => item.id === productId);
      let updatedProduct;
      if (!product) {
        updatedProduct = {
          id: productId,
          count: 1,
        };
        cart.cart = [...cart.cart, updatedProduct];
      } else {
        updatedProduct = { ...product, count: product.count + 1 };
        const prodIndex = cart.cart.findIndex(
          (item) => item.id === updatedProduct.id
        );
        cart.cart[prodIndex] = updatedProduct;
      }
      cart.totalPrice += +productPrice;
      console.log("product.js[models] -> cart", cart);
      fs.writeFile(cartFilePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static fetchCart(callback) {
    let cart = {};

    fs.readFile(cartFilePath, (err, fileContent) => {
      if (!err && fileContent) {
        cart = JSON.parse(fileContent);
      } else {
        cart = {
          cart: [],
          totalPrice: 0,
        };
      }
      callback(cart);
    });
  }
  static deleteCartProduct(productId, price) {
    this.fetchCart((cart) => {
      let countOfRemoveProductFromCart = 0;

      const updatedCart = { ...cart };
      updatedCart.cart = cart.cart.filter((item) => {
        countOfRemoveProductFromCart = +item.count;
        return item.id !== productId;
      });

      updatedCart.totalPrice -= price * countOfRemoveProductFromCart;

      fs.writeFile(cartFilePath, JSON.stringify(updatedCart), (err) => {
        console.log("models ->product.js -> err -> 34 :", err);
      });
    });
  }
};
