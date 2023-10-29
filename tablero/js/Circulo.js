class Circulo extends Figura {
    constructor(posX, posY, radius, fill, context) {
        super(posX, posY, fill, context);
        this.resaltado = false;
        this.radius = radius;
        this.resaltadoEstilo = "#FF0000";
    }

    draw() {
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();
        
    }

    drawImage(){
        let imgFicha = new Image();
        imgFicha.src = this.fill;
        
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
            this.context.drawImage(imgFicha, (this.posX-this.radius*7+7), (this.posY-(this.radius*3)), this.radius*14,this.radius*14);
        
            // Restore the context
            this.context.restore();
        
            // Increment posY for next circle
            
        }; 
        imgFicha.onload =  drawFicha;
    }
/*
    drawImage(){
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        let imgFicha = new Image();
        imgFicha.src = this.fill; 
        let draw = ()=>this.context.drawImage(imgFicha, this.posX, this.posY, this.radius*2, this.radius*2);
  
        imgFicha.onload = draw;
        imgFicha.onload = function() {
        this.context.drawImage(imgFicha, this.posX, this.posY);
        
    }; 
    this.context.closePath();
    
    }
*/
    getRadius() {
        return this.radius;
    }

    isPointInside(x,y){
        let _x = this.posX - x;
        let _y = this.posY - y;

        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    setResaltado(resaltado) {
        this.resaltado = resaltado;
    }

    
}