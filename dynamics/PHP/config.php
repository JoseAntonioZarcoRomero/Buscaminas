<?php
    //Constantes con valores necesarias para la conexion
    define("DBHOST","localhost");//host o ip del servidor de la base de datos
    define("DBUSER","root");//usuario para la base de datos
    define("PASSWORD","");//contraseña del usuario
    define("DB","buscaminas");//nombre de la Base de datos

    //Función para la conexion que me va a ayudar a usarla en los demás archivos
    function connect(){
        //funcion que conecta php con mysql
        $conexion = mysqli_connect(DBHOST,DBUSER,PASSWORD,DB);
        //compruebo que haya conexion
        if(!$conexion){
            mysqli_error();
            echo "No se pudo conectar a la base";
        }
        //regreso la variable que tiene la conexion
        return $conexion;
    }
?>