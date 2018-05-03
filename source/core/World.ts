import * as assert from 'assert';
import FactoryStore from './FactoryStore';
import MapObject from './MapObject';
import State from './State';

export default class World {

    private sizeX: number;
    private sizeY: number;
    private store: FactoryStore = new FactoryStore();
    private fieldContents: MapObject[][];

    constructor(sizeX, sizeY) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;

        this.initFieldContents();
    }

    private initFieldContents() {
        this.fieldContents = [];

        for (let i = 0; i < this.sizeY; i++) {
            this.fieldContents.push([]);
            for (let k = 0; k < this.sizeX; k++) {
                this.fieldContents[i].push(null);
            }
        }
    }

    /**
     * moveUnitBy
     */
    public moveUnitBy(ID: string, dX: number, dY: number) {     // maybe we should guarantee whether move is possible
        const unit = this.store.getObjectByID(ID);
        unit.posX += dX;
        unit.posY += dY;
     }

    /**
     * addUnit
     */
    public addUnit(x: number, y: number) {
        assert(x >= 0 && y >= 0 && x < this.sizeX && y < this.sizeY);
        this.fieldContents[y][x] = this.store.createUnit(x, y);
    }

    /**
     * addNPC
     */
    public addNPC(x: number, y: number) {
        assert(x >= 0 && y >= 0 && x < this.sizeX && y < this.sizeY);
        this.fieldContents[y][x] = this.store.createNPC(x, y);
    }

    /**
     * removeObject
     */
    public removeObject(ID: string) {
        const unit = this.store.getObjectByID(ID);
        this.store.removeObject(ID);
        this.fieldContents[unit.posY][unit.posX] = null;
    }

    /**
     * getState
     */
    public getState(): State {
        return new State();
    }

}
