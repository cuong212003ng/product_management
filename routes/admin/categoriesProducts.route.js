const express = require('express')
const multer = require('multer')
const router = express.Router()
const upload = multer()

const categoriesProductValidates = require('../../validates/admin/categories-product.validate')
const uploadCloudinary = require('../../middlewares/admin/uploadCloudinary.middleware')
const categoriesProductsController = require('../../controllers/admin/categoriesProducts.controller')



router.get('/', categoriesProductsController.categoriesProducts)

router.get('/create', categoriesProductsController.create)

router.post(
    '/create',
    upload.single('thumbnail'),
    uploadCloudinary.upload,
    categoriesProductValidates.createPost, //middleware validate
    categoriesProductsController.createPost
)

router.get('/edit/:id', categoriesProductsController.edit)

router.patch(
    '/edit/:id',
    upload.single('thumbnail'),
    uploadCloudinary.upload,
    categoriesProductsController.editPatch
)

router.get('/detail/:id', categoriesProductsController.detail)

module.exports = router