//--------------------requiring modules--------------------
const express = require('express');
const router = express.Router();
const productController = require("../controller/productController")
const userController = require("../controller/userController")
const {authentication, authorization} = require("../middleware/auth")

//--------------------for user--------------------
router.post('/register', userController.createUser);
router.post('/login',  userController.loginUser);

//--------------------for products--------------------
router.post('/products', productController.createProduct);
router.get("/products", productController.getProduct)
router.get('/products/:productId', productController.getProductByParam);
// router.put('/products/:productId', productController.updateProduct);
// router.delete('/products/:productId', productController.deleteProduct);

//--------------------making file public--------------------
module.exports = router;