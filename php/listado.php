<?php
include('conexion.php');

$query = "SELECT * from parking";



$registros = mysqli_query($conexion,$query);

if(!$registros){
    die("query fallida");
}

$json= array();

    while ($row = mysqli_fetch_array($registros)) {
        
        $json[] = array(
            'matricula' => $row['matricula'],
            'marca' => $row['marca'],
            'modelo' => $row['modelo'],
            'color' => $row['color']
        );
    };

    $jsonstring= json_encode($json);
    echo $jsonstring;


?>