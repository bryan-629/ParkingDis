<?php
/*Introduce el coche dentro del parking */
include('conexion.php');
$matricula = $_POST['matricula'];
$marca = $_POST['marca'];
$modelo = $_POST['modelo'];
$color = $_POST['color'];



$query = "INSERT INTO parking VALUES ('$matricula','$marca','$modelo','$color')";
$resultado = mysqli_query($conexion,$query) or die("Query Fallida");

  

echo $resultado;

?>