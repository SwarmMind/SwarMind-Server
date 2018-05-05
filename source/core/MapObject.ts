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

    getID() {
        return this.ID;
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    setPosX(newPos: number) {
        this.posX = newPos;
    }

    setPosY(newPos: number) {
        this.posY = newPos;
    }
}
