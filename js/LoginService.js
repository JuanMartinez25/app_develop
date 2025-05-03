document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    console.log('valores leidos del formulario', { email, password })
    login(email, password)
})

function login(email, password) {
    let message = ''
    let alertType = ''
    const LOGIN_ENDPOINT = 'https://reqres.in/api/login'
    fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
        body: JSON.stringify({email, password})
    })
    .then((response)=>{
        return response.json().then(
            data => {
                return{
                    status: response.status,
                    data
                }
            }
        )
    })
    .then((result)=>{
        if(result.status === 200){
            alertBuilder('success', "exitoso")
        }else{
            alertBuilder('danger', "malo")
        }
    })
    .catch((error)=>{
        alertType = 'danger'
        message = 'Error inesperado '+ error
        alertBuilder(alertType, message)
    })
}

function alertBuilder(alertType, message) {
    const alert = `
        <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
    document.getElementById('alert').innerHTML = alert
}