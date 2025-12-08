const Product = require('../../model/product.model')

const systemConfig = require('../../config/system')

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



 

    const products = await Product
        .find(find)
        .sort({ position: "asc" })
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)

    res.render('admin/pages/products/index', {
        titlePage: 'Sản phẩm',
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status
    const id = req.params.id

    await Product.updateOne({ _id: id }, { status: status })

    // Sau khi cập nhật trạng thái, quay lại đúng trang trước đó (giữ nguyên page, filter, search)
    req.flash('success', 'Cập nhật trạng thái thành công')
    const backUrl = req.get('Referrer')
    res.redirect(backUrl)
}

//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(',')

    switch(type) {
        case 'active':
            await Product.updateMany({ _id: { $in: ids } }, { status: 'active' })
            break;
        case 'inactive':
            await Product.updateMany({ _id: { $in: ids } }, { status: 'inactive' })
            break;
        case 'delete-all':
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() })
            break;
        case 'change-position':           
            for( let item of ids) {
                let [id, position] = item.split('-')
                position = parseInt(position)
                await Product.updateOne({ _id: id}, { position: position})
            }
            break;
        default:
            break;
    }


    req.flash('success', 'Cập nhật thành công')
    
    const backUrl = req.get('Referrer')
    res.redirect(backUrl)
}

//[DELETE] /admin/products/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id

    //Xóa mềm sản phẩm bằng cách đánh dấu deleted = true
    await Product.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date() // Them thoi gian xoa
        })

    //Xóa vĩnh viễn sản phẩm bằng cách xóa document trong database
    //await Product.deleteOne({ _id: id })

    req.flash('success', 'Xóa sản phẩm thành công')

    const backUrl = req.get('Referrer')
    res.redirect(backUrl)
}

//[GET] /admin/products/trash
module.exports.trash = async (req, res) => {
    
    //lấy dữ liệu từ database
    const productsRaw = await Product.find({ deleted: true }).lean() 
    //tạo mới một mảng mới để lưu trữ dữ liệu đã được format thời gian
    const products = productsRaw.map((product) => { 
        return {
            ...product, //gán dữ liệu từ database vào product
            deletedAtFormatted: product.deletedAt
                ? product.deletedAt.toLocaleString('vi-VN', {
                      timeZone: 'Asia/Ho_Chi_Minh',
                  })
                : '',
        }
    })

    res.render("admin/pages/products/trash", {
        titlePage: "Sản phẩm bị xóa",
        products: products
    })
}

//[PATCH] /admin/products/trash/restore/:id
module.exports.restore = async (req, res) => {
    const id = req.params.id
    

    await Product.updateOne({ _id: id }, { deleted: false, deletedAt: null })

    req.flash('success', 'Khôi phục sản phẩm thành công')
    const backUrl = req.get('Referrer')
    res.redirect(backUrl)
}

//[GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render('admin/pages/products/create', {
        titlePage: 'Thêm sản phẩm'
    })
}

//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {  

    req.body.description = req.body.description.trim()
    req.body.price = parseFloat(req.body.price)
    req.body.discountPercentage = parseFloat(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    

    if(req.body.position == ""){
        const countProduct = await Product.countDocuments()
        req.body.position = countProduct + 1

    } else {
        req.body.position = parseInt(req.body.position)
    }

    const product = new Product(req.body)
    await product.save()

    req.flash('success', 'Thêm sản phẩm thành công')
    res.redirect(`${systemConfig.prefixAdmin}/products`)    
}

//[GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {

    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
    
        const product = await Product.findOne(find).lean() // ham lean de lay du lieu tu database ve dang object
    
        res.render('admin/pages/products/edit', {
            titlePage: 'Sửa sản phẩm',
            product: product
        })
    } catch (error) {
        req.flash('error', 'Sửa sản phẩm thất bại')
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}

//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
   
    req.body.description = req.body.description.trim()
    req.body.price = parseFloat(req.body.price)
    req.body.discountPercentage = parseFloat(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    
    //Nếu có file thì lưu hình ảnh vào database
    if(req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    if(req.body.position == ""){
        const countProduct = await Product.countDocuments()
        req.body.position = countProduct + 1

    } else {
        req.body.position = parseInt(req.body.position)
    }

    const product = await Product.updateOne({ _id: req.params.id }, req.body)

    req.flash('success', 'Sửa sản phẩm thành công')
    res.redirect(`${systemConfig.prefixAdmin}/products`) 
}

//[GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
    
        const product = await Product.findOne(find).lean() // ham lean de lay du lieu tu database ve dang object
    
        res.render('admin/pages/products/detail', {
            titlePage: 'Chi tiết sản phẩm',
            product: product
        })
    } catch (error) {
        req.flash('error', 'Lỗi trang')
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}

