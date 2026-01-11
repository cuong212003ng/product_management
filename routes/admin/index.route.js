const systemConfig = require('../../config/system')
const dashboardRoute = require('./dashboard.route')
const productsRoute = require('./products.route')
const categoriesProductsRoute = require('./categoriesProducts.route')
const rolesRoute = require('./roles.route')
const accountsRoute = require('./accounts.route')
const authRoute = require('./auth.route')
module.exports = (app) => {

    const PATH_ADMIN = systemConfig.prefixAdmin

    app.use(PATH_ADMIN +'/dashboard', dashboardRoute)
    app.use(PATH_ADMIN +'/products', productsRoute)
    app.use(PATH_ADMIN +'/categories/products', categoriesProductsRoute)
    app.use(PATH_ADMIN +'/roles', rolesRoute)
    app.use(PATH_ADMIN +'/accounts', accountsRoute)
    app.use(PATH_ADMIN +'/auth', authRoute)
}