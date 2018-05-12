const { getProducts } = require('../services/product.services');
const pc={};

const getProductList = (req, res) => {
   var key = req.query.key;
   // console.log(req.body);
    //console.log(key);
  getProducts(key,pc.config,res);
    // if (products) {
    //     res.status(200)
    //         .send(products);
    // }
};

function init(routeconfig){
    pc.config =routeconfig;
}

module.exports ={
getProductList,
init
} 
