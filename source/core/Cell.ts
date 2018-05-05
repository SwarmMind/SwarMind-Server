import MapObject from './MapObject';

export default class Cell {
    private xPos: number;
    private yPos: number;
    private content: MapObject;

    constructor(x: number, y: number, object: MapObject = null) {
        this.xPos = x;
        this.yPos = y;
        this.content = object;
    }

    public getX(): number {
        return this.xPos;
    }

    public getY(): number {
        return this.yPos;
    }

    public getContent(): MapObject {
        return this.content;
    }

    public setX(x: number) {
        this.xPos = x;
    }

    public setY(y: number) {
        this.yPos = y;
    }

    public setContent(object: MapObject) {
        this.content = object;
    }

    public placeObject(object: MapObject): boolean {
        if (!this.isEmpty()) { return false; }

        this.content = object;
        return true;
    }

    public removeObject() {
        this.content = null;
    }

    public isEmpty(): boolean {
        if (this.content === null) { return true; }

        return false;
    }
}
