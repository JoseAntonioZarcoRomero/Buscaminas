const buscaminas = {
    mTotales: 10,
    mEncontradas: 0,
    nfilas: 8,
    ncolumnas: 8,
    mCampo: []
};
/*Pinta el tablero
------------------------------------------------------------------------------------------*/
function pintarTablero(){
    //Obtenemos del HTML el objeto tablero
    const tablero = document.querySelector("#tablero");

    //Actualiza variables del CSS
    document.querySelector("html").style.setProperty("--nfilas",buscaminas.nfilas);
    document.querySelector("html").style.setProperty("--ncolumnas",buscaminas.ncolumnas);

    //En caso de existir, borra el tablero actual
    while (tablero.firstChild) {
        tablero.firstChild.removeEventListener("click", color);
        tablero.firstChild.removeEventListener("click", abrir);
        tablero.firstChild.removeEventListener("contextmenu", bandera);
        tablero.removeChild(tablero.firstChild);
    }

    //Crea las casillas (a partir de las filas y columnas del objeto)
    for(let fila=0; fila<buscaminas.nfilas; fila++){
        for(let columna=0; columna<buscaminas.ncolumnas; columna++){
            //Creación del elemento
            const casilla = document.createElement("div");

            //Establece id al elemento
            casilla.setAttribute("id", fila + "_" + columna );

            //Evento pasar el mouse encima del elemento
            casilla.addEventListener("mouseover", color);
            
            //Evento clic izquierdo
            casilla.addEventListener("click", abrir);

            //Evento clic derecho
            casilla.addEventListener("contextmenu", bandera);

            //Agrega el elemento al final de la lista
            tablero.appendChild(casilla);
        }
    }
}
/*Crea matriz para el tablero
------------------------------------------------------------------------------------------*/
//Genera matriz sin minas
function generarCampoVacio(){
    buscaminas.mCampo = new Array(buscaminas.nfilas);//crea arreglo según el #filas
    for (let fila=0; fila<buscaminas.nfilas; fila++){
        //crea un arreglo en cada índice del arreglo anterior, según el #columnas
        buscaminas.mCampo[fila] = new Array(buscaminas.ncolumnas);
    }
}
//Genera numeros aleatorios dentro del rango min-max
function nrand(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}
//Coloca minas aleatoriamente en la matriz del tablero
function colocarMinas(){
    let mColocadas = 0;
    //Se ejecuta mientras el numero de minas colocadas se menor que el de las totales
    while(mColocadas<buscaminas.mTotales){
        //No. aleatorio para fila y columna
        let filaRand = nrand(0,buscaminas.nfilas);
        let columnaRand = nrand(0,buscaminas.ncolumnas);
        //Si en esa posición no existe una mina, coloca una
        if(buscaminas.mCampo[filaRand][columnaRand] != "M"){
            buscaminas.mCampo[filaRand][columnaRand] = "M";
            mColocadas++;
        }
    }
}
//Cuenta el #minas que exiten alrededor de la casilla
function mAlrededor(fila,columna){
    let mAlrededor = 0;
    //De la fila anterior a la posterior
    for (let zFila = fila-1; zFila <= fila+1; zFila++){
        //De la columna anterior a la posterior
        for (let zColumna = columna-1; zColumna <= columna+1; zColumna++){
            //Verifica que la casilla este dentro del tablero
            if(zFila>-1 && zFila<buscaminas.nfilas && zColumna>-1 && zColumna<buscaminas.ncolumnas){
                if(buscaminas.mCampo[zFila][zColumna] == "M"){
                    mAlrededor++;
                }
            }
        }
    }
    buscaminas.mCampo[fila][columna] = mAlrededor;
}
//Recorre toda la matriz
function contarMinas(){
    for (let fila=0; fila<buscaminas.nfilas; fila++){
        for (let columna=0; columna<buscaminas.ncolumnas; columna++){
            //Si la casilla no tiene una mina
            if (buscaminas.mCampo[fila][columna] != "M"){
                mAlrededor(fila,columna);
            }
        }
    }
}
/*Funciones a eventos
------------------------------------------------------------------------------------------*/
function color(evento){
    const casillaClickeada =  evento.target;
    // evento.target.style.backgroundcolor = "red";
}
function bandera(evento){
    const casillaClickeada =  evento.target;
    console.log(casillaClickeada);
    evento.stopPropagation();//Detiene bubbling
    evento.preventDefault();//No mostrar menú del navegador
    if(casillaClickeada.classList.contains("icon-flag")){
        casillaClickeada.classList.remove("icon-flag");
        casillaClickeada.classList.add("icon-duda");
        buscaminas.mEncontradas--;
    } else if(casillaClickeada.classList.contains("icon-duda")){
        casillaClickeada.classList.remove("icon-duda");
    } else if (casillaClickeada.classList.length == 0){
        casillaClickeada.classList.add("icon-flag");
        buscaminas.mEncontradas++;
        if(buscaminas.mEncontradas == buscaminas.mTotales){
            buscaminas.resolverTablero(true);
        }
    }
}
function abrir (evento){
    const casillaClickeada =  evento.target;
    let datos = casillaClickeada.id.split("_",2);
    let fila = datos[0];
    let columna = datos[1];
    abreCasilla(fila,columna);
    // let id_casilla = "#"+evento.target.id;
    // let casilla = document.querySelector(id_casilla);
    // console.log(casilla);
    // if(!casilla.contains("open")){
    //     if(!casilla.classList.contains("flag")){
    //         evento.target.classList.add("open");
    //         casilla.innerHTML = buscaminas.mCampo[fila][columna];
    //     }
    // }
}
function abreCasilla(fila,columna){
    console.log("Abrimos la casilla de la fila:"+fila+" y columna:"+columna);
    if (fila>-1 && fila<buscaminas.nfilas && columna>-1 && columna<buscaminas.ncolumnas){
        //let casilla = document.querySelector("#" + fila + "_" + columna);
        let casilla = document.getElementById("#"+fila+"_"+columna);
        if (!casilla.classList.contains("abierta")){
            if (!casilla.classList.contains("icon-flag")){
                casilla.classList.add("abierta");
                casilla.innerHTML = buscaminas.mCampo[fila][columna];
                if (buscaminas.mCampo[fila][columna] != "M"){
                    if (buscaminas.mCampo[fila][columna] == 0){
                        abreCasilla(fila-1,columna-1);
                        abreCasilla(fila-1,columna);
                        abreCasilla(fila-1,columna+1);
                        abreCasilla(fila,columna-1);
                        abreCasilla(fila,columna+1);
                        abreCasilla(fila+1,columna-1);
                        abreCasilla(fila+1,columna);
                        abreCasilla(fila+1,columna+1);
                        casilla.innerHTML  = "";
                    }
                } else if(buscaminas.mCampo[fila][columna] == "M"){
                    casilla.innerHTML = "";
                    casilla.classList.add("icon-bomba");
                    casilla.classList.add("sinmarcar");
                    resolverTablero(false);
                }
            }
        }
    }
}

//Por mientras
function inicio(){
    pintarTablero();
    generarCampoVacio();
    colocarMinas();
    contarMinas();
    console.log(buscaminas.mCampo);
}
window.onload = inicio;