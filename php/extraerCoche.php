<?php
/*Extrae algunos datos del cliente para introducirlos en el listado */
include('conexion.php');
$matricula = $_POST['matricula'];
$query = "SELECT matricula, color, modelo, marca from clientes where matricula = '$matricula'";
$resultado = mysqli_query($conexion,$query);

if(!$resultado){
    die("query fallida");
};

while ($row = mysqli_fetch_array($resultado)) {
        
    $json = array(
        'matricula' => $row['matricula'],
        'marca' => $row['marca'],
        'modelo' => $row['modelo'],
        'color' => $row['color']
    );
};

$jsonstring= json_encode($json);
echo $jsonstring;


?>