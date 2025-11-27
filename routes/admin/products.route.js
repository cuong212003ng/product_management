const express = require('express')
const router = express.Router()

const productsController = require('../../controllers/admin/product.controller')

router.get('/', productsController.products)

router.patch('/change-status/:status/:id', productsController.changeStatus) //:status, :123 la route dong, 123 la id cua san pham

module.exports = router