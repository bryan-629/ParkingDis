<?php

include('conexion.php');
if (isset($_POST['matricula'])) {
    $matricula = $_POST['matricula'];

    $query = "DELETE FROM parking WHERE matricula = '$matricula'";

    $reg = mysqli_query($conexion, $query);

    if (!$reg) {
        die("Consulta fallida");
    }else{
        echo "Coche eliminado satisfactoriamente";
    };
};
?>