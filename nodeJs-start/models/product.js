const products=[];

//product class to manage data
module.exports= class Product{
    constructor(title,price){
        this.title=title;
        this.price=price;
    }

    save(){
        products.push(this);
    }

    static fetchProducts(){
        return products
    }

}

