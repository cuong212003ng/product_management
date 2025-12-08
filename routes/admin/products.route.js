const express = require('express')
const multer = require('multer')

const router = express.Router()

const upload = multer()

const productsController = require('../../controllers/admin/product.controller')

const productValidates = require('../../validates/admin/product.validates')

const uploadCloudinary = require('../../middlewares/admin/uploadCloudinary.middleware')

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
    uploadCloudinary.upload,
    productValidates.createPost, //middleware validate
    productsController.createPost
)

router.get(
    '/edit/:id',
    productsController.edit
)

router.patch(
    '/edit/:id',
    upload.single('thumbnail'),
    productValidates.editPatch, //middleware validate
    productsController.editPatch
)

router.get(
    '/detail/:id',
    productsController.detail
)


module.exports = router