

//product array
// const products=[];

//import product model class
const Product =require('../models/product');

exports.getAddProduct=(req,res,next)=>{
    console.log("A Admin Add Product middleware");
    //notmal page render
    // res.sendFile(path.join(rootDir,'views','add-product.html'))

    //pug dynamic page render
    res.render('admin/add-product',{title:'Add Product',path:'/admin/add-product'});
    
    // next();
}
exports.postAddProduct=(req,res,next)=>{
    console.log("[admin.js]",req.body);
    //push object to product array
    // products.push({'title':req.body.title,price:req.body.price});
    
    const title=req.body.title;
    const price=req.body.price;
    const imgUrl=req.body.imgUrl;
    const description=req.body.description;
    const product=new Product(title,price,imgUrl,description);
    product.save();
    res.redirect('/');
    // fs.writeFile('data.txt',JSON.stringify({title:req.body['title'],price:req.body['price']}),()=>{

    //     
    // })
}

exports.getEditProduct=(req,res,next)=>{
    console.log("A Admin Edit Product middleware");
    const {productId}=req.params;
    //notmal page render
    // res.sendFile(path.join(rootDir,'views','add-product.html'))

    //pug dynamic page render
    Product.fetchProductById(productId,product=>{
      
        
        res.render('admin/edit-product',{product:product,title:'Edit Product',path:'/admin/products'});
        

    })
    
    // next();
}
exports.postEditProduct=(req,res,next)=>{
    const title=req.body.title;
    const price=req.body.price;
    const imgUrl=req.body.imgUrl;
    const description=req.body.description;
    const productId=req.body.id;
    
    const product=new Product(title,price,imgUrl,description,productId);
    product.save();
    res.redirect('/admin/products');
    
    // next();
}

exports.postDeleteProduct= (req,res,next)=>{
    const productId=req.params.productId;
    Product.remove(productId);
    res.redirect("/admin/products");
}


exports.getProducts=(req,res,next)=>{
    
    //normal send file
    // res.sendFile(path.join(rootDir,'views','shop.html'));

    //fetch all Products
    Product.fetchProducts((products)=>{

        // send file with pug
        console.log("product -> getProducts-> products",products);
        res.render('admin/products',{prods:products,title:'Admin Products',path:'/admin/products'});
    });
}
