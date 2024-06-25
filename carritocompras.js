// URL de la API para el carrito
const API_URL = 'http://tu_servidor/carrito_api.php';

// Función para agregar un producto al carrito
function agregarAlCarrito(btn) {
    var producto = btn.parentNode; // Obtiene el nodo padre del botón
    var nombre = producto.dataset.nombre; // Obtiene el nombre del producto desde el dataset
    var precio = parseFloat(producto.dataset.precio); // Obtiene y convierte el precio del producto

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: nombre, precio: precio }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Mensaje de confirmación desde el servidor
        cargarProductosCarrito(); // Recarga la lista de productos en el carrito
    })
    .catch(error => console.error('Error al agregar producto:', error));
}

// Función para cargar productos en el carrito desde la API
function cargarProductosCarrito() {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        // Manipular los datos obtenidos del carrito
        var listaProductos = document.getElementById('lista-productos'); // Obtener el contenedor de la lista de productos
        var totalProductos = document.getElementById('total-productos'); // Obtener el contenedor del total de productos
        var productosTotales = 0; // Inicializar el contador de productos totales

        listaProductos.innerHTML = ''; // Limpiar la lista de productos

        data.forEach(function(producto, index) {
            var productoHTML = document.createElement('div'); // Crear un div para el producto
            productoHTML.innerHTML = `
                <div class="producto">
                    <p>${producto.nombre} - Precio: $${producto.precio}</p>
                    <button onclick="quitarProducto(${producto.id})">Quitar</button>
                    <span class="cantidad-individual">${producto.cantidad || 1}</span>
                </div>
            `;
            listaProductos.appendChild(productoHTML); // Añadir el producto a la lista
            productosTotales += producto.cantidad || 1; // Sumar la cantidad del producto al total
        });

        totalProductos.textContent = productosTotales; // Actualizar el texto del total de productos
    })
    .catch(error => console.error('Error al cargar productos:', error));
}

// Función para quitar un producto del carrito
function quitarProducto(id) {
    fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Mensaje de confirmación desde el servidor
        cargarProductosCarrito(); // Recarga la lista de productos en el carrito
    })
    .catch(error => console.error('Error al eliminar producto:', error));
}


// Función para aumentar la cantidad de un producto
function aumentarCantidad(id) {
    fetch(`${API_URL}/aumentarCantidad.php?id=${id}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Mensaje de confirmación desde el servidor
        cargarProductosCarrito(); // Recarga la lista de productos en el carrito
    })
    .catch(error => console.error('Error al aumentar cantidad:', error));
}


// Función para reducir la cantidad de un producto
function reducirCantidad(id) {
    fetch(`${API_URL}/reducirCantidad.php?id=${id}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Mensaje de confirmación desde el servidor
        cargarProductosCarrito(); // Recarga la lista de productos en el carrito
    })
    .catch(error => console.error('Error al reducir cantidad:', error));
}

// Función para confirmar la compra
function confirmarCompra() {
    fetch(`${API_URL}/confirmarCompra.php`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Mensaje de confirmación desde el servidor
        mostrarConfirmacionCompra(data.totalCompra); // Mostrar la confirmación de la compra
    })
    .catch(error => console.error('Error al confirmar compra:', error));
}

// Función para mostrar la confirmación de la compra
function mostrarConfirmacionCompra(totalCompra) {
    var confirmacion = document.getElementById("confirmacion");
    confirmacion.innerHTML = `
        <div class="confirmacion-contenido">
            <p>Total de la compra: $${totalCompra.toFixed(2)}</p>
            <button onclick="finalizarCompra()">Confirmar</button>
            <button onclick="cerrarConfirmacion()">Cancelar</button>
        </div>
    `;
    confirmacion.classList.add("show");
}

// Función para cerrar la confirmación de compra
function cerrarConfirmacion() {
    var confirmacion = document.getElementById("confirmacion");
    confirmacion.classList.remove("show"); // Oculta la confirmación
}

// Función para finalizar la compra
function finalizarCompra() {
    fetch(`${API_URL}/finalizarCompra.php`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Mensaje de confirmación desde el servidor
        localStorage.removeItem('carrito'); // Elimina el carrito de localStorage (si es necesario)
        cargarProductosCarrito(); // Recarga la lista de productos en el carrito
        mostrarMensajeCompraFinalizada(); // Mostrar mensaje de compra finalizada
    })
    .catch(error => console.error('Error al finalizar compra:', error));
}

// Función para mostrar el mensaje de compra finalizada
function mostrarMensajeCompraFinalizada() {
    var confirmacion = document.getElementById("confirmacion");
    confirmacion.innerHTML = `
        <div class="confirmacion-contenido">
            <p>¡Gracias por tu compra!</p>
            <button onclick="cerrarConfirmacion()">Cerrar</button>
        </div>
    `;
    setTimeout(function() {
        confirmacion.classList.remove("show"); // Oculta la confirmación después de 3 segundos
    }, 3000);
}
