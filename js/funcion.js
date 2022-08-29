const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((prod) =>{
    const dropdown = document.createElement('dropdown');
    dropdown.innerHTML = `
    <a class="dropdown-item">Cantidad ${prod.cantidad} -- ${prod.nombre} ---- $${prod.precio}<button onclick="quitarDelCarrito(${prod.id})" class="btn buttonQuitar">Quitar</button></a>
     `;
     contenedorCarrito.appendChild(dropdown);
     localStorage.setItem('carrito', JSON.stringify(carrito));
    })
    //contadorCarrito.innerText = carrito.length;
    precioTotal.innerText = carrito.reduce((acc, prod)=> acc + (prod.cantidad * prod.precio), 0);
}
botonVaciarCarrito.addEventListener('click',()=> {
    localStorage.removeItem('carrito');
    carrito = [];
    actualizarCarrito();
})