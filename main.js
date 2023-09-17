

alert("Bienvenido a la fábrica de empanadas! Aquí podrás elegir el tipo, la cantidad y el acompañamiento.");
let entrada;

do {
    entrada = prompt("Ingresa 'continuar' (o cualquier letra) para empezar o 'finalizar' para cerrar el programa.");
    entrada = entrada.toLowerCase();

    if (entrada !== "finalizar") {


        let valor = 150;
        let cantidadTotal, resultado = 0;
        let bebida;

        let opcionValida = false;

        do {
            alert("Nuestras opciones son: Empanadas de Carne (opcion1), Empanadas de Pollo (opcion2) y Empanadas de Jamón y Queso (opcion3)");
            let opciones = parseInt(prompt("Ingresa el número de la opción (1, 2, o 3):"));

            switch (opciones) {
                case 1:
                    alert("Elegiste la opción de Empanadas de Carne, ahora elige la cantidad.");
                    opcionValida = true; 
                    break;
                case 2:
                    alert("Elegiste la opción de Empanadas de Pollo, ahora elige la cantidad.");
                    opcionValida = true;
                    break;
                case 3:
                    alert("Elegiste la opción de Jamón y Queso, ahora elige la cantidad.");
                    opcionValida = true; 
                    break;
                default:
                    alert("Opción no válida");
                    break;
            }
        } while (!opcionValida); // Continuar el bucle hasta que se ingrese una opción válida




        cantidadTotal = parseInt(prompt("Ingresa la cantidad (individual) de empanadas, el valor es de $150 c/u"));

        function calculo(cantidadTotal, valor) {
            return cantidadTotal * valor;
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







