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
        this.fichasColocadas = 0;
        this.ultFicha = null;
        this.ganador=null;
    }

    getTamanio() {
        return this.tipoJuego;
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

    /*  getWherePutMatrix(x, ficha) {
          for (let i = this.cantVertical - 1; i >= 0; i--) {
              if (!Ficha.prototype.isPrototypeOf(this.huecos[i][x])) {
                  let test = this.huecos[i][x];
                  ficha.setPosition(test.getPosX(), test.getPosY());
                  this.setFichaTablero(ficha, i, x);
                  break;
              }
          }
      }*/

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
                this.ultFicha = ficha;

                if (this.lineaHorizontal(i, ficha.getJugador())) {
                    this.agregarGanador(ficha.getJugador());
                   // alert("Gano el jugador en horizontal " + ficha.getJugador().getNombre());
                }
                if (this.lineaVertical(ficha.getPosXMatrix(), ficha.getJugador())) {
                    this.agregarGanador(ficha.getJugador());
                  //  alert("Gano el jugador en vertical " + ficha.getJugador().getNombre());
                }
                if (this.buscarDiagonal(ficha.getJugador())) {
                    this.agregarGanador(ficha.getJugador());
                   // alert("Gano el jugador en Diagonal " + ficha.getJugador().getNombre());
                }
            }
        }
    }
    agregarGanador(jugador){
        this.ganador= jugador.getNombre();
    }
    revisarGanador(){
        return this.ganador;
    }

    /* lineaHorizontal(posY, jugador) {
         for (let y = 0; y < this.cantVertical; y++) {
             let contador = 0;
             for (let x = 0; x < this.cantHorizontal; x++) {
                 if (Ficha.prototype.isPrototypeOf(this.huecos[posY][x])) {
                     if (this.huecos[posY][x].isJugador(jugador)) {
                         contador++;
                         if (contador == this.tipoJuego) {
                             return true;
                         }
                     }
                     else {
                         contador = 0;
                     }
                 }
 
 
             }
         }
         return false;
     }*/
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
        // Variables for diagonal checks
        let x, y, contador;

        // Check bottom-left to top-right
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

        // Check top-left to bottom-right
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

        // Check top-right to bottom-left
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

        // Check bottom-right to top-left
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


return false; // Devolver false si no se encontró una línea diagonal
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



    // checkHorizontal(matrix, row, col, color) {
    //     for (let i = col; i < col + 4; i++) {
    //       if (matrix[row][i] !== color) {
    //         return false;
    //       }
    //     }
    //     return true;
    //   }

    //   checkAllHorizontal(matrix, color) {
    //     for (let row = 0; row < matrix.length; row++) {
    //       for (let col = 0; col < matrix[row].length - 3; col++) {
    //         if (checkHorizontal(matrix, row, col, color)) {
    //           return true;
    //         }
    //       }
    //     }
    //     return false;
    //   }


    setFichaTablero(ficha, y, x) {
        this.huecos[y][x] = ficha;
    }

    getMaxFichas() {
        return this.cantHorizontal * this.cantVertical;
    }

}