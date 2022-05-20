<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ranking de puntajes</title>
        <link rel="shortcut icon" href="../../statics/img/copa.ico" type="image/x-icon">
        <link rel="stylesheet" href="../../statics/styles/styles.css">
    </head>
    <body>
        <h1 class='title'>M e j o r e s  T i e m p o s</h1>
        <h2 class='title'>Tablero fácil</h2>
            <table align='center' border='1' cellpadding=10px class="blanco">
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
                        $i=0;
                        include("./config.php");
                        $conexion = connect();
                        $peticion = "SELECT*FROM usuario NATURAL JOIN puntaje ORDER BY tiempo ASC";
                        $query = mysqli_query($conexion, $peticion);
                        while($row = mysqli_fetch_array($query,MYSQLI_NUM)){
                            if($row[5]==1){
                                $i++;
                                echo "
                                    <tr>
                                        <td>$i</td>
                                        <td>$row[2]</td>
                                        <td>$row[3] segundo(s)</td>
                                        <td>$row[4]</td>
                                    </tr>
                                ";
                            } else {
                                while($i==0){
                                    echo "
                                        <tr>
                                            <td colspan='4'>No hay puntajes en este modo</td>
                                        </tr>
                                    ";
                                    $i++;
                                }
                            }
                        }
                    ?>
                </tbody>
            </table>
        <br><h2 class='title'>Tablero medio</h2>
            <table align='center' border='1' cellpadding=10px class="blanco">
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
                        $i=0;
                        $peticion = "SELECT*FROM usuario NATURAL JOIN puntaje ORDER BY tiempo ASC";
                        $query = mysqli_query($conexion, $peticion);
                        while($row = mysqli_fetch_array($query,MYSQLI_NUM)){
                            if($row[5]==2){
                                $i++;
                                echo "
                                    <tr>
                                        <td>$i</td>
                                        <td>$row[2]</td>
                                        <td>$row[3] segundo(s)</td>
                                        <td>$row[4]</td>
                                    </tr>
                                ";
                            } else {
                                while($i==0){
                                    echo "
                                        <tr>
                                            <td colspan='4'>No hay puntajes en este modo</td>
                                        </tr>
                                    ";
                                    $i++;
                                }
                            }
                        }
                    ?>
                </tbody>
            </table>
        <br><h2 class='title'>Tablero difícil</h2>
            <table align='center' border='1' cellpadding=10px class="blanco">
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
                        $i=0;
                        $peticion = "SELECT*FROM usuario NATURAL JOIN puntaje ORDER BY tiempo ASC";
                        $query = mysqli_query($conexion, $peticion);
                        while($row = mysqli_fetch_array($query,MYSQLI_NUM)){
                            if($row[5]==3){
                                $i++;
                                echo "
                                    <tr>
                                        <td>$i</td>
                                        <td>$row[2]</td>
                                        <td>$row[3] segundo(s)</td>
                                        <td>$row[4]</td>
                                    </tr>
                                ";
                            } else {
                                while($i==0){
                                    echo "
                                        <tr>
                                            <td colspan='4'>No hay puntajes en este modo</td>
                                        </tr>
                                    ";
                                    $i++;
                                }
                            }
                        }
                    ?>
                </tbody>
            </table>
        <form action='../../index.html' method='post' target='_self'>
            <button class='boton'>Regresar al menú</button>
        </form>
    </body>
</html>