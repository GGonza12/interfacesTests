"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    let lastClickedFigure = null;
    let isMouseDown = false;
    let lastPosX = 856;
    let lastPosY=349;
    ctx.fillStyle = "#101B27";
    ctx.fillRect(0, 0, 1920, 1080);
    let tablero = new Tablero(500, 500, 7, 6, "#273849", ctx);
    let jugador1 = new Jugador("simon");
    let jugador2 = new Jugador("ramon");
    let juego = new Juego(ctx);
    let turnoJugador = jugador1;
    let fichasEnTablero = 0;
    juego.setJugadores(jugador1, jugador2);
    juego.setTablero(tablero);
    juego.empezarJuego();


   

    function onMouseDown(e) {
        isMouseDown = true;
        if (lastClickedFigure != null) {
            lastClickedFigure.setResaltado(false);
            lastClickedFigure = null;

        }

        let clickFig = juego.findClickedFicha(e.offsetX, e.offsetY);
        if (clickFig != null && (clickFig.isJugador(turnoJugador))) {
            clickFig.setResaltado(true);
            console.log(clickFig);
            lastClickedFigure = clickFig;
            lastPosX= clickFig.getPosInicialX();
            lastPosY= clickFig.getPosInicialY();

        }
        clearCanvas();
       juego.dibujarFichas();

    }

    function onMouseUp(e) {
        isMouseDown = false;
        let clickRect = juego.findClickedRect(e.offsetX, e.offsetY);
        if(clickRect==null){
            
            lastClickedFigure.setPosition(lastPosX,lastPosY);
            console.log(clickRect);
            clearCanvas();
            juego.dibujarFichas();
        }
        if(clickRect!=null)
        {
            juego.putFichaMatrix(clickRect,lastClickedFigure);
            if((fichasEnTablero+1) == tablero.getFichasColocas){
                
                if(turnoJugador === jugador2){
                    turnoJugador= jugador1;
                    console.log("dejame jugar");
                }
                else{
                    turnoJugador= jugador2;
                   
                }
                fichasEnTablero++;
            }
        }
    };

    function onMouseMove(e) {

        if (isMouseDown && lastClickedFigure != null) {
            lastClickedFigure.setPosition(e.offsetX, e.offsetY);
            clearCanvas();
            juego.dibujarFichas();
        }
    }
    function clearCanvas(){
        ctx.fillStyle = "#101B27";
        ctx.fillRect(0, 0, 1920, 1080);
        juego.clearCanvastest();
    }


    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mousemove", onMouseMove, false);
}); 