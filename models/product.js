const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  
  save() {
    //this.id=Math.random().toString();
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
        }
      else{
        this.id=Math.random().toString();
        products.push(this);
        console.log("else");
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
 
  }
  static deleteById(id) {
    getProductsFromFile(products => {
      
      const productIndex = products.find(prod => prod.id === id);
      console.log(productIndex);
      if (productIndex === -1) {
        console.log("Product not found");
        return;
      }
    
      products.splice(productIndex, 1);
      console.log(products);
      
      fs.writeFile(p, JSON.stringify(products), err => {
        if (!err) {
          console.log("sucess")
        }
      });
    });
  }



  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id,cb){
    getProductsFromFile(products =>{
      const product=products.find(p=>p.id === id);
      cb(product);
    })
    
  }
};