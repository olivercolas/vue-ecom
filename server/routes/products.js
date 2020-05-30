const express = require('express')
const router = express.Router()
const ProductsControllers = require('../controllers/products')

router.get('', ProductsControllers.getAllProducts)

module.exports = router
