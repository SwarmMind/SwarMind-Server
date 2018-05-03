export default class MapObject {
    public posX: number;
    public posY: number;
    public ID: string;

    public constructor(positionX: number, positionY: number, ID: string) {
        this.posX = positionX;
        this.posY = positionY;
        this.ID = ID;
    }

    /**
     * returns a pure js-object, that contains the properties of this object, which 
     * should be shared over the network
     */
    public serialize(){
        return { ID: this.ID, posX: this.posX, posY: this.posY };
    }
}