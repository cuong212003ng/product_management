const Product = require('../../model/product.model')

const filterStatusHelper = require('../../helpers/filterStatus')
const searchHelper = require('../../helpers/search')
const paginationHelper = require('../../helpers/pagination')

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
    
    //Pagination
    const countProducts = await Product.countDocuments(find);

    let objectPagination =  paginationHelper.pagination(
        {
            currentPage: 1,
            limitItems: 5
        },
        req.query,
        countProducts
    )

    //End Pagination



 

    const products = await Product.find(find).limit(objectPagination.limitItems).
    skip(objectPagination.skip)

    res.render('admin/pages/products/index', {
        titlePage: 'Quản lý',
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}