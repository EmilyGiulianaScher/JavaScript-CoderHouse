localStorage.setItem('bienvenida', 'Bienvenido a Frizaditas!, alias las mejores empanadas...');

const pedidos = [];

function Empanada(sabor, precio) {
    this.sabor = sabor;
    this.precio = precio;
}

const sabores = [
    new Empanada("carne", 200),
    new Empanada("pollo", 175),
    new Empanada("jamon y queso", 150),
    new Empanada("humita", 180),
    new Empanada("cebolla y queso", 125)
];

document.getElementById("guardarDatoBtn").addEventListener("click", guardarDato);
document.getElementById("realizarFuncionBtn").addEventListener("click", realizarFuncion);

function guardarDato() {
    const nombre = document.getElementById("nombre").value.toLowerCase();
    const cantidad = parseInt(document.getElementById("cantidad").value);

  
    const saborEncontrado = sabores.find(saborObj => saborObj.sabor === nombre);

    if (saborEncontrado && !isNaN(cantidad) && cantidad > 0) {
        pedidos.push({ nombre, cantidad, precio: saborEncontrado.precio });
        document.getElementById("nombre").value = "";
        document.getElementById("cantidad").value = "";
        alert(`Pedido de ${cantidad} empanada(s) de ${nombre} agregado a un costo de $${cantidad * saborEncontrado.precio}.`);
    } else {
        alert("Ingresa un sabor de empanada válido y una cantidad válida.");
    }
}

function realizarFuncion() {
    let totalEmpanadas = 0;
    let precioTotal=0;

    for (const pedido of pedidos) {
        totalEmpanadas += pedido.cantidad;
    }

    for (const pedido of pedidos) {
        precioTotal += pedido.precio * pedido.cantidad;
    }

    (totalEmpanadas > 0) ? true : false
    totalEmpanadas ? alert ("Total de empanadas en el pedido: " + totalEmpanadas + " precio total: " + precioTotal): alert("No se han agregado empanadas al pedido.");
    }
    