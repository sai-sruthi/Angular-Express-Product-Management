const express = require('express');
const router = express.Router();

const productsRoute = require('./products-route');
const addProductRoute = require('./add-product-routes');
const updateProductRoute = require('./update-product-route')
const deleteProductRoute = require('./delete-product-route');

/**
 * Default Get Route 
 */
router.get(`/`, (req, res) => res.send(`API working`));

/**
 * Users list route
 */
router.get(`/products`, productsRoute.getProductList);

/**
 * Add user routes
 */

router.put(`/products`, updateProductRoute.updateProductList);

/**
 * Update User route
 */
router.post(`/products`, addProductRoute.addProductToList)

/**
 * Delete user route
 */
router.delete('/products', deleteProductRoute.deleteProductFromList)

function init(routeConfig){
    productsRoute.init(routeConfig);
    addProductRoute.init(routeConfig);
    updateProductRoute.init(routeConfig);
    deleteProductRoute.init(routeConfig);
}

module.exports = {router,init};


