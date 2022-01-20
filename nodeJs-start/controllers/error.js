exports.getErro404=(req,res,next)=>{
    // res.status(404).sendFile(path.join(rootDir,'views','Error404.html'));
    res.render('Error404',{title:'Page not Found',isShopPage:false,isAddProductPage:false})
}