<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ranking de puntajes</title>
        <link rel="stylesheet" href="../statics/styles/styles.css">
    </head>
    <body>
        <h1 class='title'>Mejores tiempos</h1>
        <h2>Tablero fácil</h2>
            <table align='center' border='1' cellpadding=10px>
                <thead>
                    <tr>
                        <th>Lugar</th>
                        <th>Jugador</th>
                        <th>Tiempo para acabar</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        include("./config.php");
                        $conexion = connect();
                        $peticion = "SELECT*FROM usuario NATURAL JOIN puntaje";
                        $query = mysqli_query($conexion, $peticion);
                        while($row = mysqli_fetch_array($query,MYSQLI_NUM)){
                            if($row[5]==1){
                                echo "
                                    <tr>
                                        <td></td>
                                        <td>$row[2]</td>
                                        <td>$row[3] segundo(s)</td>
                                        <td>$row[4]</td>
                                    </tr>
                                ";
                            } else {
                                echo "
                                    <tr>
                                        <td colspan='4'>No hay puntajes en este modo</td>
                                    </tr>
                                ";
                            }
                        }
                    ?>
                </tbody>
            </table>
        <h2>Tablero medio</h2>
            <table align='center' border='1' cellpadding=10px>
                <thead>
                    <tr>
                        <th>Lugar</th>
                        <th>Jugador</th>
                        <th>Tiempo para acabar</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        $peticion = "SELECT*FROM usuario NATURAL JOIN puntaje";
                        $query = mysqli_query($conexion, $peticion);
                        while($row = mysqli_fetch_array($query,MYSQLI_NUM)){
                            if($row[5]==2){
                                echo "
                                    <tr>
                                        <td></td>
                                        <td>$row[2]</td>
                                        <td>$row[3] segundo(s)</td>
                                        <td>$row[4]</td>
                                    </tr>
                                ";
                            } else {
                                echo "
                                    <tr>
                                        <td colspan='4'>No hay puntajes en este modo</td>
                                    </tr>
                                ";
                            }
                        }
                    ?>
                </tbody>
            </table>
        <h2>Tablero difícil</h2>
            <table align='center' border='1' cellpadding=10px>
                <thead>
                    <tr>
                        <th>Lugar</th>
                        <th>Jugador</th>
                        <th>Tiempo para acabar</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        $peticion = "SELECT*FROM usuario NATURAL JOIN puntaje";
                        $query = mysqli_query($conexion, $peticion);
                        while($row = mysqli_fetch_array($query,MYSQLI_NUM)){
                            if($row[5]==3){
                                echo "
                                    <tr>
                                        <td></td>
                                        <td>$row[2]</td>
                                        <td>$row[3] segundo(s)</td>
                                        <td>$row[4]</td>
                                    </tr>
                                ";
                            } else {
                                echo "
                                    <tr>
                                        <td colspan='4'>No hay puntajes en este modo</td>
                                    </tr>
                                ";
                            }
                        }
                    ?>
                </tbody>
            </table>
        <form action='../index.html' method='post' target='_self'>
            <button class='boton'>Regresar al menú</button>
        </form>
    </body>
</html>