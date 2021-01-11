<?php

include('conexion.php');
$query = "SELECT * from parking";
$resultado = mysqli_query($conexion,$query);

echo $resultado->num_rows;


?>