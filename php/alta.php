  
<?php
include("conexion.php");

$matricula = $_POST['matricula'];
$color = $_POST['color'];
$marca = $_POST['marca'];
$modelo = $_POST['modelo'];
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$email = $_POST['email'];


if(!empty($marca) && !empty($color) && !empty($modelo) && !empty($matricula) && !empty($nombre) && 
!empty($color) && !empty($email)){

    $query = "INSERT INTO clientes VALUES ('$matricula','$marca','$modelo','$color','$nombre' ,'$apellido' ,'$email');"
    or die("Error en la consulta");
    $resultado = mysqli_query($conexion,$query);
    
    echo $resultado;
};




?>