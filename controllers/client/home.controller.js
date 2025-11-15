module.exports.home = async (req, res) => {


    res.render('client/pages/home/index',{
        titlePage: 'Trang chủ'
    })
}