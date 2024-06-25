<?php
session_start();

// Verifica si hay una sesión activa
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    // Devuelve una respuesta JSON indicando que el usuario está logueado
    echo json_encode(array('loggedin' => true));
} else {
    // Devuelve una respuesta JSON indicando que el usuario no está logueado
    echo json_encode(array('loggedin' => false));
}
?>
