// Declaraciones de variables y objetos

function Empanada(sabor, precio,) {
    this.sabor = sabor;
    this.precio = precio;
}

 const empanadaCarne = new Empanada("Carne", 200);
 const empanadaPollo = new Empanada("Pollo", 175);
 const empanadaJyQ = new Empanada("Jamón y Queso", 150);
 const empanadaHumita = new Empanada("Humita", 180);
 const empanadaCyQ = new Empanada("Cebolla y Queso", 125);



// Lógica y procesos

alert("Bienvenido a la fábrica de empanadas! Aquí podrás elegir el tipo, la cantidad y el acompañamiento.");
let entrada;

do {
    entrada = prompt("Ingresa 'continuar' (o cualquier letra) para empezar o 'finalizar' para cerrar el programa.");
    entrada = entrada.toLowerCase();

    if (entrada !== "finalizar") {

        let cantidadTotal=0, resultado = 0, unidad=0;
        let bebida;

        let opcionValida = false;
            let ingreso;

       
            alert("Nuestras opciones son: Empanadas de Carne, Empanadas de Pollo, Empanadas de Jamón y Queso, Empanadas de Humita y Empanadas de Cebolla y Queso");
            
            alert(" nuestros precios son: Carne: $200... Pollo: $175... Jamón y Queso: $150... Humita: $180... Cebolla y Queso: $125.")
            alert("tenemos un 5% off si llevas mas de 1 docena (12 empanadas). Para finalizar el pedido de cantidad y sabor de empanadas, ingresar: continuar")

            do {
              sabor = prompt("elegi pue");
              sabor = sabor.toLowerCase();
                    sabor.push('');
                    if (sabor == Carne) {
                        cantidadTotal + 200;
                    } else if (sabor == Pollo) {
                        cantidadTotal +175;
                    }else if (sabor == JyQ) {
                        cantidadTotal +150;
                    }else if (sabor == Humita) {
                        cantidadTotal +180;
                    }else if (sabor == CyQ) {
                        cantidadTotal +125;
                    }
               precio += cantidadTotal;
               unidad++;



            } while (ingreso != "continuar");

        function calculo(cantidadTotal, precio) {
            return cantidadTotal * precio;
        }
        while (true) {
            bebida = prompt("¿Deseas agregar una bebida por el costo adicional de $100? Ingresa 'si' o 'no':");
            bebida = bebida.toLowerCase();

            if (bebida === "si") {
                resultado = calculo(cantidadTotal, valor) + 100;
                break;
            } else if (bebida === "no") {
                resultado = calculo(cantidadTotal, valor);
                break;
            } else {
                alert("Respuesta no válida. Por favor, ingresa 'si' o 'no'.");
            }
        }

        alert("Finalizado! El total de tu compra es de $" + resultado);
    }
} while (entrada !== "finalizar");







