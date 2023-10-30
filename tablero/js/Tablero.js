class Tablero {
    constructor (posX,posY,cantHorizontal,cantVertical,fill,ctx){
        this.posX= posX;
        this.posY = posY;
        this.cantHorizontal = cantHorizontal;// 7
        this.cantVertical= cantVertical;// 6
        this.tipoJuego = this.cantHorizontal-3;
        this.fill = fill;
        this.ctx = ctx;
        this.huecos= new Array(this.cantHorizontal);
        this.juegoWidth = ((100)*cantHorizontal)+40; // 40*2 es el radio*2 del hueco
        this.juegoHeight = ((100)*cantVertical)+20;
    }

    generarTablero(){
      // this.ctx.fillStyle = this.fill;
        console.log(this.juegoWidth);
        console.log(this.juegoHeight);
        
       // this.ctx.fillRect(this.posX, this.posY, this.juegoWidth, this.juegoHeight);
        this.generarHuecos();
        this.dibujarHuecos();
        console.log(this.huecos);
    }

    generarHuecos(){
        let y = ( 600/ 5) + 60;
        let yAux=y-100;
        let xAux = (this.posX+60);
        for(let c=0;c<this.cantHorizontal;c++){

            let rectangulo = new Rectangulo(xAux-50,yAux-50,100,100,"#EEE8AA",this.ctx);
            rectangulo.draw();
          
            xAux = (xAux+100);
            console.log(xAux);
        }

        for (let i = 0; i < this.cantVertical; i++) {
            this.huecos[i] = new Array(this.cantVertical);
            let x = (this.posX+60);
            for (let j = 0; j < this.cantHorizontal; j++) {
                let rectangulo = new Rectangulo(x-50,y-50,100,100,this.fill,this.ctx);
                rectangulo.draw();
                let circulo = new Circulo(x, y, 40, "#101B27", this.ctx);
                this.huecos[i][j] = circulo;
                x = (x+100);
            };
            y = y + 100;

        };
    }

    dibujarHuecos(){
        for(let i=0;i<this.cantVertical;i++){
            for (let c = 0; c < this.cantHorizontal; c++) {
                this.huecos[i][c].draw();
            }
        }
    }

    getMaxFichas(){
        return this.cantHorizontal* this.cantVertical;
    }
}