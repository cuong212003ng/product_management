const systemConfig = require('../../config/system')

const dashboardRoute = require('./dashboard.route')
const productsRoute = require('./products.route')
const categoriesProductsRoute = require('./categoriesProducts.route')
const rolesRoute = require('./roles.route')
const accountsRoute = require('./accounts.route')
const authRoute = require('./auth.route')

const middlewareAuth = require('../../middlewares/admin/auth.middleware')

module.exports = (app) => {

    const PATH_ADMIN = systemConfig.prefixAdmin

    app.use(PATH_ADMIN +'/dashboard',middlewareAuth.requireLogin, dashboardRoute)
    app.use(PATH_ADMIN +'/products',middlewareAuth.requireLogin, productsRoute)
    app.use(PATH_ADMIN +'/categories/products',middlewareAuth.requireLogin, categoriesProductsRoute)
    app.use(PATH_ADMIN +'/roles', middlewareAuth.requireLogin, rolesRoute)
    app.use(PATH_ADMIN +'/accounts',middlewareAuth.requireLogin, accountsRoute)
    app.use(PATH_ADMIN +'/auth', authRoute)

}