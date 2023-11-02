class Jugador {
    constructor(nombre){
        this.nombre = nombre;
        this.turno= false;
        this.fichas;
    }

    getTurno(){
        return this.turno;
    }
    setTurno(){
        this.turno=!this.turno;
    }
    getNombre(){
        return this.nombre;
    }

    setFichas(fichas){
        this.fichas = fichas;
    }
}