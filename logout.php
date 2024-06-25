<?php
session_start();

// Destruye todas las variables de sesión
session_destroy();

// Devuelve una respuesta JSON indicando que se cerró sesión exitosamente
echo json_encode(array('loggedout' => true));
?>
