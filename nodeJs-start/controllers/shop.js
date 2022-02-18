// const fs=require('fs');
// const { title } = require('process');

//product array
// const products=[];

//import product model class
const Product =require('../models/product');
const Cart =require('../models/cart');
const CartItem =require('../models/cart-item');



exports.getIndex=(req,res,next)=>{
    
    //normal send file
    // res.sendFile(path.join(rootDir,'views','shop.html'));

    //fetch all Products
    Product.findAll()
    .then(products=>{
        console.log("product -> getProducts-> products",products);
        res.render('shop/index',{prods:products,title:'Shop',path:'/'});
    })
    .catch(err=>console.log(err));
    
     
}
exports.getProducts=(req,res,next)=>{
    
    //normal send file
    // res.sendFile(path.join(rootDir,'views','shop.html'));

    //fetch all Products
    Product.findAll()
    .then(products=>{
        console.log("product -> getProducts-> products",products);
        res.render('shop/product-list',{prods:products,title:'Products',path:'/products'});
    })
    .catch(err=>console.log(err));
 
}
exports.getProductDetails=(req,res,next)=>{
    const productId=req.params.productId;
    Product.findByPk(productId)
    .then(product=>{
        console.log("contr/shop - data -> 45 : ",product);
        
        res.render(`shop/product-details`,{product:product,title:'Product Details',path:`/products`})
    })
    .catch(err=>console.log(err))
  
}
exports.getCartProducts=(req,res,next)=>{
    
    //normal send file
    // res.sendFile(path.join(rootDir,'views','shop.html'));

    //fetch all Products

        // Product.fetchCart(cart=>{  
        //     const cartProducts=[];
        //     Product.fetchProducts(products=>{
        //         console.log("shop.js [controllers]",cart.cart);
        //         cart.cart.forEach(item=>{
        //             const productIndex=products.findIndex(itm=>itm.id===item.id);
        //             if (productIndex !==-1){

        //                 cartProducts.push({
        //                     ...products[productIndex],
        //                     count:item.count
    
        //                 });
        //             }
        //         })
        //         const cartTotalPrice=cart.totalPrice
        //         res.render('shop/cart',{title:'Cart',cart:{cart:cartProducts,totalPrice:cartTotalPrice},path:'/cart'});
        //     })
        // })

            req.user.getCart()
            .then(cart=>{
                console.log("cart -> 83",cart);
                // res.render('shop/cart',{title:'Cart',cart:cart,path:'/cart'});
            })
            .catch(err=>{
                console.log(err);
            })


}
exports.postCartProducts=(req,res,next)=>{
    const productId=req.body.productId;
    const productPrice=req.body.productPrice;
    console.log(" shop.js[controlers] -> productId",productId); 
    Product.productAddToCart(productId,productPrice);
    res.redirect('/cart');

    Product.findByPk(productId)
    .then(product=>{

    })
    .catch(err=>{
        console.log(err);
    })
}
exports.postDeleteCartProduct=(req,res,next)=>{
    const productId=req.params.productId;
    console.log(" shop.js[controlers] -> productId",productId); 
    Product.fetchProductById(productId,product=>{
        Product.deleteCartProduct(productId,product.price); 
        res.redirect('/cart');
    })
    
}
exports.getCheckOut=(req,res,next)=>{
    
    //normal send file
    // res.sendFile(path.join(rootDir,'views','shop.html'));

    //fetch all Products
    

        // send file with pug
    res.render('shop/check-out',{title:'CheckOut',path:'/check-out'});
    
}


