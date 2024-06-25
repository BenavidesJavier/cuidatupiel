<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener y limpiar los datos enviados desde el formulario
    $firstname = clean_input($_POST['firstname']);
    $lastname = clean_input($_POST['lastname']);
    $email = clean_input($_POST['email']);
    $password = clean_input($_POST['password']);
    $confirm_password = clean_input($_POST['confirm_password']);

    // Validar que todos los campos requeridos estén presentes
    if (empty($firstname) || empty($lastname) || empty($email) || empty($password) || empty($confirm_password)) {
        echo "Todos los campos son obligatorios";
    } else {
        // Validar el formato del correo electrónico
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "El correo electrónico no es válido";
        } else {
            // Validar que las contraseñas coincidan
            if ($password !== $confirm_password) {
                echo "Las contraseñas no coinciden";
            } else {
                // En este punto, todos los datos están validados correctamente
                // Aquí puedes realizar la lógica de registro, por ejemplo, guardar en la base de datos

                // Ejemplo de impresión de datos (simulación de registro)
                echo "Registro exitoso:<br>";
                echo "Nombre completo: $firstname $lastname<br>";
                echo "Correo electrónico: $email<br>";

                // Aquí podrías guardar los datos en la base de datos

                // Redirigir a una página de éxito, por ejemplo:
                // header("Location: registro_exitoso.html");
                // exit;
            }
        }
    }
}

// Función para limpiar los datos de entrada
function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
