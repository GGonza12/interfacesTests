"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    let lastClickedFigure = null;
    let isMouseDown = false;
    ctx.fillStyle = "#101B27";
    ctx.fillRect(0, 0, 1920, 1080);
    let tablero = new Tablero(500, 500, 7, 6, "#273849", ctx);
    let jugador1 = new Jugador("simon");
    let jugador2 = new Jugador("ramon");
    let juego = new Juego(ctx);
    juego.setJugadores(jugador1, jugador2);
    juego.setTablero(tablero);
    juego.empezarJuego();


   

    function onMouseDown(e) {
        isMouseDown = true;
        if (lastClickedFigure != null) {
            lastClickedFigure.setResaltado(false);
            lastClickedFigure = null;

        }

        let clickFig = juego.findClickedFigure(e.offsetX, e.offsetY);
        if (clickFig != null) {
            console.log("funciona");
            clickFig.setResaltado(true);
            lastClickedFigure = clickFig;


        }
        clearCanvas();
       juego.dibujarFichas();

    }

    function onMouseUp() {
        isMouseDown = false;
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