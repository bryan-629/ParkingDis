<?php
/*Se encarga de ver si existe el cliente segun la metricula introducida , devuelve 1 en caso de existencia*/
include('conexion.php');
$matricula = $_POST['matricula'];
$query = "SELECT matricula from clientes where matricula = '$matricula'";
$resultado = mysqli_query($conexion,$query);

if(!$resultado){
    die("query fallida");
};

echo $resultado->num_rows;

?>