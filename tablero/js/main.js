"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    let canvasWidth= 1920;
    let canvasHeight= 1080;
    let lastClickedFigure = null;
    let isMouseDown = false;
    let lastPosX = 856;
    let lastPosY = 349;
    let timerId;
    ctx.fillStyle = "#101B27";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    let tablero = new Tablero(500, 500, 7, 6, "#273849", ctx);
    let jugador1 = new Jugador("Jugador 1");
    let jugador2 = new Jugador("Jugador 2");
    let juego = new Juego(ctx);
    let fichasEnTablero = 0;
    juego.setJugadores(jugador1, jugador2);
    juego.setTablero(tablero);
    juego.empezarJuego();
    juego.setTurnoJugador(jugador1);
    timeOut(7,6);


    function timeOut(width, height) {
        // Si ya existe un temporizador, lo cancelamos
        if (timerId) {
            clearTimeout(timerId);
        }
        // Establecemos un nuevo temporizador
        timerId = setTimeout(function () {
            alert("Se acabo el tiempo");
            nuevoJuego(width, height);
        }, 360000);
    }

    function nuevoJuego(width,height) {
        ctx.fillStyle = "#101B27";
        ctx.fillRect(0, 0, 1920, 1080);
        tablero = new Tablero(500, 500, width,height, "#273849", ctx);
        jugador1 = new Jugador("Jugador 1");
        jugador2 = new Jugador("Jugador 2");
        juego = new Juego(ctx);
        fichasEnTablero = 0;
        juego.setJugadores(jugador1, jugador2);
        juego.setTablero(tablero);
        juego.empezarJuego();
        juego.setTurnoJugador(jugador1);
        timeOut(width,height);
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
        if (clickRect == null) {
            if(lastClickedFigure!=null){
                lastClickedFigure.setPosition(lastPosX, lastPosY);

            }
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
                revisarJuego();
                clearCanvas();
            juego.dibujarFichas();

            }
        }
    };
    function revisarJuego(){
        let nombreJugador = tablero.revisarGanador();
        if(nombreJugador!=null){
            alert("El ganador es: "+ nombreJugador);
            nuevoJuego(tablero.getWidthHuecos(),tablero.getHeightHuecos());
        }
    }
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

    function cantLinea(width,height){
        console.log("test");
    nuevoJuego(width,height);
    }

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mousemove", onMouseMove, false);
    document.querySelector("#linea4").addEventListener("click", function() { cantLinea(7,6) }, false);
    document.querySelector("#linea5").addEventListener("click", function() { cantLinea(8,7) }, false);
    document.querySelector("#linea6").addEventListener("click", function() { cantLinea(9,8) }, false);
    document.querySelector("#linea7").addEventListener("click", function() { cantLinea(10,9) }, false);
}); 