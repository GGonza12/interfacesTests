class Tablero {
    constructor (posX,posY,cantHorizontal,cantVertical,fill,ctx){
        this.posX= posX;
        this.posY = posY;
        this.cantHorizontal = cantHorizontal;// 7
        this.cantVertical= cantVertical;// 6
        this.tipoJuego = this.cantHorizontal-3;
        this.fill = fill;
        this.ctx = ctx;
        this.huecos=[];
        this.juegoWidth = ((40*2)*cantHorizontal)+40; // 40*2 es el radio*2 del hueco
        this.juegoHeight = ((40*2)*cantVertical)+20;
    }

    generarTablero(){
        this.ctx.fillStyle = this.fill;
        this.ctx.fillRect(this.posX, this.posY, this.juegoWidth, this.juegoHeight);

    }

    generarHuecos(){
        let y = (canvasHeight / 5) + 60;
        //let y= (juegoWidth/5)+20;
        // addFicha(500,y,(((juegoWidth/2)/7)-15),ruta);



        for (let i = 0; i < limiteHeight; i++) {

            let x = (this.juegoWidth / 2) + 170;
            for (let j = 0; j < limiteWidth; j++) {
                let circulo = new Circulo(x, y, 40, "#101B27", this.ctx);
                this.huecos.push(circulo);
                x = (x + ((this.juegoWidth) / 7) - 10);
            };
            y = y + (this.juegoHeight / 7) + 10;

        };
    }

    dibujarHuecos(){
        for (let c = 0; c < huecos.length; c++) {
            huecos[c].draw();
        }
    }

    

}