class Tablero {
    constructor(posX, posY, cantHorizontal, cantVertical, fill, ctx) {
        this.posX = posX;
        this.posY = posY;
        this.cantHorizontal = cantHorizontal;// 7
        this.cantVertical = cantVertical;// 6
        this.tipoJuego = this.cantHorizontal - 3;
        this.fill = fill;
        this.ctx = ctx;
        this.huecos = new Array();
        this.juegoWidth = ((100) * cantHorizontal) + 40; // 40*2 es el radio*2 del hueco
        this.juegoHeight = ((100) * cantVertical) + 20;
        this.putFicha = new Array();
        this.matrix = new Array();
    }

    generarTablero() {
        // this.ctx.fillStyle = this.fill;
        // this.ctx.fillRect(this.posX, this.posY, this.juegoWidth, this.juegoHeight);
        this.generarHuecos();
        this.dibujarHuecos();

    }
    dibujarTablero() {
        this.generarRectangulos();
        this.dibujarHuecos();
    }
    getPutFicha() {
        return this.putFicha;
    }

    generarRectangulos() {
        this.putFicha = [];
        let y = (600 / 5) + 60;
        let yAux = y - 100;
        let xAux = (this.posX + 60);
        for (let c = 0; c < this.cantHorizontal; c++) {
            let rectangulo = new Rectangulo(xAux - 50, yAux - 50, 100, 100, "#EEE8AA", this.ctx);
            rectangulo.draw();
            xAux = (xAux + 100);
            //console.log(xAux);
            this.putFicha.push(rectangulo);
        }

        for (let i = 0; i < this.cantVertical; i++) {
            let x = (this.posX + 60);
            for (let j = 0; j < this.cantHorizontal; j++) {
                let rectangulo = new Rectangulo(x - 50, y - 50, 100, 100, this.fill, this.ctx);
                rectangulo.draw();
                x = (x + 100);
            };
            y = y + 100;

        };
    }
    generarHuecos() {
        let y = (600 / 5) + 60;
        let yAux = y - 100;
        let xAux = (this.posX + 60);
        for (let c = 0; c < this.cantHorizontal; c++) {

            let rectangulo = new Rectangulo(xAux - 50, yAux - 50, 100, 100, "#EEE8AA", this.ctx);
            rectangulo.draw();

            xAux = (xAux + 100);
            //console.log(xAux);
            this.putFicha.push(rectangulo);
        }

        for (let i = 0; i < this.cantVertical; i++) {
            this.huecos[i] = new Array(this.cantVertical);
            let x = (this.posX + 60);
            for (let j = 0; j < this.cantHorizontal; j++) {
                let rectangulo = new Rectangulo(x - 50, y - 50, 100, 100, this.fill, this.ctx);
                rectangulo.draw();
                let circulo = new Circulo(x, y, 40, "#101B27", this.ctx);
                this.huecos[i][j] = circulo;
                x = (x + 100);
            };
            y = y + 100;

        };
    }

    dibujarHuecos() {
        for (let i = 0; i < this.cantVertical; i++) {
            for (let c = 0; c < this.cantHorizontal; c++) {
                this.huecos[i][c].draw();
            }
        }
    }
    getWherePutMatrix(x, ficha) {
        for (let i = 0; i < this.cantVertical; i++) {
            for (let c = 0; c < this.cantHorizontal; c++) {

               /* if ((this.huecos[i][x] instanceof Ficha)||(this.huecos[i][x] == this.huecos[this.cantVertical - 1][x] )) {
                    let test = this.huecos[i][x];
                    ficha.setPosition(test.getPosX(), test.getPosY());
                    this.setFichaTablero(ficha, i, x);

                }*/
                if ((this.huecos[i][x] != this.huecos[this.cantVertical - 1][x] )) {
                  //  if(this.huecos[i+1][x] instanceof Ficha){
                    if(Ficha.prototype.isPrototypeOf(this.huecos[i+1][x])){
                        let test = this.huecos[i-1][x];
                        console.log(Ficha.prototype.isPrototypeOf(this.huecos[i+1][x]));
                        console.log(Ficha.prototype.isPrototypeOf(this.huecos[i-1][x]));
                        console.log(Ficha.prototype.isPrototypeOf(this.huecos[i][x]));
                        ficha.setPosition(test.getPosX(), test.getPosY());
                        this.setFichaTablero(ficha, i-1, x);

                    }

                }
                else if ((this.huecos[i][x] == this.huecos[this.cantVertical - 1][x] )){
                    let test = this.huecos[i][x];
                    ficha.setPosition(test.getPosX(), test.getPosY());
                    this.setFichaTablero(ficha, i, x);
                }
            }
        }

        // for(let x=0; x <this.cantHorizontal;x++){
        //     console.log(this.huecos[x][i]);
        //     let test= this.huecos[x][i];
        //     if(!(this.huecos[x][i]===Ficha)){
        //         ficha.setPosition(test.getPosX(),test.getPosY());
        //         this.huecos[x][i] = ficha;
        //         console.log("test"); 
        //     }
        // }
        console.log(this.huecos);

    }
    setFichaTablero(ficha, y, x) {
        this.huecos[y][x] = ficha;
    }

    getMaxFichas() {
        return this.cantHorizontal * this.cantVertical;
    }
}