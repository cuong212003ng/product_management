const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()



const accountsValidates = require('../../validates/admin/accountsValidates')
const uploadCloudinary = require('../../middlewares/admin/uploadCloudinary.middleware')
const accountsController = require('../../controllers/admin/accounts.controller')

router.get('/', accountsController.index)


router.get('/create', accountsController.create)

router.post(
    '/create',
    upload.single('avatar'),
    uploadCloudinary.upload,
    accountsValidates.createPost,
    accountsController.createPost
)

router.get('/edit/:id', accountsController.edit)

router.patch('/edit/:id',
    upload.single('avatar'),
    uploadCloudinary.upload,
    accountsValidates.editValidate,
    accountsController.editPatch
)

module.exports = router;