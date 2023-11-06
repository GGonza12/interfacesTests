class Rectangulo extends Figura {
    constructor(posX, posY, width, height, fill, context) {
        super(posX, posY, fill, context);

        this.width = width;
        this.height = height;
        this.imgFicha = new Image();
        this.imgFicha.src = this.fill;
    }

    draw() {
        super.draw();
        this.context.fillRect(this.posX, this.posY, this.width, this.height);
    }

    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    isPointInside(x,y){
        return !(x < this.posX || x >this.posX + this.width || y< this.posY || y > this.posY + this.height);
    }
}