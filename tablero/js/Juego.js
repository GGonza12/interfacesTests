class Juego{
    constructor(ctx){
        this.jugador1 = new Jugador();
        this.jugador2 = new Jugador();
        this.tablero = new Tablero();
        this.ctx = ctx;
        this.fichas = [];
        this.imgFichas = ["./images/paginaJuego/TT1.png",
        "./images/paginaJuego/TT2.png",
        "./images/paginaJuego/TT3.png",
        "./images/paginaJuego/TT4.png",
        "./images/paginaJuego/CT1.png",
        "./images/paginaJuego/CT2.png",
        "./images/paginaJuego/CT3.png",
        "./images/paginaJuego/CT4.png"];
        
    }
    empezarJuego(){
        this.tablero.generarTablero();
        this.asignarFichas();
        this.dibujarFichas();
    }

    setJugadores(jugador1, jugador2){
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
    }
    getJugadores(){
        return {
            jugador1: this.jugador1,
            jugador1: this.jugador2
        }
    }
    setTablero(tablero){
        this.tablero = tablero;
    }
    getTablero(){
        return this.tablero;
    }

    asignarFichas(){
             let y = 880;
             let yFicha = y;
             const min = 4;
             const max = 7;
             let maximoFichas = this.tablero.getMaxFichas();
       //      let fichasJugador1 = [];
        //     let fichasJugador2= [];
             for (let f = 0; f < maximoFichas; f++) {
                 if(f<maximoFichas/2){
                     let ruta = this.imgFichas[Math.round(Math.random() * 3)];
                    let ficha = new Ficha(350, yFicha - 150, (40), ruta,this.jugador1, this.ctx);
                 //    fichasJugador1.push(ficha);
                     this.fichas.push(ficha);
                 }
                 else {
                     if(f==maximoFichas/2){
                         yFicha = y;
                     }
                     let imgCT = Math.floor(Math.random() * (max-min + 1)+min);
                     let ruta = this.imgFichas[imgCT];
                     let ficha2 = new Ficha(1578, yFicha - 150, (40), ruta,this.jugador2,this.ctx);
                     this.fichas.push(ficha2);
                 }       
                 yFicha = yFicha -20;
     
             };
            
            

       // this.jugador1.setFichas(fichasJugador1);
       // this.jugador2.setFichas(fichasJugador2);
    }

    dibujarFichas(){

         for(let i=0;i<this.fichas.length;i++){
            this.fichas[i].drawImage();
         };
    }
    findClickedFigure(x,y){
        for(let i=0;i< this.fichas.length;i++){
            const element = this.fichas[i];
            if(element.isPointInside(x,y)){
                console.log("alo2");
                return element;
            }
        }
    }
    clearCanvastest(){
        this.tablero.generarTablero();
    }

}