"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#101B27";
    ctx.fillRect(0,0,1920,1080);
    let tablero1 = new Tablero( 200,100,7,6,"#273849",ctx);
    tablero1.generarTablero();
}); 