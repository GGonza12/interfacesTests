class Tablero {
    constructor(posX, posY, cantHorizontal, cantVertical, fill, ctx) {
        this.posX = posX;
        this.posY = posY;
        this.cantHorizontal = cantHorizontal;// 7
        this.cantVertical = cantVertical;//Ejemplo de 4 en linea es 7 horizontal y 6 vertical
        this.tipoJuego = this.cantHorizontal - 3;
        this.fill = fill;
        this.ctx = ctx;
        this.huecos = new Array();
        this.juegoWidth = ((100) * cantHorizontal) + 40;
        this.juegoHeight = ((100) * cantVertical) + 20;
        this.putFicha = new Array();
        this.matrix = new Array();
        this.fichasColocadas = 0;
        this.ganador = null;
        this.posXLeft=this.posX;
        this.posYLeft=(600 / 5) +10;
        this.posXRight=(this.juegoWidth+this.posX+50);
    }
    getWidthHuecos(){
        return this.cantHorizontal;
    }
    getHeightHuecos(){
        return this.cantVertical;
    }
    getPosXLeft(){
        return this.posXLeft;
    }
    getPosYLeft(){
        return this.posYLeft;
    }
    getPosXRight(){
        return this.posXRight;
    }
    getPosYRight(){
        return this.posYRight;
    }
    getTamanio() {
        return this.tipoJuego;
    }
    getWidth(){
        return this.juegoWidth;
    }
    getHeight(){
        return this.juegoHeight;
    }
    generarTablero() {
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

        //Cuadrados para indicar donde colocar la ficha
        for (let c = 0; c < this.cantHorizontal; c++) {
            let rectangulo = new Rectangulo(xAux - 50, yAux - 50, 100, 100, "#EEE8AA", this.ctx);
            rectangulo.draw();
            this.drawArrow(xAux,yAux);
            xAux = (xAux + 100);
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

     drawArrow(x, y) {
        x = x-20;
        y= y-30;
        // Dibuja la flecha
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + 40, y);
        this.ctx.lineTo(x + 40, y + 30);
        this.ctx.lineTo(x + 60, y + 30);
        this.ctx.lineTo(x + 20, y + 70);
        this.ctx.lineTo(x - 20, y + 30);
        this.ctx.lineTo(x, y + 30);
        this.ctx.closePath();
      
        // Rellena la flecha
        this.ctx.fillStyle = "black";
        this.ctx.fill();
      }

    generarHuecos() {
        let y = (600 / 5) + 60;
        let yAux = y - 100;
        let xAux = (this.posX + 60);
        for (let c = 0; c < this.cantHorizontal; c++) {

              let rectangulo = new Rectangulo(xAux - 50, yAux - 50, 100, 100, "#EEE8AA", this.ctx);
            rectangulo.draw();
            this.drawArrow(xAux,yAux);

            xAux = (xAux + 100);
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


    getFichasColocas() {
        return this.fichasColocadas;
    }

    getWherePutMatrix(x, ficha) {
        let encontrado = false;
        for (let i = this.cantVertical - 1; i >= 0 && !encontrado; i--) {
            if (!Ficha.prototype.isPrototypeOf(this.huecos[i][x])) {
                let test = this.huecos[i][x];
                ficha.setPosition(test.getPosX(), test.getPosY());
                this.setFichaTablero(ficha, i, x);
                encontrado = true;
                this.fichasColocadas++;
                ficha.setPosXMatrix(x);
                ficha.setPosYMatrix(i);

                if (this.lineaHorizontal(i, ficha.getJugador())) {
                    this.agregarGanador(ficha.getJugador());
                }
                if (this.lineaVertical(ficha.getPosXMatrix(), ficha.getJugador())) {
                    this.agregarGanador(ficha.getJugador());
                }
                if (this.buscarDiagonal(ficha.getJugador())) {
                    this.agregarGanador(ficha.getJugador());

                }
            }
        }
    }
    agregarGanador(jugador) {
        this.ganador = jugador.getNombre();
    }
    revisarGanador() {
        return this.ganador;
    }

    lineaHorizontal(posY, jugador) {
        let contador = 0;
        for (let x = 0; x < this.cantHorizontal; x++) {
            if (Ficha.prototype.isPrototypeOf(this.huecos[posY][x]) && this.huecos[posY][x].isJugador(jugador)) {
                contador++;
                if (contador == this.tipoJuego) {
                    return true;
                }
            } else {
                contador = 0;
            }
        }
        return false;
    }


    lineaVertical(posX, jugador) {
        let contador = 0;
        for (let y = 0; y < this.cantVertical; y++) {
            if (Ficha.prototype.isPrototypeOf(this.huecos[y][posX]) && this.huecos[y][posX].isJugador(jugador)) {
                contador++;
                if (contador == this.tipoJuego) {
                    return true;
                }
            } else {
                contador = 0;
            }
        }
        return false;
    }


    lineaDiagonal(posX, posY, jugador) {
        let x, y, contador;

        // Check Abajo-Izquierda para Arriba-Derecha
        contador = 0;
        for (x = posX, y = posY; x >= 0 && y >= 0; x--, y--) {
            if (Ficha.prototype.isPrototypeOf(this.huecos[y][x]) && this.huecos[y][x].isJugador(jugador)) {
                contador++;
                if (contador == this.tipoJuego) {
                    return true;
                }
            } else {
                contador = 0;
            }
        }

        // Check Arriba-Izquierda para Abajo-Derecha
        contador = 0;
        for (x = posX, y = posY; x < this.cantHorizontal && y < this.cantVertical; x++, y++) {
            if (Ficha.prototype.isPrototypeOf(this.huecos[y][x]) && this.huecos[y][x].isJugador(jugador)) {
                contador++;
                if (contador == this.tipoJuego) {
                    return true;
                }
            } else {
                contador = 0;
            }
        }

        // Check Arriba-Derecha para Abajo-Izquierda
        contador = 0;
        for (x = posX, y = posY; x >= 0 && y < this.cantVertical; x--, y++) {
            if (Ficha.prototype.isPrototypeOf(this.huecos[y][x]) && this.huecos[y][x].isJugador(jugador)) {
                contador++;
                if (contador == this.tipoJuego) {
                    return true;
                }
            } else {
                contador = 0;
            }
        }

        // Check Abajo-Derecha para Arriba-Izquierda
        contador = 0;
        for (x = posX, y = posY; x < this.cantHorizontal && y >= 0; x++, y--) {
            if (Ficha.prototype.isPrototypeOf(this.huecos[y][x]) && this.huecos[y][x].isJugador(jugador)) {
                contador++;
                if (contador == this.tipoJuego) {
                    return true;
                }
            } else {
                contador = 0;
            }
        }


        return false; // Devuelvo false si no se encontró una línea diagonal
    }

    buscarDiagonal(jugador) {
        for (let y = 0; y < this.cantVertical; y++) {
            for (let x = 0; x < this.cantHorizontal; x++) {
                if (this.lineaDiagonal(x, y, jugador)) {
                    return true;
                }
            }
        }
        return false; // Devolver false si no se encontró una línea diagonal
    }


    setFichaTablero(ficha, y, x) {
        this.huecos[y][x] = ficha;
    }

    getMaxFichas() {
        return this.cantHorizontal * this.cantVertical;
    }

}