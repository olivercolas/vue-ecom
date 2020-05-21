const express = require('express')
const router = express.Router()
const ProductsControllers = require('../controllers/products')

router.get('/:id', ProductsControllers.getProduct)
router.get('', ProductsControllers.getAllProducts)

module.exports = router
