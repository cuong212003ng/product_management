//Permissions
const tablePermissions = document.querySelector('[table-permissions]')
if(tablePermissions) {
    const buttonsSubmit = document.querySelector('[button-submit]')
    buttonsSubmit.addEventListener('click', () => {
        let permissions = []
        const rows = tablePermissions.querySelectorAll('[data-name]')
        rows.forEach(row => {
            const name = row.getAttribute('data-name')
            const inputs = row.querySelectorAll('input')
            if(name === 'id') {
                inputs.forEach(input => {
                    const id = input.value
                    permissions.push({
                        id: id,
                        permissions: []
                    })
                })      
            }
              else {
                inputs.forEach((input, index) => {
                    const checked = input.checked
                    // console.log(index);
                    // console.log(name);
                    // console.log(checked);
                    if(checked) {
                        permissions[index].permissions.push(name)
                    }

                })
              }
        }) 
        console.log(permissions)
        if(permissions.length > 0) {
            const formChangePermissions = document.querySelector('#form-change-permissions')
            const inputPermissions = formChangePermissions.querySelector('input[name="permissions"]')
            inputPermissions.value = JSON.stringify(permissions) //chuyen doi thanh chuoi json
            formChangePermissions.submit()
        }
    }) 
}
//End Permissions

//Permissions data default
const dataRecords = document.querySelector('[data-records]')
if(dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute('data-records'))
    const tablePermissions = document.querySelector('[table-permissions]')
    
    records.forEach((record, index) => {
        const permissions = record.permissions
        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`tr[data-name="${permission}"]`)
            const inputs = row.querySelectorAll('input')[index]

            if(inputs) {
                inputs.checked = true
            }
        })
        console.log('--------------------------------');      
    })
    
}
//End Permissions data default

//Delete role
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
//End delete role