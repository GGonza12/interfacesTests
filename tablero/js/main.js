"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    let lastClickedFigure = null;
    let isMouseDown = false;
    let lastPosX = 856;
    let lastPosY = 349;
    ctx.fillStyle = "#101B27";
    ctx.fillRect(0, 0, 1920, 1080);
    let tablero = new Tablero(500, 500, 7, 6, "#273849", ctx);
    let jugador1 = new Jugador("simon");
    let jugador2 = new Jugador("ramon");
    let juego = new Juego(ctx);
    let fichasEnTablero = 0;
    juego.setJugadores(jugador1, jugador2);
    juego.setTablero(tablero);
    juego.empezarJuego();
    juego.setTurnoJugador(jugador1);
   /* setTimeout(function () {
        nuevoJuego();
    }, 5000); */


    function nuevoJuego() {
        ctx.fillStyle = "#101B27";
    ctx.fillRect(0, 0, 1920, 1080);
         tablero = new Tablero(500, 500, 7, 6, "#273849", ctx);
        jugador1 = new Jugador("simon");
        jugador2 = new Jugador("ramon");
        juego = new Juego(ctx);
        fichasEnTablero = 0;
        juego.setJugadores(jugador1, jugador2);
        juego.setTablero(tablero);
        juego.empezarJuego();
        juego.setTurnoJugador(jugador1);
    }

    function onMouseDown(e) {
        isMouseDown = true;
        if (lastClickedFigure != null) {
            lastClickedFigure.setResaltado(false);
            lastClickedFigure = null;
        }

        let clickFig = juego.findClickedFicha(e.offsetX, e.offsetY);
        if (clickFig != null && (clickFig.isJugador(juego.getTurnoJugador()))) {
            clickFig.setResaltado(true);
            lastClickedFigure = clickFig;
            lastPosX = clickFig.getPosInicialX();
            lastPosY = clickFig.getPosInicialY();

        }
        clearCanvas();
        juego.dibujarFichas();

    }

    function onMouseUp(e) {
        isMouseDown = false;
        let clickRect = juego.findClickedRect(e.offsetX, e.offsetY);
        console.log(clickRect);
        if (clickRect == null) {

            lastClickedFigure.setPosition(lastPosX, lastPosY);
            console.log(clickRect);
            clearCanvas();
            juego.dibujarFichas();
        }
        if (clickRect != null) {
            juego.putFichaMatrix(clickRect, lastClickedFigure);
            if ((fichasEnTablero + 1) == tablero.getFichasColocas()) {

                if (juego.getTurnoJugador() === jugador1) {
                    juego.setTurnoJugador(jugador2);
                    console.log("Turno del jugador " + juego.getTurnoJugador().getNombre());
                }
                else {
                    juego.setTurnoJugador(jugador1);
                    console.log("Turno del jugador " + juego.getTurnoJugador().getNombre());

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
    function clearCanvas() {
        ctx.fillStyle = "#101B27";
        ctx.fillRect(0, 0, 1920, 1080);
        juego.clearCanvastest();
    }


    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mousemove", onMouseMove, false);
}); 