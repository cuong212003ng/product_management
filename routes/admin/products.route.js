const express = require('express')
const multer = require('multer')

const router = express.Router()

const storageMulter = require('../../helpers/storageMulter')

const upload = multer({storage: storageMulter()})

const productsController = require('../../controllers/admin/product.controller')

const productValidates = require('../../validates/admin/product.validates')

router.get('/', productsController.products)

router.patch('/change-status/:status/:id', productsController.changeStatus) //:status, :123 la route dong, 123 la id cua san pham

router.patch('/change-multi', productsController.changeMulti)

router.delete('/delete/:id', productsController.delete)

router.get('/trash', productsController.trash)

router.patch('/trash/restore/:id', productsController.restore)

router.get('/create', productsController.create)

router.post(
    '/create',
    upload.single('thumbnail'),
    productValidates.createPost,
    productsController.createPost
)



module.exports = router