const fs=require('fs');
const { title } = require('process');

//product array
// const products=[];

//import product model class
const Product =require('../models/product');



exports.getIndex=(req,res,next)=>{
    
    //normal send file
    // res.sendFile(path.join(rootDir,'views','shop.html'));

    //fetch all Products
    const products=[];
    Product.fetchProducts()
    .then(data=>{
        const allProducts=data[0];
        allProducts.forEach(product=>{
            const {title,price,product_id,description,inputURL}=product;
            const prod={
                price:price,
                title:title,
                description:description,
                id:product_id,
                imgUrl:inputURL
            }
            products.push(prod);
        })

        console.log("product -> getProducts-> products",products);
        res.render('shop/index',{prods:products,title:'Shop',path:'/'});
    })
    .catch(err=>console.log(err));
    
     
}
exports.getProducts=(req,res,next)=>{
    
    //normal send file
    // res.sendFile(path.join(rootDir,'views','shop.html'));

    //fetch all Products
    const products=[];
    Product.fetchProducts()
    .then(data=>{
        const allProducts=data[0];
        allProducts.forEach(product=>{
            const {title,price,product_id,description,inputURL}=product;
            const prod={
                price:price,
                title:title,
                description:description,
                id:product_id,
                imgUrl:inputURL
            }
            products.push(prod);
        })

        console.log("product -> getProducts-> products",products);
        res.render('shop/product-list',{prods:products,title:'Products',path:'/products'});
    })
    .catch(err=>console.log(err));
 
}
exports.getProductDetails=(req,res,next)=>{
    const productId=req.params.productId;
    Product.fetchProductById(productId)
    .then(data=>{
        console.log("contr/shop - data -> 73 : ",data[0][0]);
        const product={
            title:data[0][0].title,
            price:data[0][0].price,
            description:data[0][0].description,
            imgUrl:data[0][0].inputURL
        }
        res.render(`shop/product-details`,{product:product,title:'Product Details',path:`/products`})
    })
    .catch(err=>console.log(err))
  
}
exports.getCartProducts=(req,res,next)=>{
    
    //normal send file
    // res.sendFile(path.join(rootDir,'views','shop.html'));

    //fetch all Products

        Product.fetchCart(cart=>{  
            const cartProducts=[];
            Product.fetchProducts(products=>{
                console.log("shop.js [controllers]",cart.cart);
                cart.cart.forEach(item=>{
                    const productIndex=products.findIndex(itm=>itm.id===item.id);
                    if (productIndex !==-1){

                        cartProducts.push({
                            ...products[productIndex],
                            count:item.count
    
                        });
                    }
                })
                const cartTotalPrice=cart.totalPrice
                res.render('shop/cart',{title:'Cart',cart:{cart:cartProducts,totalPrice:cartTotalPrice},path:'/cart'});
            })
        })

}
exports.postCartProducts=(req,res,next)=>{
    const productId=req.body.productId;
    const productPrice=req.body.productPrice;
    console.log(" shop.js[controlers] -> productId",productId); 
    Product.productAddToCart(productId,productPrice);
    res.redirect('/cart');
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


