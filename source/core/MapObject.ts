export default class MapObject {
    private ID: string;
    private posX: number;
    private posY: number;

    public constructor(ID: string, positionX: number, positionY: number) {
        this.ID = ID;
        this.posX = positionX;
        this.posY = positionY;
    }

    /**
     * returns a pure js-object, that contains the properties of this object, which
     * should be shared over the network
     */
    public serialize() {
        return { ID: this.ID, posX: this.posX, posY: this.posY };
    }

    public getID() {
        return this.ID;
    }

    public getPosX() {
        return this.posX;
    }

    public getPosY() {
        return this.posY;
    }

    public setPosX(newPos: number) {
        this.posX = newPos;
    }

    public setPosY(newPos: number) {
        this.posY = newPos;
    }

    moveBy(dX, dY){
        this.posX = this.posX + dX
        this.posY = this.posY + dY
    }

    public getDistance(x: number, y: number) {
        return Math.sqrt(Math.pow(this.posX - x, 2) + Math.pow(this.posY - y, 2));
    }

    public isNPC(): boolean{
        return false;
    }

    public isUnit(): boolean{
        return false;
    }
}
