const buscaminas = {
    mTotales: 10,
    mEncontradas: 0,
    nfilas: 8,
    ncolumnas: 8,
    mCampo: []
};

function nrand(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}

function generarCampoVacio(){
    buscaminas.mCampo = new Array(buscaminas.nfilas);
    for (let fila=0; fila<buscaminas.nfilas; fila++){
        buscaminas.mCampo[fila] = new Array(buscaminas.ncolumnas);
    }
    //console.log(buscaminas.mCampo);
}

function colocarMinas(){
    let mColocadas = 0;
    while(mColocadas<buscaminas.mTotales){
        let filaRand = nrand(0,buscaminas.nfilas);
        let columnaRand = nrand(0,buscaminas.ncolumnas);
        if(buscaminas.mCampo[filaRand][columnaRand] != "M"){
            buscaminas.mCampo[filaRand][columnaRand] = "M";
            mColocadas++;
        }
    }
}

function contarMinasAlrededorCasilla(fila,columna){
    let mAlrededor = 0;
    let fAnterior=fila-1, fPosterior=fila+1;
    let cAnterior=columna-1, cPosterior=columna+1;
    for(fAnterior; fAnterior<=fila; fPosterior++){
        for(cAnterior; cAnterior<=fila; cPosterior++){
            if(buscaminas.mCampo[fAnterior][cAnterior]){
                mAlrededor++;
            }
        }
    }
    buscaminas.mCampo[fila][columna] = mAlrededor;
}


function bandera(evento){
    alert("bandera");
}
function abrir (evento){
    alert("abrir");
}
function pintarTablero(){
    const tablero = document.querySelector("#tablero");
    while (tablero.firstChild) {
        tablero.removeChild(tablero.firstChild);
    }
    document.querySelector("html").style.setProperty("--nfilas",buscaminas.nfilas);
    document.querySelector("html").style.setProperty("--ncolumnas",buscaminas.ncolumnas);
    for(let fila=0; fila<buscaminas.nfilas; fila++){
        for(let columna=0; columna<buscaminas.ncolumnas; columna++){
            const casilla = document.createElement("div");
            casilla.setAttribute("id","fila" + fila + "_columna" + columna );
            casilla.addEventListener("contextmenu", bandera);
            casilla.addEventListener("click", abrir);
            tablero.appendChild(casilla);
        }
    }
}