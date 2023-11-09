//Variable que mantiene el estado visible del carrito
let carritoVisible = false;


//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {

    //Agregremos funcionalidad a los botones eliminar del carrito
    let botonesEliminarItem = [...document.getElementsByClassName('btn-eliminar')];
    for (let button of botonesEliminarItem) {
        button.addEventListener('click', eliminarItemCarrito);
    }
    

    //Agrego funcionalidad al boton sumar cantidad
    let botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (let i = 0; i < botonesSumarCantidad.length; i++) {
        let button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    //Agrego funcionalidad al buton restar cantidad
    let botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (let i = 0; i < botonesRestarCantidad.length; i++) {
        let button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    let botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
        
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked() {
    Swal.fire("Gracias por la compra");
    //Elimino todos los elmentos del carrito
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
    
}


//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    let precio = item.getElementsByClassName('precio-item')[0].innerText;
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;
    // Llamas a la función para agregar el item al carrito
    agregarItemAlCarrito(titulo, precio, imagenSrc);
    
    // Llamas a la función para hacer visible el carrito
    hacerVisibleCarrito();

    // Llamas a la función para guardar el carrito en el localStorage
   
}


//Funcion que hace visible el carrito
function hacerVisibleCarrito() {
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    let items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    let item = document.createElement('div');
    item.classList.add('item'); // Corregir aquí: no es ('item'); es .add('item')
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // controlamos que el item que intenta ingresar no se encuentre en el carrito
    let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    let itemYaEnCarrito = false;

    for (let i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            Swal.fire("El item ya se encuentra en el carrito");
            itemYaEnCarrito = true;
            break; // Salir del bucle cuando se encuentra el item
        }
    }

    
    
    let itemCarritoContenido = `
    <div class="carrito-item">
        <img src="${imagenSrc}" width="80px" alt="">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <button class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>
`;

    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    let botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    let botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);
   
    //Actualizamos total
    actualizarTotalCarrito();
    saveLocal();
}

//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito() {
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        let items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

//Actualizamos el total de Carrito
function actualizarTotalCarrito() {
    //seleccionamos el contenedor carrito
    let carritoContenedor = document.getElementsByClassName('carrito')[0];
    let carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    let total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for (let i = 0; i < carritoItems.length; i++) {
        let item = carritoItems[i];
        let precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        let precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
        let cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        let cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";

}


const btn = document.querySelector('#botonRecordatorio')
const popup = document.querySelector('#popup-mensaje')

btn.addEventListener('click', () =>{
    popup.classList.add('popup-active')
    
    setTimeout( () => {
        popup.classList.remove('popup-active')
    }, 2500)
})







const apiKey = 'CG-ZA8fBKo2Vozi9UUeqDniApqh';
const apiUrl = 'https://api.coingecko.com/api/v3';

// Función para obtener y mostrar el precio de Bitcoin
function obtenerPrecioBitcoin() {
    fetch(`${apiUrl}/simple/price?ids=bitcoin&vs_currencies=usd&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Manejar los datos de respuesta y mostrar en la página
            const bitcoinPrice = data.bitcoin.usd;
            const cryptoInfoElement = document.getElementById('crypto-info');
            cryptoInfoElement.innerHTML = `<p>Precio de Bitcoin: $${bitcoinPrice}</p>`;
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
            // Manejar el error y mostrar un mensaje en la página
            const cryptoInfoElement = document.getElementById('crypto-info');
            cryptoInfoElement.innerHTML = '<p>Error al cargar la información de criptomonedas.</p>';
        });
}

// Llama a la función para obtener el precio de Bitcoin cuando la página se carga
window.onload = obtenerPrecioBitcoin;

const saveLocal = () => {
    // Obtén la información del carrito directamente del DOM
    let carritoItems = document.querySelector('.carrito-items');
    let itemsEnCarrito = carritoItems.innerHTML;

    // Guarda la información en el localStorage
    localStorage.setItem("carrito", itemsEnCarrito);
};

