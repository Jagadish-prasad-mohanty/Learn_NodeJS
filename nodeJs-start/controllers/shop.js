const fs=require('fs');

//product array
// const products=[];

//import product model class
const Product =require('../models/product');

exports.getAddProduct=(req,res,next)=>{
    console.log("A middleware");
    //notmal page render
    // res.sendFile(path.join(rootDir,'views','add-product.html'))

    //pug dynamic page render
    res.render('admin/add-product',{title:'add-product',path:'/admin/add-product'});
    
    // next();
}

exports.postAddProduct=(req,res,next)=>{
    console.log("[admin.js]",req.body);
    //push object to product array
    // products.push({'title':req.body.title,price:req.body.price});
    const product=new Product(req.body.title,req.body.price);
    product.save();
    res.redirect('/');
    // fs.writeFile('data.txt',JSON.stringify({title:req.body['title'],price:req.body['price']}),()=>{

    //     
    // })
}

exports.getIndex=(req,res,next)=>{
    
    //normal send file
    // res.sendFile(path.join(rootDir,'views','shop.html'));

    //fetch all Products
    Product.fetchProducts((products)=>{

        // send file with pug
        console.log("product -> getProducts-> products",products);
        res.render('shop/index',{prods:products,title:'Shop',path:'/'});
    });
}
exports.getProducts=(req,res,next)=>{
    
    //normal send file
    // res.sendFile(path.join(rootDir,'views','shop.html'));

    //fetch all Products
    Product.fetchProducts((products)=>{

        // send file with pug
        console.log("product -> getProducts-> products",products);
        res.render('shop/product-list',{prods:products,title:'Products',path:'/products'});
    });
}
exports.getProductDetails=(req,res,next)=>{
    const productId=req.params.productId;
    Product.fetchProductById(productId,(product)=>{
        res.render(`shop/product-details`,{product:product,title:'Product Details',path:`/products`})
    });
  
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


