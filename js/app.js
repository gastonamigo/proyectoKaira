class lista {
    constructor(id, nombre, precio, imagen, info) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.info = info;


    }
}
const productos = []

productos.push(new lista(1, "Ender 3 v2", 55000, "../img/ender-3-V2-01.jpg", "#"));
productos.push(new lista(2, "Ender 2 pro", 45000, "../img/ender2pro1.png", "#"));
productos.push(new lista(3, "Cr10 pro v2", 95000, "../img/creality-cr-10-smart-pro-1.jpg", "#"));
productos.push(new lista(4, "Cr5 pro", 125000, "../img/cr5pro1.jpg", "#"));
let contadorCarrito = 0;
const carrito = [];
const catalogoHTML = (producto) => {
    const card = `
    <div class="col d-flex justify-content-center">
        <div class="card" style="width: 30rem;">
          <img src="${producto.imagen}" class="card-img-top" alt="ender2pro">
          <div class="card-body">
          <h5 class="card-tittle">${producto.nombre}</h5>
          <p>Precio: ${producto.precio}</p>
          <button type="button" id="boton-${producto.id}" class="btn btn-primary buttonComprar">Comprar</button>
          <a href="${producto.info}" class="btn btn-primary buttonComprar">Info</a>
          </div>
        </div>
      </div>
    </div>`;
    return card;
};
const carroHTML = (producto) => {
    const dropdown = `
    <a class="dropdown-item">${producto.nombre} ---- $${producto.precio}<button id="btn-carrito-${producto.idCompra}" class="btn buttonQuitar">Quitar</button></a>
    `;
    
    return dropdown;
};
const mostrarProductos = () => {
    const catalogo = document.getElementById("lista");
    let listaHTML = "";
    for (const producto of productos) {
        listaHTML += catalogoHTML(producto);
    }
    catalogo.innerHTML = listaHTML;
    buttonsLista();
};
const mostrarCarrito = () => {
    const listaCarrito = document.getElementById("carrito");
    const precioTotal = document.getElementById("precioTotal");

    let carritoHTML = "";
    let precio = 0;
    for (const producto of carrito) {
        carritoHTML += carroHTML(producto);
        precio += producto.precio;
    }
    listaCarrito.innerHTML = carritoHTML;
   precioTotal.innerHTML = (`<hr class="dropdown-divider"> <p>El precio total es: $${precio}</p>`);
    
    botonesCarrito();
};
const buttonsLista = () => {
    for (const producto of productos) {
        const botonId = `boton-${producto.id}`;
        const boton = document.getElementById(botonId);

        boton.addEventListener("click", () => {
            const productoCarrito = {
                nombre: producto.nombre,
                idCompra: contadorCarrito,
                precio: producto.precio,
            };
            contadorCarrito += 1;
            carrito.push(productoCarrito);
            mostrarCarrito();
        });
    }
};
const botonesCarrito = () => {
    for (const producto of carrito) {

        const botonId = `btn-carrito-${producto.idCompra}`;
        const botonNodo = document.getElementById(botonId);

        botonNodo.addEventListener("click", () => {
            const index = carrito.findIndex((p) => p.idCompra == producto.idCompra);
            carrito.splice(index, 1);

            mostrarCarrito();
        });


    }
};

mostrarProductos();

const btnFinalizar = document.getElementById("finalizarCompra");
btnFinalizar.addEventListener("click", () => {
    let total = 0;
    for (const producto of carrito) {
        total += producto.precio;
    }
    console.log(total);
    btnFinalizar.insertAdjacentHTML("beforebegin", `<p>El total de su compra es:$${total}</p>`);

})




