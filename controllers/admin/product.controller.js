const Product = require('../../model/product.model')

const filterStatusHelper = require('../../helpers/filterStatus')
const searchHelper = require('../../helpers/search')

//[GET] /admin/products
module.exports.products = async (req, res) => {

    let find = {
        deleted: false
    }
    
    if(req.query.status){
        find.status = req.query.status
    }
    
    //Filter status
    const filterStatus = filterStatusHelper.filterStatus(req.query)
    //End Filter status

    //Search
    const objectSearch = searchHelper.search(req.query)

    if(objectSearch.regex){
        find.title = objectSearch.regex
    }
       
    //End Search
    



 

    const products = await Product.find(find)

    res.render('admin/pages/products/index', {
        titlePage: 'Quản lý',
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    })
}