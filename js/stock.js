
class lista {
    constructor(id, nombre, precio, imagen, info, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.info = info;
        this.cantidad= cantidad;


    }
}
const productos = []

productos.push(new lista(1, "Ender 3 v2", 55000, "../img/ender-3-V2-01.jpg", "#",1));
productos.push(new lista(2, "Ender 2 pro", 45000, "../img/ender2pro1.png", "#",1));
productos.push(new lista(3, "Cr10 pro v2", 95000, "../img/creality-cr-10-smart-pro-1.jpg", "#",1));
productos.push(new lista(4, "Cr5 pro", 125000, "../img/cr5pro1.jpg", "#",1));