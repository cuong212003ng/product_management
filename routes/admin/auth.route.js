const express = require('express')
const router = express.Router()

const authController = require('../../controllers/admin/auth.controller')
const authValidates = require('../../validates/admin/authValidates')

router.get('/login', authController.login)

router.post('/login', 
    authValidates.loginPost,
    authController.loginPost
)

router.get('/logout', authController.logout)

module.exports = router