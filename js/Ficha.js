class Ficha extends Circulo{
    constructor(posX, posY, radius, fill,jugador, context) {
        super(posX, posY, radius, fill, context);
        this.resaltado = false;
        this.resaltadoEstilo = "#FF0000";
        this.jugador = new Jugador();
        this.jugador = jugador;
        this.posInicialX= this.posX;
        this.posInicialY=this.posY;
        this.posXMatrix=null;
        this.posYMatrix=null;
        this.imgFicha = new Image();
        this.imgFicha.src = this.fill;
        this.locked=false;
    }
    setLocked(){
        this.locked = true;
    }
    getLocked(){
        return this.locked;
    }
    setResaltado(resaltado) {
        this.resaltado = resaltado;
    }
    setPosXMatrix(x){
        this.posXMatrix=x;
    }
    setPosYMatrix(y){
        this.posYMatrix=y;
    }
    getPosXMatrix(){
        return this.posXMatrix;
    }

    getPosYMatrix(){
        return this.posYMatrix;
    }

    isJugador(jugador){
        return this.jugador === jugador;
    }
    getJugador(){
        return this.jugador;
    }

    draw(){
        
        let drawFicha = ()=> {
            this.context.save();
            this.context.beginPath();
            this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
            
            this.context.stroke();
            if(this.resaltado === true){
                this.context.strokeStyle = this.resaltadoEstilo;
                this.context.lineWidth = 5;
                this.context.stroke();
            }
            this.context.closePath();
            this.context.clip();
        
            // Set the globalCompositeOperation property
           // this.context.globalCompositeOperation = "source-over";
        
            // Draw the image
            this.context.drawImage(this.imgFicha, (this.posX-this.radius*7+7), (this.posY-(this.radius*3)), this.radius*14,this.radius*14);
        
            // Restore the context
            this.context.restore();
        
            // Increment posY for next circle
            
        }; 
        if(this.imgFicha.complete) {
            drawFicha();
        } else {
            this.imgFicha.onload = drawFicha;
        }
    }
    isPointInside(x,y){
        let _x = this.posX - x;
        let _y = this.posY - y;

        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
    getPosInicialX() {
        return this.posInicialX;
    }
    getPosInicialY() {
        return this.posInicialY;
    }

}