const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {

  Product.fetchAll().then(([products , fieldData])=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  
};


exports.getProduct = (req, res, next) => {

  const prodId = req.params.productId;
  Product.findById(prodId).then(([product])=>{
   
  
    
    res.render('shop/product-detail', {

      product:product[0],
      pageTitle:product.title,
      path: '/products'
    });
  
  })
  .catch((error)=>{

     console.log(error);
  });
 

  
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows,fieldData])=>{
          console.log(rows);
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })

  

};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
       
      const prodId = req.body.productId;
      console.log(prodId);
      Product.findById(prodId,(product)=>{
        Cart.addProduct(prodId ,product.price);
      })
        
      

     

      res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
