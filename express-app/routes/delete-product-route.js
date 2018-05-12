const { deleteProduct } = require('../services/product.services');
const pc={};

const deleteProductFromList = (req, res) => {
    var id = req.body.ProductId;
   deleteProduct(id,pc.config,res);
    // res.status(200)
    //     .send({
    //         message: status
    //     });

};

function init(routeConfig){
pc.config =routeConfig;
}

module.exports ={
    deleteProductFromList,
    init
};