

const listaProductos = document.getElementById('listaProductos');
const contenedorCarrito = document.getElementById('carrito');
const botonVaciarCarrito = document.getElementById('vaciarCarrito');
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');
let carrito = [];



document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizarCarrito();
    }
})

botonVaciarCarrito.addEventListener('click', () => {
    localStorage.removeItem('carrito');
    carrito = [];
    actualizarCarrito();
})

productos.forEach((producto) => {
    const card = document.createElement('card');
    card.classList.add('producto');
    card.innerHTML = `
     <div class="col d-flex justify-content-center">
        <div class="card" style="width: 30rem;">
           <img src="${producto.imagen}" class="card-img-top" alt="ender2pro">
           <div class="card-body">
           <h5 class="card-tittle">${producto.nombre}</h5>
           <p>Precio: ${producto.precio}</p>
           <button type="button" id="agregar${producto.id}" class="btn btn-primary buttonComprar">Comprar</button>
           <a href="${producto.info}" class="btn btn-primary buttonComprar">Info</a>
           </div>
         </div>
     </div>`;
    listaProductos.appendChild(card);
    const botonId = `agregar${producto.id}`;
    const boton = document.getElementById(botonId);


    boton.addEventListener('click', () => {
        Toastify({

            text: `Agregaste al Carrito 1 ${producto.nombre}`,

            duration: 3000,

            gravity: 'top',

            position: 'right',

        }).showToast();
        agregarAlcarrito(producto.id);
    })
})
const quitarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    localStorage.removeItem('carrito');
    actualizarCarrito();
}

const agregarAlcarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId);
    if (existe) {
        const prod = carrito.map(prod => {
            prod.id === prodId && prod.cantidad++;  // operador logico and
        })
    } else {
        const item = productos.find((prod) => prod.id === prodId);
        carrito.push(item);
        console.log(carrito);
    }
    actualizarCarrito();
}
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((prod) => {
        const dropdown = document.createElement('dropdown');
        dropdown.innerHTML = `
    <a class="dropdown-item">Cantidad ${prod.cantidad} -- ${prod.nombre} ---- $${prod.precio}<button onclick="quitarDelCarrito(${prod.id})" class="btn buttonQuitar">Quitar</button></a>
     `;
        contenedorCarrito.appendChild(dropdown);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        console.log(...carrito); //Este spread es solo para probar este operador
    })
    //contadorCarrito.innerText = carrito.length;
    let total = carrito.reduce((acc, prod) => acc + (prod.cantidad * prod.precio), 0); // reset parameters
    precioTotal.innerText = total;
    
    // Precio Dolar API ====================================================
    let totalUsd = document.getElementById('totalUsd');
    let dolarblue = 0;
    fetch('https://api.bluelytics.com.ar/v2/latest')
        .then((response) => response.json())
        .then((a) => {
            dolarblue = parseFloat(a['blue'].value_sell);
        })
        .catch(() => console.log('no se puede obtener el valor en USD'));

    setTimeout(() => {

        totalUsd.innerHTML = `: ${(total / dolarblue).toFixed(2)}<div>Cotizacion Dólar (1USD = $${dolarblue})</div>`;

    }, 1000)
}




