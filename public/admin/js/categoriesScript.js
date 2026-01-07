//Delete categories
const buttonsDelete = document.querySelectorAll('[button-delete]')
if (buttonsDelete.length > 0) {
    const formDelete = document.querySelector('#form-delete')

    // Chỉ chạy khi form tồn tại trên trang hiện tại
    if (formDelete) {
        const path = formDelete.getAttribute('data-path')
        
        buttonsDelete.forEach(button => {
            button.addEventListener('click', () => {
                
                const isConfirm = confirm('Bạn có chắc chắn muốn xóa danh mục sản phẩm này không?')

                if(isConfirm) {
                    const id = button.getAttribute('data-id')
                    const action = path + `/${id}?_method=DELETE`

                    formDelete.setAttribute('action', action)           
                    formDelete.submit()
                }
            })
        })
    }
}
//End delete categories