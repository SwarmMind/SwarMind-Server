import * as assert from 'assert';
import FactoryStore from './FactoryStore';
import MapObject from './MapObject';
import NPCObject from './NPCObject';
import State from './State';
import UnitObject from './UnitObject';

export default class World {

    private sizeX: number;
    private sizeY: number;
    private store: FactoryStore;
    private fieldContents: Array<Array<MapObject>>;

    constructor(sizeX, sizeY) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;

        this.store = new FactoryStore();

        this.initFieldContents();
    }

    private initFieldContents() {
        this.fieldContents = [];

        for (let i = 0; i < this.sizeX; i++) {
            this.fieldContents.push([]);
            for (let k = 0; k < this.sizeY; k++) {
                this.fieldContents[i].push(null);
            }
        }
    }

    /**
     * moveUnitBy
     */
    public moveUnitIfPossible(ID: string, dX: number, dY: number): boolean {
        const unit = this.store.getObjectByID(ID);
        const newX = unit.getPosX() + dX;
        const newY = unit.getPosY() + dY;

        if (this.fieldContents[newX][newY] !== null) { return false; }

        this.fieldContents[unit.getPosX()][unit.getPosY()] = null;
        unit.setPosX(newX);
        unit.setPosY(newY);
        this.fieldContents[unit.getPosX()][unit.getPosY()] = unit;

        return true;
    }

    public isMovePossible(ID: string, dX: number, dY: number): boolean {
        const unit = this.store.getObjectByID(ID);
        const newX = unit.getPosX() + dX;
        const newY = unit.getPosY() + dY;

        if (this.fieldContents[newX][newY] !== null) { return false; }

        return true;
    }

    /**
     * Processes a shot-command of a unit with given direction
     * @param unitID ID of the unit that shoots
     * @param directionX Direction on x-Axis (will be checked for <0, 0, >0)
     * @param directionY Direction on y-Axis (will be checked for <0, 0, >0)
     */
    public processShot(unitID: string, directionX: number, directionY: number) {
        // In this prototype always one of the directions will be 0 and the other one <>0
        // But later on this implementation can be used for diagonal shots
        if (directionX === 0 && directionY === 0) { return false; }
        if (directionX !== 0 && directionY === 0) { return false; }

        const unit = this.store.getObjectByID(unitID);
        const posX = unit.getPosX();
        const posY = unit.getPosY();

        const hitObject = this.scanForFirstHit(posX, posY, directionX, directionY);
        // This could maybe done in a better way with type assertions
        if (hitObject !== null) {
            if (
                unit instanceof UnitObject && hitObject instanceof NPCObject ||
                unit instanceof NPCObject && hitObject instanceof UnitObject
            ) {
                this.removeObject(hitObject.getID());
            }
        }

        return true;
    }

    /**
     * addUnit
     */
    public addUnit(x: number, y: number) {
        assert(x >= 0 && y >= 0 && x < this.sizeX && y < this.sizeY);
        this.fieldContents[x][y] = this.store.createUnit(x, y);
    }

    /**
     * addNPC
     */
    public addNPC(x: number, y: number) {
        assert(x >= 0 && y >= 0 && x < this.sizeX && y < this.sizeY);
        this.fieldContents[x][y] = this.store.createNPC(x, y);
    }

    /**
     * removeObject
     */
    public removeObject(ID: string) {
        const unit = this.store.getObjectByID(ID);
        this.store.removeObject(ID);
        this.fieldContents[unit.getPosX()][unit.getPosY()] = null;
    }

    /**
     * getState
     */
    public getState(): State {
        const state =  new State();
        for (const obj of this.store) {
            state.addMapObject(obj);
        }
        return state;
    }

    private scanForFirstHit(posX: number, posY: number, directionX: number, directionY: number) {
        if (directionX > 0) { posX++; }
        if (directionX < 0) { posX--; }
        if (directionY > 0) { posY++; }
        if (directionY < 0) { posY--; }

        while (posX >= 0 && posX < this.sizeX && posY >= 0 && posY < this.sizeY) {
            if (this.fieldContents[posX][posY] !== null) {
                return this.fieldContents[posX][posY];
            }
            if (directionX > 0) { posX++; }
            if (directionX < 0) { posX--; }
            if (directionY > 0) { posY++; }
            if (directionY < 0) { posY--; }
        }

        return null;
    }
}
