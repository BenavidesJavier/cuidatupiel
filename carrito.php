<?php
header('Content-Type: application/json');
// Configurar la conexión a la base de datos
$servername = "localhost";
$username = "tu_usuario";
$password = "tu_contraseña";
$dbname = "nombre_de_tu_base_de_datos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Manejar las solicitudes según el método HTTP
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Obtener productos del carrito
        $sql = "SELECT * FROM carrito";
        $result = $conn->query($sql);
        $carrito = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $carrito[] = $row;
            }
        }
        echo json_encode($carrito);
        break;

    case 'POST':
        // Agregar un producto al carrito
        $data = json_decode(file_get_contents('php://input'), true);
        $nombre = $data['nombre'];
        $precio = $data['precio'];

        $sql = "INSERT INTO carrito (nombre, precio) VALUES ('$nombre', '$precio')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(array('message' => 'Producto agregado al carrito'));
        } else {
            echo json_encode(array('error' => 'Error al agregar producto: ' . $conn->error));
        }
        break;

    case 'DELETE':
        // Eliminar un producto del carrito
        parse_str(file_get_contents('php://input'), $data);
        $id = $data['id'];

        $sql = "DELETE FROM carrito WHERE id=$id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(array('message' => 'Producto eliminado del carrito'));
        } else {
            echo json_encode(array('error' => 'Error al eliminar producto: ' . $conn->error));
        }
        break;

    default:
        echo json_encode(array('error' => 'Método no soportado'));
        break;
}

// Cerrar conexión
$conn->close();
?>
