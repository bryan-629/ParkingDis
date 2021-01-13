<?php
/*Pregunta si hay una matricula dentro del parking */
include('conexion.php');
$matricula = $_POST['matricula'];
$query = "SELECT matricula from parking where matricula = '$matricula'";
$resultado = mysqli_query($conexion,$query);

if(!$resultado){
    die("query fallida");
};

echo $resultado->num_rows;

?>