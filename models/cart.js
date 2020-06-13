const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path.js');

const p = path.join(rootDir,'data','cart.json');
module.exports = class Cart {

        static  addProduct(id,productPrice)
        {
            

                fs.readFile(p,(err,fileContent)=> {
                    let x= parseInt(0);
                let cart ={products : [], totalPrice : x };
                if(!err)
                {
                cart = JSON.parse(fileContent) ;
                }

                //analyse the exiteing cart
                const exitstingProductId = cart.products.findIndex(prod => prod.id === id);
                const exitstingProduct = cart.products[exitstingProductId];
                let updatedProduct;
                if(exitstingProduct)
                {
                    updatedProduct={...exitstingProduct};
                    updatedProduct.qty=updatedProduct.qty + 1;
                    cart.products=[...cart.products];
                    cart.products[exitstingProductId]=updatedProduct;
                }
                else
                {
                    updatedProduct = { id:id, qty:1};
                    cart.products = [...cart.products,updatedProduct];
                }
                cart.totalPrice = cart.totalPrice + parseInt( productPrice);
                // console.log( cart.totalPrice , productPrice);
                fs.writeFile(p , JSON.stringify(cart) , (err) =>
                 {
                console.log(err);
                });



            });
            
        }

        static deleteProduct(id,productPrice)
        {
            fs.readFile(p,(err,fileContent)=> {
                if(err)
                {
                    return ;
                }
                const updatedCart = {...JSON.parse(fileContent)};
                const product = updatedCart.products.find(prod => prod.id===id);
                // console.log(product);
                if(!product)
                {
                    return ;
                    
                }
                const productQty = product.qty;
                
                updatedCart.products = updatedCart.products.filter ( prod => prod.id!==id);
                updatedCart.totalPrice= updatedCart.totalPrice - ( parseInt(productQty) * parseInt( productPrice));

                fs.writeFile(p , JSON.stringify(updatedCart) , (err) =>
                {
                console.log(err);
               });
            });
        }

        static getCart(cb)
        {
            fs.readFile(p,(err,fileContent)=> {
            const cart = JSON.parse(fileContent);
            if(err)
            {
                cb(null);
            }
            else{
            cb(cart);
            }

            });
        }


}