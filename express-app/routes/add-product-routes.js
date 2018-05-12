const { addProduct} = require('../services/product.services');
const pc={};

const addProductToList = (req, res) => {
    var product=req.body;
    addProduct(product,pc.config,res);
    // res.status(200)
    //     .send({
    //         message: status
    //     });

};

function init(routeconfig){
    pc.config =routeconfig;
}

module.exports = {
    addProductToList,
    init
};