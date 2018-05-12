const { updateProduct } = require('../services/product.services');
const pc={};


const updateProductList = (req, res) => {
     var product=req.body;
    updateProduct(product,pc.config,res);
    // if (status) {
    //     res.status(200)
    //     .send({
    //         message: `Product Updated Successfully`
    //     });
    //     }

};

function init(routeconfig){
    pc.config =routeconfig;
}

module.exports = {
    updateProductList,
    init
};
