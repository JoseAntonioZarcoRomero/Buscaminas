<?php
    //incluye la configuracion de mysql
    include ("./config.php");
    $conexion = connect();

    $vModo = (isset($_COOKIE["vModo"]) && $_COOKIE["vModo"] != "") ? $_COOKIE["vModo"] : false;
    $puntajeSegundos = (isset($_COOKIE["puntajeSegundos"]) && $_COOKIE["puntajeSegundos"] != "") ? $_COOKIE["puntajeSegundos"] : false;
    $date = (isset($_COOKIE["date"]) && $_COOKIE["date"] != "") ? $_COOKIE["date"] : false;
    $user = (isset($_COOKIE["user"]) && $_COOKIE["user"] != "") ? $_COOKIE["user"] : false;

    //Lleno tabla puntaje
    $peticion1 = "INSERT INTO puntaje (tiempo,fecha,modo_id) VALUES ($puntajeSegundos,'$date',$vModo)";
    $query1 = mysqli_query($conexion,$peticion1);
    if($query1 === true){//Los Datos se Subieron Correctamente
        $peticionVer = "SELECT*FROM puntaje WHERE fecha='$date'";
        $queryVer = mysqli_query($conexion, $peticionVer);
        while($row = mysqli_fetch_array($queryVer,MYSQLI_NUM)){
            $puntaje_id = $row[0];
        }
        //Lleno tabla usuario
        $peticion2 = "INSERT INTO usuario (usuario,puntaje_id) VALUES ('$user',$puntaje_id)";
        $query2 = mysqli_query($conexion,$peticion2);
        if($query2 === true){//Los Datos se Subieron Correctamente
            echo "<h1>Los Datos se Subieron Correctamente</h1>";
        }else{//Fallo al Subir los datos
            echo "<h1>Fallo al Subir los datos</h1>";
        }
    }else{//Fallo al Subir los datos
        echo "<h1>Fallo al Subir los datos</h1>";
    }
?>