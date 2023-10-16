//DOM 
let recordatorio = document.getElementById("recordatorio")
let Sabores = document.getElementsByClassName("Sabores")

for (const x of Sabores) {
    console.log(x.innerHTML); 
}

let ver = document.getElementById('ver')
ver.innerText="No Me Ves"


// Declaraciones de variables y objetos

function Empanada(sabor, precio) {
    this.sabor = sabor;
    this.precio = precio;
}

const empanadas = [new Empanada("Carne", 200), new Empanada("Pollo", 175), new Empanada("Jamón y Queso", 150), new Empanada("Humita", 180), new Empanada("Cebolla y Queso", 125)];

let entrada;
let cantidadTotalEmpanadas = 0; // Variable para llevar un seguimiento de la cantidad total de empanadas en el pedido

//Storage
localStorage.setItem('bienvenida', 'Bienvenido a Frizaditas!, alias las mejores empanadas...')

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
        let userInput;

        do {
            userInput = prompt("Elige el sabor de la empanada (Carne, Pollo, Jamón y Queso, Humita o Cebolla y Queso)  Para finalizar el pedido, ingresa: 'continuar':");
            userInput = userInput.toLowerCase();

            if (userInput !== "continuar") {
                let empanadaElegida = empanadas.find(empanada => empanada.sabor.toLowerCase() === userInput);

                if (empanadaElegida) {
                    let cantidad = parseInt(prompt("Ingresa la cantidad de empanadas de " + empanadaElegida.sabor + " que deseas:"));
                    cantidadTotal += cantidad * empanadaElegida.precio;
                    cantidadTotalEmpanadas += cantidad;
                    pedido.push({ sabor: empanadaElegida.sabor, cantidad: cantidad });
                } else {
                    alert("Sabor no válido. Por favor, elige un sabor de la lista.");
                }
            }
        } while (userInput !== "continuar");


        if (pedido.length >= 12) {
            cantidadTotal *= 0.90; // Aplicar descuento del 10% si se compran más de 1 docena
        }



        while (true) {
            bebida = prompt("¿Deseas agregar una bebida por el costo adicional de $300? Ingresa 'si' o 'no':");
            bebida = bebida.toLowerCase();

            if (bebida == "si") {
                cantidadTotal += 300; // Mover esta línea aquí
                break;
            } else if (bebida == "no") {
                break;
            } else {
                alert("Respuesta no válida. Por favor, ingresa 'si' o 'no'.");
            }
        }

        alert("Resumen del pedido:");

        let resumenPedido = "Empanadas en tu pedido:\n";

        for (const item of pedido) {
            resumenPedido += item.cantidad + " empanadas de " + item.sabor + "\n";
        }

        let precioTotalSinDescuento = 0; // Inicializar precioTotalSinDescuento

        if (cantidadTotalEmpanadas >= 12) {
            for (const item of pedido) {
                const empanadaElegida = empanadas.find(empanada => empanada.sabor === item.sabor);
                precioTotalSinDescuento == cantidadTotal;
            }

            console.log("Cantidad de empanadas en el pedido:", cantidadTotalEmpanadas);
            const descuento = precioTotalSinDescuento * 0.10; // Calcular el descuento del 10%
            console.log("Descuento aplicado:", descuento);

            const precioFinalConDescuento = precioTotalSinDescuento - descuento;

            const mensaje = `Resumen del pedido: 
    ${resumenPedido} 
    Total sin descuento: $${precioTotalSinDescuento.toFixed(2)}
    Descuento (10%): -$${descuento.toFixed(2)}
    Precio final con descuento: $${precioFinalConDescuento.toFixed(2)}`;

            alert(mensaje);
        } else {
            for (const item of pedido) {
                const empanadaElegida = empanadas.find(empanada => empanada.sabor === item.sabor);
                precioTotalSinDescuento += item.cantidad * empanadaElegida.precio;
            }

            const mensajeSinDescuento = `Resumen del pedido: 
    ${resumenPedido} 
    Precio a pagar: $${precioTotalSinDescuento.toFixed(2)}`;

            alert(mensajeSinDescuento);
        }


    }
} while (entrada !== "finalizar");