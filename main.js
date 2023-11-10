
let carritoVisible = false;


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function obtenerNombreUsuario() {
    return localStorage.getItem('nombreUsuario');
}

function mostrarSaludo() {
    const nombreUsuario = obtenerNombreUsuario();

    if (nombreUsuario) {
        const header = document.querySelector('header');
        header.innerHTML = `<h1>Hola, ${nombreUsuario}</h1>`;
    } else {

        mostrarFormularioNombre();
    }
}


function mostrarFormularioNombre() {
    const nombreUsuarioContainer = document.getElementById('nombreUsuarioContainer');
    nombreUsuarioContainer.style.display = 'block';
}

function guardarNombre() {
    const nombreUsuarioInput = document.getElementById('nombreUsuario');
    const nombreUsuario = nombreUsuarioInput.value.trim();

    if (nombreUsuario) {
        localStorage.setItem('nombreUsuario', nombreUsuario);
        mostrarSaludo();
    } else {

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Escribe tu nombre por favor...!",

        });
    }
}

mostrarSaludo();

function borrarNombre() {
    localStorage.removeItem('nombreUsuario');
    mostrarFormularioNombre();
}




function ready() {

    let botonesEliminarItem = [...document.getElementsByClassName('btn-eliminar')];
    for (let button of botonesEliminarItem) {
        button.addEventListener('click', eliminarItemCarrito);
    }

    let botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (let i = 0; i < botonesSumarCantidad.length; i++) {
        let button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    let botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (let i = 0; i < botonesRestarCantidad.length; i++) {
        let button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    let botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)
}

function pagarClicked() {
    Swal.fire("Gracias por la compra");
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();

}

function agregarAlCarritoClicked(event) {
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    let precio = item.getElementsByClassName('precio-item')[0].innerText;
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}


function hacerVisibleCarrito() {
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    let items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    let item = document.createElement('div');
    item.classList.add('item');
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    let itemYaEnCarrito = false;

    for (let i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            Swal.fire("El item ya se encuentra en el carrito");
            itemYaEnCarrito = true;
            break;
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

    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    let botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    let botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    actualizarTotalCarrito();

}

function sumarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
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
function eliminarItemCarrito(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    actualizarTotalCarrito();

    ocultarCarrito();
}

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

function actualizarTotalCarrito() {

    let carritoContenedor = document.getElementsByClassName('carrito')[0];
    let carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    let total = 0;

    for (let i = 0; i < carritoItems.length; i++) {
        let item = carritoItems[i];
        let precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
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

btn.addEventListener('click', () => {
    popup.classList.add('popup-active')

    setTimeout(() => {
        popup.classList.remove('popup-active')
    }, 2500)
})


const apiKey = 'CG-ZA8fBKo2Vozi9UUeqDniApqh';
const apiUrl = 'https://api.coingecko.com/api/v3';


function obtenerPrecioBitcoin() {
    fetch(`${apiUrl}/simple/price?ids=bitcoin&vs_currencies=usd&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {

            const bitcoinPrice = data.bitcoin.usd;
            const cryptoInfoElement = document.getElementById('crypto-info');
            cryptoInfoElement.innerHTML = `<p>Precio de Bitcoin: $${bitcoinPrice}</p>`;
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);

            const cryptoInfoElement = document.getElementById('crypto-info');
            cryptoInfoElement.innerHTML = '<p>Error al cargar la información de criptomonedas.</p>';
        });
}

window.onload = obtenerPrecioBitcoin;