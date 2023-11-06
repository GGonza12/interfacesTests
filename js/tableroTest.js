"use strict";

document.addEventListener("DOMContentLoaded", function () {
    let canvasWidth = 1920;
    let canvasHeight = 1080;
    let limiteWidth = 7;
    let limiteHeight = 6;
    let juegoWidth = 800;
    let juegoHeight = 600;
    let maximoFichas = 8;
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    let huecos = [];
    let fichas = [];
    let lastClickedFigure = null;
    let isMouseDown = false;

    let imgFichas = ["./images/paginaJuego/TT1.png",
        "./images/paginaJuego/TT2.png",
        "./images/paginaJuego/TT3.png",
        "./images/paginaJuego/TT4.png",
        "./images/paginaJuego/CT1.png",
        "./images/paginaJuego/CT2.png",
        "./images/paginaJuego/CT3.png",
        "./images/paginaJuego/CT4.png"];
    function probarTablero() {

        addRectanguloFondo();
        addRectanguloJuego();
        addRectangulo(canvasWidth / 7, 100, 150, 700, "#5d79ae");
        addRectangulo(1500, 100, 150, 700, "#413a27");
        generarHuecos();
        dibujarHuecos();
        generarFichas();
        dibujarFichas();
        //  let ruta = "./images/paginaJuego/CT1.png";
        //  addFicha((canvasWidth/7)+75,y-150,(40),ruta);
        //  fichas[0].drawImage();

    };

    function generarHuecos(){
        let y = (canvasHeight / 5) + 60;
        //let y= (juegoWidth/5)+20;
        // addFicha(500,y,(((juegoWidth/2)/7)-15),ruta);



        for (let i = 0; i < limiteHeight; i++) {

            let x = (juegoWidth / 2) + 170;
            for (let j = 0; j < limiteWidth; j++) {

                addHueco(x, y, (40), "#101B27", ctx);
                x = (x + ((juegoWidth) / 7) - 10);
            };
            y = y + (juegoHeight / 7) + 10;

        };
        
    }

    function dibujarHuecos(){
        for (let c = 0; c < huecos.length; c++) {
            huecos[c].draw();
        }
    }

    function addRectangulo(x, y, width, height, color) {
        
        ctx.fillStyle = color;
        ctx.fillRect(x,y,width,height);

    };
    function addRectanguloFondo() {
        ctx.fillStyle = "#101B27";
        ctx.fillRect(0,0,canvasWidth,canvasHeight);

    };
    function addRectanguloJuego() {
        ctx.fillStyle = "#273849";
        ctx.fillRect((canvasWidth / 4), canvasHeight / 5, juegoWidth, juegoHeight);
    };
    function addHueco(posX, posY, radio, color) {
        let circulo = new Circulo(posX, posY, radio, color, ctx);
        huecos.push(circulo);
    };

    function addFicha(posX, posY, radio, imgRuta) {
        //  ct1.src = "./images/paginaJuego/CT1.png";
        let ficha = new Circulo(posX, posY, radio, imgRuta, ctx);
        fichas.push(ficha);

    };

  

    function generarFichas(){
       // clearCanvas();
        let y = 880;
        let yFicha = y;
        const min = 4;
        const max = 7;
        for (let f = 0; f < maximoFichas; f++) {
            if(f<maximoFichas/2){
                let ruta = imgFichas[Math.round(Math.random() * 3)];
                addFicha(350, yFicha - 150, (40), ruta);
            }
            else {
                if(f==maximoFichas/2){
                    yFicha = y;
                }
                let imgCT = Math.floor(Math.random() * (max-min + 1)+min);
                let ruta = imgFichas[imgCT];
               
                addFicha(1578, yFicha - 150, (40), ruta);
            }       
            yFicha = yFicha -100;

        };
       
       
    };
    function dibujarFichas(){
        clearCanvas();
         for(let i=0;i<fichas.length;i++){
            fichas[i].drawImage();
         };
    }


    function onMouseDown(e){
        isMouseDown = true;
        if(lastClickedFigure != null) {
            lastClickedFigure.setResaltado(false);
            lastClickedFigure = null;

        }
        
        let clickFig = findClickedFigure(e.offsetX,e.offsetY);
        if (clickFig != null){
            clickFig.setResaltado(true);
            lastClickedFigure = clickFig;

            
        }
        dibujarFichas();

    }

    function findClickedFigure(x,y){
        for(let i=0;i< fichas.length;i++){
            const element = fichas[i];
            if(element.isPointInside(x,y)){
                return element;
            }
        }
    }

    function onMouseMove(e){
        if(isMouseDown && lastClickedFigure!=null){
            lastClickedFigure.setPosition(e.offsetX,e.offsetY);
            dibujarFichas();
        }
    }
    function clearCanvas(){
        addRectanguloFondo();
        addRectanguloJuego();
        addRectangulo(canvasWidth / 7, 100, 150, 700, "#5d79ae");
        addRectangulo(1500, 100, 150, 700, "#413a27");
        dibujarHuecos();
    };
    function onMouseUp(){
        isMouseDown = false;
    };
    probarTablero();
    canvas.addEventListener("mousedown",onMouseDown,false);
    canvas.addEventListener("mouseup",onMouseUp,false);
    canvas.addEventListener("mousemove",onMouseMove,false);
}); 