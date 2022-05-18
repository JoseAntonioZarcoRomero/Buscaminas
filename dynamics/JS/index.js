const buscaminas = {
    mTotales: 10,
    mEncontradas: 0,
    nfilas: 8,
    ncolumnas: 8,
    mCampo: []
}
/*Pinta el tablero
------------------------------------------------------------------------------------------*/
function pintarTablero(){
    //Obtenemos del HTML el objeto tablero
    let tablero = document.querySelector("#tablero");
    //Actualiza variables del CSS
    document.querySelector("html").style.setProperty("--nfilas",buscaminas.nfilas);
    document.querySelector("html").style.setProperty("--ncolumnas",buscaminas.ncolumnas);
    //En caso de existir, borra el tablero actual
    while (tablero.firstChild) {
        tablero.firstChild.removeEventListener("contextmenu",bandera);
        tablero.firstChild.removeEventListener("click",abrir);
        tablero.removeChild(tablero.firstChild);
    }
    //Crea las casillas (a partir de las filas y columnas del objeto)
    for(let f=0; f < buscaminas.nfilas; f++){
        for(let c=0; c < buscaminas.ncolumnas; c++){
            let newDiv = document.createElement("div");//Creación del elemento
            newDiv.setAttribute("id","f" + f + "_c" + c );//Establece id al elemento
            newDiv.dataset.fila = f;
            newDiv.dataset.columna = c;
            newDiv.addEventListener("contextmenu",bandera);
            newDiv.addEventListener("click",abrir);
            tablero.appendChild(newDiv);//Agrega el elemento al final de la lista
        }
    }
}
/*Crea matriz para el tablero
------------------------------------------------------------------------------------------*/
//Genera matriz sin minas
function mMatriz(){
    buscaminas.mCampo = new Array(buscaminas.nfilas);//crea arreglo según el #filas
    for (let fila=0; fila < buscaminas.nfilas; fila++){
        //crea un arreglo en cada índice del arreglo anterior, según el #columnas
        buscaminas.mCampo[fila] = new Array(buscaminas.ncolumnas);
    }
}
//Genera numeros aleatorios dentro del rango min-max
function nrand(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}
//Coloca minas aleatoriamente en la matriz del tablero
function mEsparcidas(){
    let mColocadas = 0;
    while (mColocadas < buscaminas.mTotales){
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
/*Funciones de eventos
------------------------------------------------------------------------------------------*/
//Evento clic derecho
function bandera(evento){
    if (evento.type === "contextmenu"){
        let casillaClickeada = evento.currentTarget;//Obtiene el elemento que ha disparado el evento
        evento.stopPropagation();//Detiene bubbling
        evento.preventDefault();//No mostrar menú del navegador
        //Obtiene los datos de las propiedades dataset (string -> número)
        let fila = parseInt(casillaClickeada.dataset.fila,10);
        let columna = parseInt(casillaClickeada.dataset.columna,10);
        //Verifica que la casilla este dentro del tablero
        if (fila>=0 && columna>=0 && fila< buscaminas.nfilas && columna < buscaminas.ncolumnas) {
            if (casillaClickeada.classList.contains("flag")){
               casillaClickeada.classList.remove("flag");
                buscaminas.mEncontradas--;
            } else if (casillaClickeada.classList.length == 0){
                casillaClickeada.classList.add("flag");
                buscaminas.mEncontradas++;
                if (buscaminas.mEncontradas == buscaminas.mTotales){
                    resolverTablero(true);//Resuelve el tablero para ver si esta bien
                }
            }
            mRestantes(); //Actualiza el contador del número de minas restantes
        }
    }
}
//Evento clic izquierdo
function abrir(evento){
    if (evento.type === "click"){
        let casilla = evento.currentTarget;//Obtiene el elemento que ha disparado el evento
        evento.stopPropagation();//Detiene bubbling
        evento.preventDefault();//No mostrar menú del navegador
        //Obtiene los datos de las propiedades dataset (string -> número)
        let fila = parseInt(casilla.dataset.fila,10);
        let columna = parseInt(casilla.dataset.columna,10);
        abrirCasilla(fila,columna);
    }
}
function abrirCasilla(fila, columna){
    //Verifica que la casilla este dentro del tablero
    if (fila >-1 && fila < buscaminas.nfilas && columna >-1 && columna < buscaminas.ncolumnas){
        //Obtiene la casilla con la fila y columna
        let casilla = document.querySelector("#f" + fila + "_c" + columna);
        if (!casilla.classList.contains("abierta")){
            if (!casilla.classList.contains("flag")){
                casilla.classList.add("abierta");
                //Coloca en la casilla el número de minas que tiene alrededor
                casilla.innerHTML = buscaminas.mCampo[fila][columna];
                //Actualiza variables del CSS
                casilla.classList.add("c" + buscaminas.mCampo[fila][columna])
                if (buscaminas.mCampo[fila][columna] != "M"){
                    //Abre las casillas contiguas
                    if (buscaminas.mCampo[fila][columna] == 0){//Recursivo
                        abrirCasilla(fila-1,columna-1);
                        abrirCasilla(fila-1,columna);
                        abrirCasilla(fila-1,columna+1);
                        abrirCasilla(fila,columna-1);
                        abrirCasilla(fila,columna+1);
                        abrirCasilla(fila+1,columna-1);
                        abrirCasilla(fila+1,columna);
                        abrirCasilla(fila+1,columna+1);
                    }
                }else if (buscaminas.mCampo[fila][columna] == "M"){
                    casilla.innerHTML = "";
                    casilla.classList.add("mina");//Diuja mina
                    casilla.classList.add("sinmarcar");
                    resolverTablero(false);//Resuelve el tablero indicando que perdimos
                }
            }
        }
    }
}
function resolverTablero(ganarOperder){
    let aCasillas = tablero.children;
    for (let i = 0 ; i < aCasillas.length; i++){
        aCasillas[i].removeEventListener("click", abrir);
        aCasillas[i].removeEventListener("contextmenu", bandera);
        //Obtiene la casilla con la fila y columna
        let fila = parseInt(aCasillas[i].dataset.fila,10);
        let columna = parseInt(aCasillas[i].dataset.columna,10);
        if (aCasillas[i].classList.contains("flag")){
            if (buscaminas.mCampo[fila][columna] == "M"){//Bandera correcta
                aCasillas[i].classList.add("abierta");
                aCasillas[i].classList.remove("flag");
                aCasillas[i].classList.add("mina");
            } else {//Bandera errónea
                aCasillas[i].classList.add("abierta");
                aCasillas[i].classList.add("NOflag");
                ganarOperder = false;
            }
        } else if (!aCasillas[i].classList.contains("abierta")){
            if (buscaminas.mCampo[fila][columna] == "M"){//destapamos el resto de las minas
                aCasillas[i].classList.add("abierta");
                aCasillas[i].classList.add("mina");
            }
        }
    }
    if (ganarOperder == true){
        alert("Ganaste");
    } else {
        alert("Perdiste");
    }
}
//Contador del número de minas restantes
function mRestantes(){
    document.querySelector("#numMinasRestantes").innerHTML = (buscaminas.mTotales - buscaminas.mEncontradas);
}
function inicio(numFilas,numColumnas,totMinas){
    buscaminas.nfilas = numFilas;
    buscaminas.ncolumnas = numColumnas;
    buscaminas.mTotales = totMinas;
    pintarTablero();
    mMatriz();
    mEsparcidas();
    contarMinas();
    mRestantes();
}

const modalidad = document.getElementById("contModalidad");
const juego = document.getElementById("juego");
const returnInicio = document.getElementById("btn-returnInicio");
modalidad.addEventListener("click", (event)=>{
    const modalidadClickeada = event.target;
    if(modalidadClickeada.id == 'btn-facil'){
        inicio(8,8,10);
    } else if(modalidadClickeada.id == 'btn-medio'){
        inicio(16,16,40);
    } else if(modalidadClickeada.id == 'btn-dificil'){
        inicio(24,24,99);
    }
    modalidad.style.display = "none";
    juego.style.display = "block";
    returnInicio.style.display = "block";
});
returnInicio.addEventListener("click", ()=>{
    modalidad.style.display = "block";
    juego.style.display = "none";
    returnInicio.style.display = "none";
});