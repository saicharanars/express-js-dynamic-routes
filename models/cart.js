const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports= class Cart{
    static addProduct(id,productPrice ){
        //fetch previous cart
        fs.readFile(p,(err,fileContent)=>{
            let cart = {prodcts:[],totalPrice:0};
            if(!err){
                cart = JSON.parse(fileContent);
            }

            const existingProductindex = cart.prodcts.find(prod=>prod.id === id);
            const existingProduct=cart.prodcts[existingProductindex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct={...existingProduct};
                updatedProduct.qty=updatedProduct.qty+1;
                cart.prodcts=[...cart.prodcts];
                cart.prodcts[existingProductindex]=updatedProduct;

            }else{
                updatedProduct={id:id,qty:1};
                cart.prodcts=[...cart.prodcts,updatedProduct];
            }
            cart.totalPrice=cart.totalPrice+ +productPrice;
             
            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log("succes")
                }
                
            });
            
        });

        
    }
}