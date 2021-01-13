<?php

 $user = $_POST['user'];
 $pass = $_POST['pass'];
 
 if(!empty($user) && !empty($pass)){ 
    include('conexion.php');
    $query= "SELECT user, pass from usuarios where user = '$user' and pass = '$pass'";
    $resultado = mysqli_query($conexion, $query) or die('Error en la consulta');

    echo $resultado->num_rows; 

    
 }


?>