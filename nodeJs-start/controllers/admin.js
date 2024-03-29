

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
    const imageurl=req.body.imageurl;
    const description=req.body.description;
    // const product=new Product(title,price,imgUrl,description);
    // Product.create({
    //     title:title,
    //     price:price,
    //     imageurl:imageurl,
    //     description:description
    // })
    req.user.createProduct({
        title:title,
        price:price,
        imageurl:imageurl,
        description:description
    })
    .then(result=>{
        console.log(result);
        res.redirect('/');
    }).catch(err=>{
        console.log(err);
    })
    
    // fs.writeFile('data.txt',JSON.stringify({title:req.body['title'],price:req.body['price']}),()=>{

    //     
    // })
}

// exports.getEditProduct=(req,res,next)=>{
//     console.log("A Admin Edit Product middleware");
//     const {productId}=req.params;
//     //notmal page render
//     // res.sendFile(path.join(rootDir,'views','add-product.html'))

//     //pug dynamic page render
//     // Product.findByPk(productId)
//     req.user.getProducts(productId)
//     .then(products=>{ 
//         const product=products[0];
//         if(!product)   {
//             return res.redirect('/admin/products');
//         }else{
//             res.render('admin/edit-product',{product:product,title:'Edit Product',path:'/admin/products'})
//         }
//     })
//     .catch(err=>{console.log(err);})
//     // next();

// }
// exports.postEditProduct=(req,res,next)=>{
//     const title=req.body.title;
//     const price=req.body.price;
//     const imageurl=req.body.imageurl;
//     const description=req.body.description;
//     const productId=req.body.id;
    
//     // const product=new Product(title,price,imgUrl,description,productId);
//     // Product.update({
//     //     title:title,
//     //     id:productId,
//     //     imageurl:imageurl,
//     //     desccription:description,
//     //     price:price
//     // },{
//     //     where:{
//     //         id:productId
//     //     }
//     // })
//     // .then(result=>{
//     //     console.log(result)
//     //     res.redirect('/admin/products');
//     // })
//     // .catch(err=>{console.log(err)});


//     Product.findByPk(productId)
//     .then(product=>{
//         product.title=title;
//         product.price=price;
//         product.description=description;
//         product.imageurl=imageurl;

//         return product.save();
//     })
//     .then(result=>{
//         res.redirect('/admin/products');
//     })
//     .catch(err=>{
//         console.log(err);
//     })


    
//     // next();
// }

// exports.postDeleteProduct= (req,res,next)=>{
//     const productId=req.params.productId;
//     Product.destroy({
//         where:{
//             id:productId
//         }
//     }).then(()=>{
//         res.redirect("/admin/products");
//     }).catch(err=>console.log(err));
// }


// exports.getProducts=(req,res,next)=>{
    
//     //normal send file
//     // res.sendFile(path.join(rootDir,'views','shop.html'));

//     //fetch all Products for the user
//     req.user.getProducts()
//     .then(products=>{
//         console.log("product -> getProducts-> products",products);
//         res.render('admin/products',{prods:products,title:'Admin Products',path:'/admin/products'});
//     })
//     .catch(err=>console.log(err));
// }