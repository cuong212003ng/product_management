//Change status
const buttonsChangeStatus = document.querySelectorAll('[button-change-status]')
if (buttonsChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector('#form-change-status')

    // Chỉ chạy khi form tồn tại trên trang hiện tại
    if (formChangeStatus) {
        const path = formChangeStatus.getAttribute('data-path')

        buttonsChangeStatus.forEach(button => {
            button.addEventListener('click', () => {
                const statusCurrent = button.getAttribute('data-status')
                const id = button.getAttribute('data-id')

                let statusChange = statusCurrent == 'active' ? 'inactive' : 'active'

                const action = path + `/${statusChange}/${id}?_method=PATCH`

                formChangeStatus.setAttribute('action', action)
                
                formChangeStatus.submit()
                                     
            })
        })
    }
}
//End change status

//Delete product
const buttonsDelete = document.querySelectorAll('[button-delete]')
if (buttonsDelete.length > 0) {
    const formDelete = document.querySelector('#form-delete')

    // Chỉ chạy khi form tồn tại trên trang hiện tại
    if (formDelete) {
        const path = formDelete.getAttribute('data-path')
        
        buttonsDelete.forEach(button => {
            button.addEventListener('click', () => {
                
                const isConfirm = confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')

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
//End delete product

//Restore product
const buttonsRestore = document.querySelectorAll('[button-restore]')
if (buttonsRestore.length > 0) {
    const formRestore = document.querySelector('#form-restore')

    // Chỉ chạy khi form tồn tại trên trang hiện tại
    if (formRestore) {
        const path = formRestore.getAttribute('data-path')

        buttonsRestore.forEach(button => {
            button.addEventListener('click', () => {


                const isConfirm = confirm('Bạn có chắc chắn muốn khôi phục sản phẩm này không?')

                if(isConfirm) {
                    const id = button.getAttribute('data-id')
                    const action = path + `/${id}?_method=PATCH`

                    formRestore.setAttribute('action', action)
                    formRestore.submit()
                }
            })
        })
    }
}

//End restore product

