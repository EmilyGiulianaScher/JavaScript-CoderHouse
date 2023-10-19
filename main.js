localStorage.setItem('bienvenida', 'Bienvenido a Frizaditas!, alias las mejores empanadas...')
const pedidos = [];

document.getElementById("guardarDatoBtn").addEventListener("click", guardarDato);
document.getElementById("realizarFuncionBtn").addEventListener("click", realizarFuncion);

function guardarDato() {
    const nombre = document.getElementById("nombre").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);

  
    if (nombre.trim() !== "" && !isNaN(cantidad) && cantidad > 0) {
       
        pedidos.push({ nombre, cantidad });

       
        document.getElementById("nombre").value = "";
        document.getElementById("cantidad").value = "";

        alert("Pedido de " + cantidad + " empanada(s) de " + nombre + " agregado.");
    } else {
        alert("Ingresa un nombre de empanada y una cantidad válida.");
    }
}

function realizarFuncion() {
    let totalEmpanadas = 0;

    for (const pedido of pedidos) {
        totalEmpanadas += pedido.cantidad;
    }

    if (totalEmpanadas > 0) {
        alert("Total de empanadas en el pedido: " + totalEmpanadas);
    } else {
        alert("No se han agregado empanadas al pedido.");
    }
}