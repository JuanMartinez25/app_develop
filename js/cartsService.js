function getCarts(page){
    document.getElementById('cardHeader').innerHTML = '<h3>Lista de Carts</h3>'
    document.getElementById('info').innerHTML =''

     fetch("https://fakestoreapi.com/carts", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
     .then((result) =>{
         return result.json().then(
             data => {
                 return {
                     status: result.status,
                     body: data
                 }
             }
         )
     })
     .then((response) => {
         if(response.status == 200){
                 let listCarts = `
                     <table class="table">
                         <thead>
                             <tr>
                             <th scope="col">Id</th>
                             <th scope="col">Date</th>
                             <th scope="col">Product Id</th>
                             <th scope="col">Product Quantity</th>
                             <th scope="col">Action</th>
                             </tr>
                         </thead>
                       <tbody>
                 `
                 response.body.forEach(cart => {
                     listCarts = listCarts.concat(`
                         <tr>
                             <td>${cart.id}</td>
                             <td>${cart.date}</td>
                             <td>${cart.products.productId}</td>
                             <td>${cart.products.quantity}<td>
                             <td>
                                <button type="button" class="btn btn-outline-primary" onclick="showInfoCart('${cart.id}')">View</button>
                            </td>
                         </tr>
                         `)
                 })
                 listCarts = listCarts.concat(`
                         </tbody>
                     </table>
                     `)
                     document.getElementById('info').innerHTML = listCarts
         }
         else{
             document.getElementById('info').innerHTML = '<h3>No se encontraron carts</h3>'
         }
     }) 
 }

 function showInfoCart(cartId){
  fetch("https://fakestoreapi.com/carts/"+cartId, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then((result) =>{
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data
                }
            }
        )
    })
    .then((response) =>{
        if(response.status === 200){
            showModalCart(response.body)
        }else{
            document.getElementById('info').innerHTML = '<h3>No se Encontro el cart.</h3>'
        }
    })
}

function showModalCart(cart){
    const modalCart = `
        <div class="modal fade" id="modalCart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Show Cart</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Cart Info</h5>
                    <p class="card-text">Titulo: ${cart.title}</p>
                    <p class="card-text">Category: ${cart.category}</p>
                    <p class="card-text">Price: ${cart.price}</p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    `
    document.getElementById('showModal').innerHTML = modalCart

    const modal = new bootstrap.Modal(document.getElementById('modalCart'))
    modal.show()
}