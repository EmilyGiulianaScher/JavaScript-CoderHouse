// Declaraciones de variables y objetos

function Empanada(sabor, precio) {
    this.sabor = sabor;
    this.precio = precio;
}

const empanadas = [new Empanada("Carne", 200), new Empanada("Pollo", 175), new Empanada("Jamón y Queso", 150), new Empanada("Humita", 180), new Empanada("Cebolla y Queso", 125)];

let entrada;


// Lógica y procesos

alert("Bienvenido a la fábrica de empanadas! Aquí podrás elegir el tipo, la cantidad y el acompañamiento.");


do {
    entrada = prompt("Ingrese cualquier letra para empezar, o escriba 'finalizar' para cerrar el programa.");
    entrada = entrada.toLowerCase();

    if (entrada !== "finalizar") {
        let cantidadTotal = 0;
        let bebida;

        alert("Nuestras opciones son: Empanadas de Carne, Pollo, Jamón y Queso, Humita y Cebolla y Queso");
        alert("Nuestros precios son: Carne: $200... Pollo: $175... Jamón y Queso: $150... Humita: $180... Cebolla y Queso: $125.");
        alert("Tenemos un 10% de descuento si llevas más de 1 docena (12 empanadas)");

        let pedido = [];

        while (true) {
            let sabor = prompt("Elige el sabor de la empanada (Carne, Pollo, Jamón y Queso, Humita o Cebolla y Queso)  Para finalizar el pedido, ingresa: 'continuar':");
            sabor = sabor.toLowerCase();

            if (sabor === "continuar") {
                break;
            }

            let empanadaElegida = empanadas.find(empanada => empanada.sabor.toLowerCase() === sabor);

            if (empanadaElegida) {
                let cantidad = parseInt(prompt("Ingresa la cantidad de empanadas de " + ${empanadaElegida.sabor} + "que deseas:"));
                cantidadTotal += cantidad * empanadaElegida.precio;
                pedido.push({ sabor: empanadaElegida.sabor, cantidad: cantidad });
            } else {
                alert("Sabor no válido. Por favor, elige un sabor de la lista.");
            }
        }

        if (pedido.length >= 12) {
            cantidadTotal *= 0.90; // Aplicar descuento del 10% si se compran más de 1 docena
        }

        while (true) {
            bebida = prompt("¿Deseas agregar una bebida por el costo adicional de $300? Ingresa 'si' o 'no':");
            bebida = bebida.toLowerCase();

            if (bebida === "si") {
                cantidadTotal += 300;
                break;
            } else if (bebida === "no") {
                break;
            } else {
                alert("Respuesta no válida. Por favor, ingresa 'si' o 'no'.");
            }
        }


        alert("Resumen del pedido:");

        let resumenPedido = "Empanadas en tu pedido:\n";
        for (const item of pedido) {
            resumenPedido += ${item.cantidad} " empanadas de" + ${item.sabor}\n;
        }

        const precioTotalSinDescuento = cantidadTotal;
        let descuento = 0;

        if (pedido.length >= 12) {
            descuento = precioTotalSinDescuento * 0.10; // Calcular el descuento del 10%
        }

        const precioFinalConDescuento = precioTotalSinDescuento - descuento;

        const mensaje = `Resumen del pedido: 
        Empanadas en tu pedido:\n${resumenPedido} 
        Total sin descuento: $${precioTotalSinDescuento.toFixed(2)}
        Descuento (10%): -$${descuento.toFixed(2)}
        Precio final con descuento: $${precioFinalConDescuento.toFixed(2)}`;

        alert(mensaje);



    }
} while (entrada !== "finalizar");






